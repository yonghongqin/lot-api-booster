import * as Hapi from "@hapi/hapi";
import * as Boom from "@hapi/boom";
import * as Jwt from "jsonwebtoken";
import { IUser } from "./user";
import { IDatabase } from "../../database";
import { IServerConfigurations } from "../../configurations";
import { IRequest, ILoginRequest } from "../../interfaces/request";

export default class UserController {
  private database: IDatabase;
  private configs: IServerConfigurations;

  constructor(configs: IServerConfigurations, database: IDatabase) {
    this.database = database;
    this.configs = configs;
  }

  private generateToken(user: IUser) {
    const jwtSecret = this.configs.jwtSecret;
    const jwtExpiration = this.configs.jwtExpiration;
    const payload = { id: user._id };

    return Jwt.sign(payload, jwtSecret, { expiresIn: jwtExpiration });
  }

  public async loginUser(request: ILoginRequest, h: Hapi.ResponseToolkit) {
    const { email, password } = <IUser>request.payload;

    this.database.userModel.findOne(
      { email: email },
      (error: any, user: any) => {
        if (error) {
          return Boom.badImplementation(error.message || "Unexpected Error");
        } else {
          if (!user) {
            return Boom.unauthorized("User does not exists.");
          }

          if (!user.validatePassword(password)) {
            return Boom.unauthorized("Password is invalid.");
          }

          return { token: this.generateToken(user) };
        }
      }
    );
  }

  public async createUser(request: IRequest, h: Hapi.ResponseToolkit) {
    this.database.userModel.create(<IUser>request.payload, (error, user) => {
      if (error) {
        return Boom.badImplementation(error.message);
      } else {
        return h.response({ token: this.generateToken(user) }).code(201);
      }
    });
  }

  public async updateUser(request: IRequest, h: Hapi.ResponseToolkit) {
    const id = request.auth.credentials.id;
    this.database.userModel.findByIdAndUpdate(
      id,
      <IUser>request.payload,
      { new: true },
      (error, user) => {
        if (error) {
          return Boom.badImplementation(error.message || "Unexpected Error");
        } else {
          return user ? user : Boom.notFound();
        }
      }
    );
  }

  public async deleteUser(request: IRequest, h: Hapi.ResponseToolkit) {
    const id = request.auth.credentials.id;
    this.database.userModel.findByIdAndRemove(id, (error: any, user: any) => {
      if (error) {
        return Boom.badImplementation(error.message || "Unexpected Error");
      } else {
        return user ? user : Boom.notFound();
      }
    });
  }

  public async infoUser(request: IRequest, h: Hapi.ResponseToolkit) {
    const id = request.auth.credentials.id;
    this.database.userModel.findById(id, (error: any, user: any) => {
      if (error) {
        return Boom.badImplementation(error.message || "Unexpected Error");
      } else {
        return user ? user : Boom.notFound();
      }
    });
  }
}
