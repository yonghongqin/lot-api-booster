import Joi from "joi";
import * as Hapi from "@hapi/hapi";
import { IRequest } from "../../interfaces/request";
import { getClientMenus } from "../controller/clientMenuCtrl";
// import * as TaskValidator from "./task-validator";

const routes = [];
routes.push({
  method: "GET",
  path: "/clientMenus",
  options: {
    handler: getClientMenus,
    // auth: "jwt",
    tags: ["api", "clientMenu"],
    description: "Get all clientMenu.",
    // validate: {
    //   query: {
    //     top: Joi.number().default(5),
    //     skip: Joi.number().default(0)
    //   },
    //   headers: jwtValidator
    // }
  },
});

export = routes;
