import * as Hapi from "@hapi/hapi";
import CatboxRedis from '@hapi/catbox-redis';
import { IServerConfigurations, getServerConfigs } from "./utils/configUtils";
import routes from "./routes";
import config from "config";

export async function init(): Promise<Hapi.Server> {
  try {
    const serverConfig: IServerConfigurations = getServerConfigs();
    const port = process.env.PORT || serverConfig.port;
    const server = new Hapi.Server({
      debug: { request: ["error"] },
      port: port,
    //   cache: [
    //     {
    //         provider: {
    //             constructor: CatboxRedis,
    //             options: {
    //                 partition : 'lot',
    //                 host: config.get("redis.server"),
    //                 port: config.get("redis.port"),
    //                 database: 0,
    //                 tls: {}
    //             }
    //         }
    //     }
    // ],
      routes: {
        cors: {
          origin: ["*"],
        },
      },
    });
    if (serverConfig.routePrefix) {
      server.realm.modifiers.route.prefix = serverConfig.routePrefix;
    }

    //  Setup Hapi Plugins
    // const plugins: Array<string> = configs.plugins;
    // const pluginOptions = {
    //   database: database,
    //   serverConfigs: configs
    // };

    // let pluginPromises: Promise<any>[] = [];

    // plugins.forEach((pluginName: string) => {
    //   var plugin: IPlugin = require("./plugins/" + pluginName).default();
    //   console.log(
    //     `Register Plugin ${plugin.info().name} v${plugin.info().version}`
    //   );
    //   pluginPromises.push(plugin.register(server, pluginOptions));
    // });

    // await Promise.all(pluginPromises);

    console.log("All plugins registered successfully.");

    console.log("Register Routes");
    // Logs.init(server, configs, database);
    // Tasks.init(server, configs, database);
    // // Users.init(server, configs, database);
    // /** Gocery API call start*/
    // Vendors.init(server, configs);
    // Deals.init(server, configs);
    // Categorys.init(server, configs);
    // Items.init(server, configs);
    /** Gocery API call end */

    // attach routes here
    console.log("routes=", JSON.stringify(routes));
    server.route(routes);
    console.log("Routes registered sucessfully.");

    return server;
  } catch (err) {
    console.log("Error starting server: ", err);
    throw err;
  }
}
