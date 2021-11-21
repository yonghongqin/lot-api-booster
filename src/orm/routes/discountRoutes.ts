import Joi from "joi";
import {getDiscount} from "../controller/discountCtrl";
// import * as TaskValidator from "./task-validator";

const routes = [];
routes.push({
    method: "GET",
    path: "/discount",
    options: {
      handler: getDiscount,
      // auth: "jwt",
      tags: ["api", "discount"],
      description: "Get all discount.",
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

