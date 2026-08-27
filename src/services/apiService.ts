import {
  BaseQueryFn,
  createApi,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import axios, { AxiosRequestConfig } from "axios";

type AxiosBaseQueryArgs = {
  url?: string;
  method: AxiosRequestConfig["method"];
  data?: AxiosRequestConfig["data"];
  params?: AxiosRequestConfig["params"];
  headers?: AxiosRequestConfig["headers"];
};

const axiosBaseQuery: BaseQueryFn<
  AxiosBaseQueryArgs,
  any,
  FetchBaseQueryError
> = async ({ url, method, data, params, headers }) => {
  //This is the root apiService for all the authenticated pages your rtk query api service to use axios as it base instead of fetch. So include your token here and baseurl"use client";////
  try {
    const TOKEN = "token";
    axios.defaults.baseURL = process.env.BASE_URL;
    if (TOKEN) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + TOKEN;
    }
    const result = await axios({
      url,
      method,
      data,
      params,
      headers,
    });

    return {
      data: result.data,
    };
  } catch (axiosError) {
    const error: any = axiosError;

    return {
      error: {
        status: error.response ?? 500,
        data: error.response ?? error.message,
      } as FetchBaseQueryError,
    };
  }
};

export const apiService = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery,
  tagTypes: [],
  endpoints: () => ({}),
});
