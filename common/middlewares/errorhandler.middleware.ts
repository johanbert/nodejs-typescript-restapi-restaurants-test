import express from 'express';
import { Error } from "../dto/error.interface";

class ErrorHandlerMiddleware {

  // bad request handler middleware
  badRequestHandler( error: Error,req: express.Request, res: express.Response, next: express.NextFunction ){
    error = new Error("Not found");
    error.status = 404;
    next(error);
  }

  // error handler middleware
  errorHandler( error: Error,req: express.Request, res: express.Response, next: express.NextFunction ){
    res.status(error.status || 500).send({
      error: {
        status: error.status || 500,
        message: error.message || 'Internal Server Error',
      },
    });
  }
}
export default new ErrorHandlerMiddleware();