import { Controller, HttpRequest } from '../../apresentation/protocols';
import { type Request, type Response } from 'express';

import { type Readable } from 'stream';

interface MulterRequest extends Request {
  file: {
    filename: string;
    originalname: string;
    fieldname: string;
    encoding: string;
    mimetype: string;
    size: number;
    stream: Readable;
    destination: string;
    path: string;
    buffer: Buffer;
  };
  token: string;
}

export const expressAdapterRouter = (controller: Controller) => {
  return async (req: MulterRequest, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body,
      query: req.query,
      file: req.file,
      params: req.params,
      token: req.token,
    };

    const httpResponse = await controller.handle(httpRequest);
    if (httpResponse.statusCode === 201 || httpResponse.statusCode === 200 || httpResponse.statusCode === 500) {
      res.status(httpResponse.statusCode).json(httpResponse.body);
    } else {
      res.status(httpResponse.statusCode).json({ error: httpResponse.body.message });
    }
  };
};
