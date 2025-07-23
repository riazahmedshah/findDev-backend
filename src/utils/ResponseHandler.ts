import { Response } from "express";
import { ZodError } from "zod";

export class ResponseHandler{
  static json(res:Response, data:Record<string, any>, status=200){
    if(data){
      res.status(status).json(data);
    } else{
      res.status(status).send();
    }
  }

  static created(res:Response, data:Record<string, unknown>){
    ResponseHandler.json(res, data, 201);
  }

  static unauthorized(res: Response, message?:string) {
    res.status(401).send(message || 'Unauthorized')
  } 

  static notFound(res:Response, message?:string){
    res.status(404).send(message || "Not Found")
  }

  static zodError = (res:Response, error: ZodError) => {
    const errors = error.issues.reduce((acc: Record<string, string>, issue) => {
      const key = issue.path.join(".");
      acc[key] = issue.message

      return acc
    },{});

    res.status(400).json({errors})
  }

  static error(res: Response, error: unknown) {
  if (error instanceof Error) {
    const responseData = {
      error: error.name,
      message: error.message,
      ...(process.env.NODE_ENV === 'development' && { 
        stack: error.stack 
      })
    };

    const statusCode = this.getErrorStatusCode(error);
    ResponseHandler.json(res, responseData, statusCode);
  } else {
      ResponseHandler.json(res, {
        error: "INTERNAL_SERVER_ERROR",
        message: "An unexpected error occurred"
      }, 500);
    }
  }

  private static getErrorStatusCode(error: Error): number {
  if ('statusCode' in error && typeof error.statusCode === 'number') {
    return error.statusCode;
  }
  
  if (error.name.includes('NotFound')) return 404;
  if (error.name.includes('Validation')) return 400;
  if (error.name.includes('Unauthorized')) return 401;
  
  return 500;
}
}