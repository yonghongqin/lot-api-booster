import * as chai from "chai";
import TaskController from "../../src/api/tasks/task-controller";
import { ITask } from "../../src/api/tasks/task";
import { IUser } from "../../src/api/users/user";
import * as Configs from "../../src/configurations";
import * as Server from "../../src/server";
import * as Database from "../../src/database";
import * as Utils from "../utils/test-task-utils";
const configDb = Configs.getDatabaseConfig();
const database = Database.init(configDb);
const assert = chai.assert;
const serverConfig = Configs.getServerConfigs();

describe("TastController Tests", () => {
  let server: any;

  before((done) => {
    Server.init().then((s) => {
      server = s;
      done();
    });
  });

  beforeEach((done) => {
    Utils.createSeedTaskData(database, done);
  });

  afterEach((done) => {
    Utils.clearDatabase(database, done);
  });

  // real test starts here
  it("Create task", async () => {
    //todo: how to remove mongoose document attributes
    const task: any = {
      userId: "1",
      name: "Yonghong",
      description: "task creation test",
    };

    const res = await server.inject({
      method: "POST",
      url: serverConfig.routePrefix + "/tasks",
      payload: task,
    });

    const responseBody: any = JSON.parse(res.payload);
    assert.equal(201, res.statusCode);
    assert.isNotNull(responseBody.token);
  });
});
