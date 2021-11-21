// import { IUser } from "../../src/api/users/user";
import { IServerConfigurations } from "../../src/configurations";
import * as Database from "../../src/database";

export function createUserDummy(email?: string) {
  var user = {
    email: email || "dummy@mail.com",
    name: "Dummy Jones",
    password: "123123",
  };

  return user;
}

export function clearDatabase(database: Database.IDatabase, done: any) {
  var promiseUser = database.userModel.remove({});

  Promise.all([promiseUser])
    .then(() => {
      done();
    })
    .catch((error) => {
      console.log(error);
    });
}

export function createSeedUserData(database: Database.IDatabase, done: any) {
  database.userModel
    .create(createUserDummy())
    .then((user: any) => {
      done();
    })
    .catch((error: any) => {
      console.log(error);
    });
}

export async function login(
  server: any,
  config: IServerConfigurations,
  user: any
) {
  if (!user) {
    user = createUserDummy();
  }

  return server.inject({
    method: "POST",
    url: config.routePrefix + "/users/login",
    payload: { email: user.email, password: user.password },
  });
}