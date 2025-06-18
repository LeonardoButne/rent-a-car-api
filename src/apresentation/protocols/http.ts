export type HttpResponse = {
  statusCode: number;
  body: any;
};

export type HttpRequest = {
  body?: any;
  header?: any;
  file?: any;
  files?: any;
  query?: any;
  params?: any;
  token?: any;
};
