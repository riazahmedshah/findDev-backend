export class ServiceError extends Error{
  name:string
  statusCode:number;
  message:string;
  details?:string;

  constructor(statusCode:number, message:string, details:string){
    super()
    this.name = "SERVICE_ERROR"
    this.statusCode = statusCode;
    this.message = message;
    this.details = this.details; 
  }
}