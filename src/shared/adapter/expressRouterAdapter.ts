import { NextFunction, Request, Response } from 'express';
import { container, InjectionToken } from 'tsyringe';
import { IController, IHttpRequest } from '$shared/infra/presentation/protocols';

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
      return res.json(response);
    } catch (err) {
      next(err);
    }
  };
};
