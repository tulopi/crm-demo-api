import requestsModels from "../models/requests.model";
import { StatusError } from "../../../shared/classes/StatusError";
import { IRequest } from "../types/Requests.types";

export const getAllRequests = async (): Promise<IRequest[]> => {
  const requests = await requestsModels.find({ isActive: { $ne: false } }).populate('user', 'email');
  
  return requests;
};
