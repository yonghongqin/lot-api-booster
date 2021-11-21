import { CITY_ID } from "../constants/constants";

export const getCityIdFromHeader = (req: any) => {
  // 默认城市 1
  const cityId = req.headers[CITY_ID] || 1;

  return cityId;
};
