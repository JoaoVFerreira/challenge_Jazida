export interface IHttpResponse<T = any> {
  response?: T;
  count?: number;
  message: string;
}

export interface IHttpRequest<T extends IHttpRequest<any> = any> {
  query?: T['query'];
  params?: T['params'];
  body?: T['body'];
  headers?: T['headers'];
  files?: any;
  user?: number;
  request?: any;
  clientIps?: string[];
  userAgent?: any;
}