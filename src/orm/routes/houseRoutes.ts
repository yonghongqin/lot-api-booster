import Joi from "joi";
import {getHouse} from "../controller/houseCtrl";
// import * as TaskValidator from "./task-validator";

const routes = [];
routes.push({
    method: "GET",
    path: "/houses",
    options: {
      handler: getHouse,
      // auth: "jwt",
      tags: ["api", "house"],
      description: "Get all house.",
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

