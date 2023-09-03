/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface ConfigResponse {
  /** @format int32 */
  id?: number;
  name?: string | null;
  publicKey?: string | null;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  expiresAt?: string;
  /** @format int32 */
  tx?: number;
  /** @format int32 */
  rx?: number;
  isEnabled?: boolean;
}

export interface PayForBuyConfigRequest {
  /** @format int64 */
  telegramId?: number;
  peerName?: string | null;
  type?: PayType;
}

export interface PayResponse {
  type?: PayType;
  internalKey?: string | null;
  paymentUri?: string | null;
}

/** @format int32 */
export enum PayType {
  NewPersonal = NewPersonal,
  NewFamily = NewFamily,
  Gift = Gift,
  RenewPersonal = RenewPersonal,
  RenewFamily = RenewFamily,
  ForFun = ForFun,
}

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Dostup API
 * @version v1
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * No description
     *
     * @tags Config
     * @name ConfigBuyConfigCreate
     * @request POST:/api/Config/BuyConfig
     */
    configBuyConfigCreate: (data: PayForBuyConfigRequest, params: RequestParams = {}) =>
      this.request<PayResponse, any>({
        path: `/api/Config/BuyConfig`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Config
     * @name ConfigWaitBuyConfigDetail
     * @request GET:/api/Config/WaitBuyConfig/{telegramId}/{paymentKey}
     */
    configWaitBuyConfigDetail: (telegramId: number, paymentKey: string, params: RequestParams = {}) =>
      this.request<ConfigResponse, void>({
        path: `/api/Config/WaitBuyConfig/${telegramId}/${paymentKey}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Config
     * @name ConfigGetForUserDetail
     * @request GET:/api/Config/GetForUser/{telegramId}
     */
    configGetForUserDetail: (telegramId: number, params: RequestParams = {}) =>
      this.request<ConfigResponse[], void>({
        path: `/api/Config/GetForUser/${telegramId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Config
     * @name ConfigDisablePartialUpdate
     * @request PATCH:/api/Config/Disable/{telegramId}
     */
    configDisablePartialUpdate: (
      telegramId: number,
      query?: {
        publicKey?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ConfigResponse, void>({
        path: `/api/Config/Disable/${telegramId}`,
        method: "PATCH",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Config
     * @name ConfigEnablePartialUpdate
     * @request PATCH:/api/Config/Enable/{telegramId}
     */
    configEnablePartialUpdate: (
      telegramId: number,
      query?: {
        publicKey?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ConfigResponse, void>({
        path: `/api/Config/Enable/${telegramId}`,
        method: "PATCH",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Config
     * @name ConfigConfigStringDetail
     * @request GET:/api/Config/ConfigString/{telegramId}
     */
    configConfigStringDetail: (
      telegramId: number,
      query?: {
        publicKey?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<string, void>({
        path: `/api/Config/ConfigString/${telegramId}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Config
     * @name ConfigDownloadDetail
     * @request GET:/api/Config/Download/{telegramId}
     */
    configDownloadDetail: (
      telegramId: number,
      query?: {
        publicKey?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/api/Config/Download/${telegramId}`,
        method: "GET",
        query: query,
        ...params,
      }),
  };
}
