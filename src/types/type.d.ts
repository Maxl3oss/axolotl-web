export type IPagin = {
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalRecord: number;
}

export type IErrorAxios = {
  response: {
    data: {
      statusCode: number;
      taskStatus: boolean;
      message: string;
    };
  }
};

export type IResponse<T = unknown> = {
  statusCode: number;
  taskStatus: boolean;
  data: T;
  pagin: Pagin;
}