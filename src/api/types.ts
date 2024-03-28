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

export interface AddReadingRequest {
  /** @format double */
  value1: number;
  /** @format double */
  value2?: number | null;
}

export interface Address {
  city?: string | null;
  street?: string | null;
  houseNumber?: string | null;
  houseCorpus?: string | null;
  roomNumber?: string | null;
}

export interface ConsumptionRateResponse {
  /** @format double */
  minimumConsumptionRatePerPerson: number | null;
  /** @format double */
  minimumConsumptionRate: number | null;
  /** @format double */
  minimumAverageConsumptionOverPastThreeMonth: number | null;
  /** @format double */
  maximumConsumptionRate: number | null;
}

export enum EIndividualDeviceRateType {
  OneZone = "OneZone",
  TwoZone = "TwoZone",
  ThreeZone = "ThreeZone",
}

export enum EResourceType {
  Heat = "Heat",
  HotWaterSupply = "HotWaterSupply",
  ColdWaterSupply = "ColdWaterSupply",
  Electricity = "Electricity",
}

export interface EResourceTypeConsumptionRateResponseDictionaryItem {
  key?: EResourceType;
  value?: ConsumptionRateResponse | null;
}

export interface ErrorApiResponse {
  errorResponse: ErrorResponse | null;
}

export interface ErrorResponse {
  code: string | null;
  message: string | null;
  text: string | null;
  data: Record<string, any>;
  requestId: string | null;
}

export interface GetAllForReadingAddedResponce {
  devices?: IndividualDeviceForReadingResponse[] | null;
  consumptionRates?: EResourceTypeConsumptionRateResponseDictionaryItem[] | null;
}

export interface HomeownerAccountListResponse {
  /** @format uuid */
  accountId: string;
  accountNumber: string | null;
  /** Автоматический выбор в приложении */
  isDefault: boolean;
}

export interface HomeownerAccountResponse {
  /** @format uuid */
  accountId: string;
  accountNumber: string | null;
  address: Address | null;
  managementFirmTitle: string | null;
}

export interface IndividualDeviceForReadingResponse {
  /** @format int32 */
  id: number;
  model: string | null;
  serialNumber: string | null;
  mountPlace: string | null;
  /** @format int32 */
  bitDepth: number | null;
  rateType: EIndividualDeviceRateType;
  resource: EResourceType;
  currentReading: ReadingResponse | null;
  previousReading: ReadingResponse | null;
}

export interface IndividualDeviceListItemResponse {
  /** @format int32 */
  id: number;
  model: string | null;
  serialNumber: string | null;
  mountPlace: string | null;
  resource: EResourceType;
}

export interface IndividualDeviceResponse {
  /** @format int32 */
  id: number;
  model: string | null;
  serialNumber: string | null;
  mountPlace: string | null;
  rateType: EIndividualDeviceRateType;
  /** @format date-time */
  futureCheckingDate: string;
  resource: EResourceType;
  readings: ReadingResponseWithConsumption[] | null;
}

export interface LoginRequest {
  telegramUserInitData: string;
}

export interface LoginResponse {
  token: string | null;
  /** @format date-time */
  expireAtUtc: string;
}

export interface ManagementFirmInfoResponse {
  managementFirmTitle: string | null;
  address: Address | null;
  phoneNumber: string | null;
  email: string | null;
  workingTime: string | null;
}

export interface ProblemDetails {
  type?: string | null;
  title?: string | null;
  /** @format int32 */
  status?: number | null;
  detail?: string | null;
  instance?: string | null;
  [key: string]: any;
}

export interface ReadingResponse {
  /** @format date-time */
  readingDate: string;
  /** @format double */
  value1: number;
  /** @format double */
  value2: number | null;
}

export interface ReadingResponseWithConsumption {
  /** @format date-time */
  readingDate?: string;
  /** @format double */
  value1?: number;
  /** @format double */
  value2?: number | null;
  /** @format double */
  consumtion1?: number | null;
  /** @format double */
  consumtion2?: number | null;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== "string" ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
            ? JSON.stringify(property)
            : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title Transparent Telegram Api
 * @version 1.0
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * No description
     *
     * @tags Auth
     * @name TgAuthLoginCreate
     * @request POST:/api/tg/Auth/Login
     * @secure
     */
    tgAuthLoginCreate: (data: LoginRequest, params: RequestParams = {}) =>
      this.request<LoginResponse, ProblemDetails | ErrorApiResponse>({
        path: `/api/tg/Auth/Login`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Filters
     * @name TgFiltersCitiesList
     * @request GET:/api/tg/Filters/Cities
     * @secure
     */
    tgFiltersCitiesList: (params: RequestParams = {}) =>
      this.request<string[], ErrorApiResponse>({
        path: `/api/tg/Filters/Cities`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HomeownerAccounts
     * @name TgHomeownerAccountsFindList
     * @request GET:/api/tg/HomeownerAccounts/Find
     * @secure
     */
    tgHomeownerAccountsFindList: (
      query: {
        City: string;
        AccountNumber: string;
        ApartmentNumber: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<HomeownerAccountResponse, ProblemDetails | ErrorApiResponse>({
        path: `/api/tg/HomeownerAccounts/Find`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HomeownerAccounts
     * @name TgHomeownerAccountsList
     * @request GET:/api/tg/HomeownerAccounts
     * @secure
     */
    tgHomeownerAccountsList: (params: RequestParams = {}) =>
      this.request<HomeownerAccountListResponse[], ErrorApiResponse>({
        path: `/api/tg/HomeownerAccounts`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HomeownerAccounts
     * @name TgHomeownerAccountsDetail
     * @request GET:/api/tg/HomeownerAccounts/{accId}
     * @secure
     */
    tgHomeownerAccountsDetail: (accId: string, params: RequestParams = {}) =>
      this.request<HomeownerAccountResponse, ErrorApiResponse>({
        path: `/api/tg/HomeownerAccounts/${accId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HomeownerAccounts
     * @name TgHomeownerAccountsLinkCreate
     * @request POST:/api/tg/HomeownerAccounts/Link
     * @secure
     */
    tgHomeownerAccountsLinkCreate: (
      query: {
        /** @format uuid */
        accId: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/tg/HomeownerAccounts/Link`,
        method: "POST",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags HomeownerAccounts
     * @name TgHomeownerAccountsLinkDelete
     * @request DELETE:/api/tg/HomeownerAccounts/Link
     * @secure
     */
    tgHomeownerAccountsLinkDelete: (
      query: {
        /** @format uuid */
        accId: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/tg/HomeownerAccounts/Link`,
        method: "DELETE",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags HomeownerAccounts
     * @name TgHomeownerAccountsManagementFirmInfoDetail
     * @request GET:/api/tg/HomeownerAccounts/{accId}/ManagementFirmInfo
     * @secure
     */
    tgHomeownerAccountsManagementFirmInfoDetail: (accId: string, params: RequestParams = {}) =>
      this.request<ManagementFirmInfoResponse, ErrorApiResponse>({
        path: `/api/tg/HomeownerAccounts/${accId}/ManagementFirmInfo`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags IndividualDevices
     * @name TgIndividualDevicesList
     * @request GET:/api/tg/IndividualDevices
     * @secure
     */
    tgIndividualDevicesList: (
      query: {
        /** @format uuid */
        accId: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<IndividualDeviceListItemResponse[], ErrorApiResponse>({
        path: `/api/tg/IndividualDevices`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags IndividualDevices
     * @name TgIndividualDevicesDetail
     * @request GET:/api/tg/IndividualDevices/{deviceId}
     * @secure
     */
    tgIndividualDevicesDetail: (
      deviceId: number,
      query: {
        /** @format uuid */
        accId: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<IndividualDeviceResponse, ErrorApiResponse>({
        path: `/api/tg/IndividualDevices/${deviceId}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags IndividualDevices
     * @name TgIndividualDevicesCreate
     * @request POST:/api/tg/IndividualDevices/{deviceId}
     * @secure
     */
    tgIndividualDevicesCreate: (
      deviceId: number,
      query: {
        /** @format uuid */
        accId: string;
      },
      data: AddReadingRequest,
      params: RequestParams = {},
    ) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/tg/IndividualDevices/${deviceId}`,
        method: "POST",
        query: query,
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags IndividualDevices
     * @name TgIndividualDevicesForReadingAddingList
     * @request GET:/api/tg/IndividualDevices/ForReadingAdding
     * @secure
     */
    tgIndividualDevicesForReadingAddingList: (
      query: {
        /** @format uuid */
        accId: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<GetAllForReadingAddedResponce, ErrorApiResponse>({
        path: `/api/tg/IndividualDevices/ForReadingAdding`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),
  };
}
