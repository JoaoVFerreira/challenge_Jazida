import { NextFunction, Request, Response } from 'express';
import { container, InjectionToken } from 'tsyringe';
import { IController, IHttpRequest } from '$shared/infra/presentation/protocols';
import { StatusCodes } from 'http-status-codes';

export const adaptRoute = (
  controllerClass: InjectionToken<IController>
): any => {
  return async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    const httpRequest: IHttpRequest<any> = {
      body: req.body,
      headers: req.headers,
      params: req.params,
      query: req.query,
      request: req,
    };

    try {
      const controller = container.resolve(controllerClass);
      const response = await controller.handle(httpRequest);
      if (!response) return res.status(StatusCodes.NO_CONTENT).json(response);
      return res.json(response);
    } catch (err) {
      next(err);
    }
  };
};
