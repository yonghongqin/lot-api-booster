import * as Hapi from "@hapi/hapi";
import * as Boom from "@hapi/boom";
import { ITask } from "./task";
import { IDatabase } from "../../database";
import { IServerConfigurations } from "../../configurations";
import { IRequest } from "../../interfaces/request";
// import { ILogging } from "../../plugins/logging/logging";

//Custom helper module
// import * as Helper from "../../utils/helper";

export default class TaskController {
  private database: IDatabase;
  private configs: IServerConfigurations;

  constructor(configs: IServerConfigurations, database: IDatabase) {
    this.configs = configs;
    this.database = database;
  }

  public async createTask(request: IRequest, h: Hapi.ResponseToolkit) {
    const newTask: ITask = <ITask>request.payload;
    newTask.userId = request.auth.credentials.id;

    this.database.taskModel.create(newTask, function (error, task) {
      if (error) {
        return Boom.badImplementation(error.message);
      } else {
        return h.response(task).code(201);
      }
    });
  }

  public async updateTask(request: IRequest, h: Hapi.ResponseToolkit) {
    const userId = request.auth.credentials.id;
    const _id = request.params["id"];

    this.database.taskModel.findByIdAndUpdate(
      _id,
      <ITask>request.payload,
      { new: true },
      (error, task) => {
        if (error) {
          return Boom.badImplementation(error.message || "Unexpected Error");
        } else {
          return task ? task : Boom.notFound();
        }
      }
    );
  }

  public async deleteTask(request: IRequest, h: Hapi.ResponseToolkit) {
    const id = request.params["id"];
    // const userId = request["auth"]["credentials"];

    const deletedTask = await this.database.taskModel.findOneAndRemove({
      _id: id,
      // userId: userId,
    });

    return deletedTask ? deletedTask : Boom.notFound();
  }

  public async getTaskById(request: IRequest, h: Hapi.ResponseToolkit) {
    // const userId = request.auth.credentials.id;
    const _id = request.params["id"];

    const task = await this.database.taskModel.findOne({ _id }).lean(true);
    return task ? task : Boom.notFound();
  }

  public async getTasks(request: IRequest, h: Hapi.ResponseToolkit) {
    //const userId = request.auth.credentials.id;
    const top = request.query["top"] || 10;
    const skip = request.query["skip"] || 1;
    const tasks = await this.database.taskModel
      .find({})
      .lean(true)
      .skip(skip)
      .limit(top);

    return tasks;
  }
}
