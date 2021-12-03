import * as Hapi from "@hapi/hapi";
import  models from '../models';
import { IRequest } from "../../interfaces/request";
import StatusEnum from "../../constants/StatusEnum";
import {getCityIdFromHeader} from '../../utils/routeHandler';
import { retrieveCache } from "../service/cacheService";

const cacheName = 'Dict'
export const  getDict = async (request: IRequest, h: Hapi.ResponseToolkit) => {
  const { dictType } = request.params;
  return retrieveCache(request, findAllDict,  `${cacheName}/${dictType}`)
}

const findAllDict = async (request: IRequest) => {
  console.log('retrieve dict data from DB')
  const data = await models[cacheName].findAll({
    attributes:  ["dictLabel", "dictValue"],
    where: {
       // cityId: getCityIdFromHeader(request),
        dictType: request.params.dictType,
        status: StatusEnum.ACTIVE,
      }
  });
  return data;
};