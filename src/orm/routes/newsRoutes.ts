import Joi from "joi";
import {getNews} from "../controller/newsCtrl";
// import * as TaskValidator from "./task-validator";

const routes = [];
routes.push({
    method: "GET",
    path: "/news",
    options: {
      handler: getNews,
      // auth: "jwt",
      tags: ["api", "news"],
      description: "Get all news.",
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

