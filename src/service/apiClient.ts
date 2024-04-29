import axios, { AxiosRequestConfig } from "axios";
import { currentConfig } from '../../config';
import { Book } from "../types/book";


export interface FetchResponse<T> {
  filter(arg0: (book: import("../types/book").Book) => boolean): Book[];
  map(arg0: (book: any, index: any) => import("react/jsx-runtime").JSX.Element): import("react").ReactNode;
  count: number;
  next: string | null;
  results: T[];
}

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

class ApiClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = (config?: AxiosRequestConfig) =>
    axiosInstance
      .get<FetchResponse<T>>(this.endpoint, config)
      .then((res) => res.data);
}

export default ApiClient;