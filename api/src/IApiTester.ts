import { AxiosResponse } from 'axios'

export interface IApiTester {
  get(key: string): Promise<AxiosResponse>
  post(key: string, postData: object): Promise<AxiosResponse>
  patch(key: string, patchData: object): Promise<AxiosResponse>
  delete(key: string): Promise<AxiosResponse>
}
