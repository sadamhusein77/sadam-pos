import { AxiosError, AxiosResponse } from "axios";

interface MyResponseData {
  code: number;
  message: string;
  data?: any;
  meta?: any; 
}

interface MyErrorResponse {
  response: {
    data: {
      message?: string;
    };
  };
}

export async function processResponseData(response: AxiosResponse<MyResponseData>) {
  const responseData = response.data;
  if (responseData.code > 300) {
    return {
      status: -1,
      message: responseData.message,
      data: responseData.data,
    };
  }

  return {
    status: 1,
    message: responseData.message,
    data: responseData.data,
    meta: responseData.meta,
  };
}

export async function processErrorResponse(error: AxiosError<MyErrorResponse> | any) {
  console.error("Error:", error);
  const { message } = error?.response?.data ?? { message: "An error occurred" };

  return {
    status: -1,
    message: message,
    data: null,
  };
}
