import Joi from "joi";
import {getModuleCategorys} from "../controller/moduleCateoryCtrl";
// import * as TaskValidator from "./task-validator";

const routes = [];
routes.push({
    method: "GET",
    path: "/moduleCategorys",
    options: {
      handler: getModuleCategorys,
      // auth: "jwt",
      tags: ["api", "moduleCategorys"],
      description: "Get all moduleCategorys.",
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

