import * as Hapi from "@hapi/hapi";
import  models from '../models';
import { IRequest } from "../../interfaces/request";
import StatusEnum from "../../constants/StatusEnum";
import {getCityIdFromHeader} from '../../utils/routeHandler';
import { retrieveCache } from "../service/cacheService";

const cacheName = 'AdsPrice'
export const  getAdsPrice = async (request: IRequest, h: Hapi.ResponseToolkit) => {
  const { namespace, type } = request.query;
  // type =1 是首页轮播图
  return retrieveCache(request, findAllAdsPrice,  `${cacheName}${namespace}${type || 1}`, 60 * 60 * 24)
}

const findAllAdsPrice = async (request: IRequest) => {
  console.log('retrieve ads price data from DB')
  const data = await models[cacheName].findAll({
    // 2 是打折优惠
    attributes:  ["id", "namespace", "type", "adsDuration", "adsRate"],
    where: {
        cityId: getCityIdFromHeader(request),
        status: StatusEnum.ACTIVE,
      }
  });
  return data;
};
