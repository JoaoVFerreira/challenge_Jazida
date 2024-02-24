import { IHttpRequest, IHttpResponse } from './Http';

export interface IController {
  handle(
    httpRequest?: IHttpRequest<any>
  ): Promise<IHttpResponse | void>;
}