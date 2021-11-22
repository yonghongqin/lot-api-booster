import models from "../models";
import { REDIS_CLIENT } from "../../constants/constants";
import { IRequest } from "../../interfaces/request";


export const retrieveCache = (
  request: IRequest,
  dataRetrieveFunc: any,
  cacheName: any,
  ttlInSeconds?: number ,
) => {
  return new Promise((resolve: any, reject: any) => {
    try {
      models[REDIS_CLIENT]?.get(
        cacheName,
        async (err: any, data: any) => {
          err && console.warn("Retrieving cache ClientMenu has error. Will retrieve data from DB instead", err);
          //data 是空数组[]字符长度为2
          // if (data && data.length > 2) {
          //   data = JSON.parse(data);
          // } else {
            data = await dataRetrieveFunc(request);
            models[REDIS_CLIENT]?.set([cacheName, JSON.stringify(data)]);
            ttlInSeconds && models[REDIS_CLIENT]?.expire(cacheName, ttlInSeconds);
          // }
          resolve(data);
        }
      );
    } catch (error: any) {
      // 当redis 缓存出现问题的时候，我们还应该能从数据库获取到数据
      const data = dataRetrieveFunc(request)
      resolve(data);
      models[REDIS_CLIENT]?.set([cacheName, JSON.stringify(data)]);
      ttlInSeconds && models[REDIS_CLIENT]?.expire(cacheName, ttlInSeconds);
    }
  });
};