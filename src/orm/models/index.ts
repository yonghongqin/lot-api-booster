import { DataTypes, Sequelize } from "sequelize";
import fs from "fs";
import path from "path";
import { getValue } from "../../utils/configUtils";
import { isEmpty } from "lodash";
import config from "config";
import redis from 'redis';
import { REDIS_CLIENT } from "../../constants/constants";
// import isEmpty from 'is-empty';

const basename = path.basename(module.filename);
let db: any = {};
let sequelize: any;
const dbConnectionString = getValue("sequelize.useEnvVariable");

if (!isEmpty(dbConnectionString)) {
  // let logging = configurationService.getValue('sequelize.logging')
  sequelize = new Sequelize(dbConnectionString);
} else {
  sequelize = new Sequelize(
    config.get("sequelize.database"),
    config.get("sequelize.username"),
    config.get("sequelize.password"),
    config.get("sequelize"),
  );
}

const redisClient = redis.createClient({
  port: config.get<number>("redis.port" || 6379),
  host: config.get<string>("redis.host") || "127.0.0.1",
});

redisClient.on("connect", () => {
  console.log("Redis Connected!");
});

redisClient.send_command('AUTH', [config.get<string>("redis.password")]);

fs.readdirSync(path.join(__dirname))
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.sequelize = sequelize;
db[REDIS_CLIENT] = redisClient;
export default db;
