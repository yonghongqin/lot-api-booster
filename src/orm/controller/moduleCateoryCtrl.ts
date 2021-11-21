import * as Hapi from "@hapi/hapi";
import  models from '../models';
import { IRequest } from "../../interfaces/request";
import StatusEnum from "../../constants/StatusEnum";
import {getCityIdFromHeader} from '../../utils/routeHandler';
import { REDIS_CLIENT } from "../../constants/constants";
import { retrieveCache } from "../service/cacheService";
// import { ILogging } from "../../plugins/logging/logging";

//Custom helper module
// import * as Helper from "../../utils/helper";
const cacheName: string = "ModuleCategory";
export const  getModuleCategorys = async (request: IRequest, h: Hapi.ResponseToolkit) => {
  const namespace: string = request.query.namespace;
  return retrieveCache(request, findAllModuleCategorys, `${cacheName}${namespace || ""}`);
}

const findAllModuleCategorys = async (request: IRequest) => {
  const moduleCategorys = await models["ModuleCategory"].findAll({
    attributes: ["id", "name", "icon"],
    where: {
      cityId: getCityIdFromHeader(request),
      namespace: request.query.namespace,
      status: StatusEnum.ACTIVE,
    },
  });
  console.log("Retrieve data from DB");
  return moduleCategorys;
};

