import Joi from "joi";
import {getCity} from "../controller/cityCtrl";
// import * as TaskValidator from "./task-validator";

const routes = [];
routes.push({
    method: "GET",
    path: "/city",
    options: {
      handler: getCity,
      // auth: "jwt",
      tags: ["api", "city"],
      description: "Get all cities.",
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

