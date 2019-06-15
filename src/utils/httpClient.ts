
import axios, { AxiosRequestConfig, AxiosResponse, AxiosInstance } from 'axios';
import { USER_TOKEN } from '../models/typings/constants';
import { CustomResponse } from '../models';

export interface Options {
  baseUrl: string;
}

export default class HttpClient {
  private instance: AxiosInstance;

  constructor(options?: Options) {
    this.instance = axios.create({
      baseURL: (options && options.baseUrl) || '',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    });
  }

  get(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<CustomResponse>> {
    return this.instance.get(url, this.buildRequestConfig(config));
  }

  post(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<CustomResponse>> {
    return this.instance.post(url, data, this.buildRequestConfig(config));
  }

  private buildRequestConfig(config?: AxiosRequestConfig): AxiosRequestConfig {
    let _config = config || {};

    _config = {
      headers: {
        'x-access-token': sessionStorage.getItem(USER_TOKEN) || '',
        ..._config.headers,
      },
      ...config,
    };

    return _config;
  }
}
