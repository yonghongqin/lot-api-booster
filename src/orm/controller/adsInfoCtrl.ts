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
  const { namespace, type } = request.query;
  // type =1 是首页轮播图
  return retrieveCache(request, findAllAdsInfo,  `${cacheName}${namespace}${type || 1}`, 60 * 60 * 24)
}

const findAllAdsInfo = async (request: IRequest) => {
  console.log('retrieve data from DB')
  const { namespace, type } = request.query;
  let whereClause :any = {
    cityId: getCityIdFromHeader(request),
    status: StatusEnum.ACTIVE,
    auditStatus: AuditStatusEnum.VERIFIED,
    type: type
  }
  if (namespace) { whereClause = { ...whereClause, namespace }}
  const data = await models[cacheName].findAll({
    // 2 是打折优惠
    attributes: type === 2 ? ["id", "banner", "subject", "discountSubtitle", "discountOriginRate", "discountNowRate"]
                           : ["id", "banner", "subject", "summary"],
    where: whereClause,
  });
  return data;
};
