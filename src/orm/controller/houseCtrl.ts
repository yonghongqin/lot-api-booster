import * as Hapi from "@hapi/hapi";
import  models from '../models';
import { IRequest } from "../../interfaces/request";
import StatusEnum from "../../constants/StatusEnum";
import {getCityIdFromHeader} from '../../utils/routeHandler';
import { retrieveCache } from "../service/cacheService";
import AuditStatusEnum from "../../constants/AuditStatusEnum";
// import { ILogging } from "../../plugins/logging/logging";

//Custom helper module
// import * as Helper from "../../utils/helper";

const cacheName = 'House'
export const  getHouse = async (request: IRequest, h: Hapi.ResponseToolkit) => {
  return retrieveCache(request, findAllHouse,  cacheName, 60 * 60 * 24)
}

const findAllHouse = async (request: IRequest) => {
  console.log('retrieve data from DB')
  const data = await models[cacheName].findAll({
    // attributes: ["id", "banner", "subject", "summary"],
    where: {
      cityId: getCityIdFromHeader(request),
      status: StatusEnum.ACTIVE,
      isRecommend: 1,   // 广告栏
      houseCategory: 2  // 出售
    },
  });
  return data;
};
