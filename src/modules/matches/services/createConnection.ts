import { createConnectionDTO } from "../dto/connection.dto";
import { ServiceError } from "../utils/ServiceError";

export async function createConnection(data:createConnectionDTO){
  try {
    
  } catch (error) {
    if(error instanceof ServiceError) throw error;
    throw new ServiceError(500,"INTERNAL_SERVICE_ERROR")
  }
}