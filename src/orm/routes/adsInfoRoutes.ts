import Joi from "joi";
import {getAdsInfo} from "../controller/adsInfoCtrl";
// import * as TaskValidator from "./task-validator";

const routes = [];
routes.push({
    method: "GET",
    path: "/adsInfo",
    options: {
      handler: getAdsInfo,
      // auth: "jwt",
      tags: ["api", "adsInfo"],
      description: "Get all adsInfo.",
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

