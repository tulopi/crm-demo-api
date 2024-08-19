import requestsModel from "../models/requests.model";
import { StatusError } from "../../../shared/classes/StatusError";
import { IRequest } from "../types/Requests.types";

export const softDeleteRequest = async (id: string): Promise<IRequest> => {
  if (id) throw new StatusError(
    "Para acceder a todas las funcionalidades y características adicionales, es necesario contratar el servicio completo.",
    400
  );
  const request = await requestsModel.findById(id);
  if (!request)
    throw new StatusError(
      "No se han encontrado la request solicitada en la base de datos.",
      400
    );
    request.isActive = false;
    request.save();
  return request;
};
