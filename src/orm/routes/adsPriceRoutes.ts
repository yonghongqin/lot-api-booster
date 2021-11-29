import Joi from "joi";
import {getAdsPrice} from "../controller/adsPriceCtrl";
// import * as TaskValidator from "./task-validator";

const routes = [];
routes.push({
    method: "GET",
    path: "/adsPrice",
    options: {
      handler: getAdsPrice,
      // auth: "jwt",
      tags: ["api", "adsPrice"],
      description: "Get all adsPrice.",
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

