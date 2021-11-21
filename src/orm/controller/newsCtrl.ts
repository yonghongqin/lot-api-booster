import * as Hapi from "@hapi/hapi";
import  models from '../models';
import { IRequest } from "../../interfaces/request";
import StatusEnum from "../../constants/StatusEnum";
import {getCityIdFromHeader} from '../../utils/routeHandler';
import { retrieveCache } from "../service/cacheService";
// import { ILogging } from "../../plugins/logging/logging";

//Custom helper module
// import * as Helper from "../../utils/helper";

const cacheName = 'News'
export const  getNews = async (request: IRequest, h: Hapi.ResponseToolkit) => {
  return retrieveCache(request, findAllNews, cacheName)
}


const findAllNews = async (request: IRequest) => {
  console.log('retrieve data from DB')
  const data = await models[cacheName].findAll({
    where: {
      cityId: getCityIdFromHeader(request),
      status: StatusEnum.ACTIVE
    },
  });
  return data;
};
