import * as Hapi from "@hapi/hapi";
import models from "../models";
import { IRequest } from "../../interfaces/request";
import { getCityIdFromHeader } from "../../utils/routeHandler";
import StatusEnum from "../../constants/StatusEnum";
import { REDIS_CLIENT } from "../../constants/constants";
// import * as Boom from "@hapi/boom";
import { retrieveCache } from "../service/cacheService";
// import { ILogging } from "../../plugins/logging/logging";

//Custom helper module
// import * as Helper from "../../utils/helper";
const cacheName = 'ClientMenu'

export const getClientMenus = async (
  request: IRequest,
  h: Hapi.ResponseToolkit
) => {
  return retrieveCache(request, findAllClientMenus, cacheName)
};

const findAllClientMenus = async (request: IRequest) => {
  console.log('retrieve data from DB')
  const clientMenus = await models["ClientMenu"].findAll({
    attributes: ["menuName", "displayLevel", "menuUrl", "icon"],
    where: {
      cityId: getCityIdFromHeader(request),
      status: StatusEnum.ACTIVE,
      tabType: 0, // 首页
      visible: 1, // 可见
    },
  });
  return clientMenus;
};
