// import { ITask } from "../../src/api/tasks/task";
import * as Database from "../../src/database";
import { createUserDummy } from "./test-user-utils";

export function createTaskDummy(
  userId?: string,
  name?: string,
  description?: string
) {
  const task: any = {
    name: name || "dummy task",
    description: description || "I'm a dummy task!",
  };

  if (userId) {
    task["userId"] = userId;
  }

  return task;
}

export function clearDatabase(database: Database.IDatabase, done: any) {
  var promiseTask = database.taskModel.remove({});

  Promise.all([promiseTask])
    .then(() => {
      done();
    })
    .catch((error) => {
      console.log(error);
    });
}

export function createSeedTaskData(database: Database.IDatabase, done: any) {
  return database.userModel
    .create(createUserDummy())
    .then((user) => {
      return Promise.all([
        database.taskModel.create(
          createTaskDummy(user._id, "Task 1", "Some dummy data 1")
        ),
        database.taskModel.create(
          createTaskDummy(user._id, "Task 2", "Some dummy data 2")
        ),
        database.taskModel.create(
          createTaskDummy(user._id, "Task 3", "Some dummy data 3")
        ),
      ]);
    })
    .then((task) => {
      done();
    })
    .catch((error) => {
      console.log(error);
    });
}
