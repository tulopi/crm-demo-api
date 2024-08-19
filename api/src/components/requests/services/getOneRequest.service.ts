import requestsModel from "../models/requests.model";
import { StatusError } from "../../../shared/classes/StatusError";
import { IRequest } from "../types/Requests.types";

export const getOneRequest = async (
    id: string
): Promise<IRequest> => {
  const request = await requestsModel.findById(id);
  if (!request)
    throw new StatusError(
      "No se han encontrado el request solicitado en la base de datos.",
      400
    );
  return request;
};
