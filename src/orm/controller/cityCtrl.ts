import * as Hapi from "@hapi/hapi";
import  models from '../models';
import { IRequest } from "../../interfaces/request";
import StatusEnum from "../../constants/StatusEnum";
import { retrieveCache } from "../service/cacheService";

const cacheName = 'City'
export const  getCity = async (request: IRequest, h: Hapi.ResponseToolkit) => {
  return retrieveCache(request, findAllCity,  `${cacheName}`)
}

const findAllCity = async (request: IRequest) => {
  console.log('retrieve city data from DB')
  const data = await models[cacheName].findAll({
    attributes:  ["id", "name"],
    where: {
        status: StatusEnum.ACTIVE,
      },
    order: [
        ['orderNum', 'DESC'],
    ]
  });
  return data;
};