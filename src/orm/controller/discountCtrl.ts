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

const cacheName = 'Discount'
export const  getDiscount = async (request: IRequest, h: Hapi.ResponseToolkit) => {
  return retrieveCache(request, findAllDiscount, cacheName, 60 * 60 * 24)
}

const findAllDiscount = async (request: IRequest) => {
  console.log('retrieve data from DB')
  const data = await models[cacheName].findAll({
    attributes: ["id", "logo", "discountTitle", "discountSubtitle", "discountOriginRate", "discountNowRate"],
    where: {
      cityId: getCityIdFromHeader(request),
      status: StatusEnum.ACTIVE,
      auditStatus: AuditStatusEnum.VERIFIED,
    },
  });
  return data;
};
