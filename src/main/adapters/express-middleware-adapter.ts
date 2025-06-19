import { NextFunction, Request, Response } from 'express';
import { HttpRequest } from '../../apresentation/protocols';
import { Middleware } from '../../apresentation/protocols/midleware';

export const middlewareAdapter = (middleware: Middleware) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const httpRequest: HttpRequest = {
      header: req.headers,
    };

    const httpResponse = await middleware.handle(httpRequest);

    if (httpResponse.statusCode === 200 || httpResponse.statusCode === 201) {
      (req as any).token = httpResponse.body.token;
      next();
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message,
      });
    }
  };
};
