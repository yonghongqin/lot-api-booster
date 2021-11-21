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

const cacheName = 'AdsInfo'
export const  getAdsInfo = async (request: IRequest, h: Hapi.ResponseToolkit) => {
  const namespace: string = request.query.namespace;
  return retrieveCache(request, findAllAdsInfo,  `${cacheName}${namespace || "index"}`, 60 * 60 * 24)
}

const findAllAdsInfo = async (request: IRequest) => {
  console.log('retrieve data from DB')
  const data = await models[cacheName].findAll({
    attributes: ["id", "banner", "subject", "summary"],
    where: {
      cityId: getCityIdFromHeader(request),
      status: StatusEnum.ACTIVE,
      auditStatus: AuditStatusEnum.VERIFIED,
      namespace: request.query.namespace || 'index' // 默认是首页广告
    },
  });
  return data;
};
