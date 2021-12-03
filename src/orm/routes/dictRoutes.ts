import Joi from "joi";
import {getDict} from "../controller/dictCtrl";
// import * as TaskValidator from "./task-validator";

const routes = [];
routes.push({
    method: "GET",
    path: "/dict/data/getType/{dictType}",
    options: {
      handler: getDict,
      // auth: "jwt",
      tags: ["api", "dict"],
      description: "Get all dictionary.",
      // validate: {
      //   query: {
      //     top: Joi.number().default(5),
      //     skip: Joi.number().default(0)
      //   },
      //   headers: jwtValidator
      // }
    },
  });

  export = routes ;

