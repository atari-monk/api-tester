import { AxiosResponse } from 'axios'

export interface IApiTester {
  testGet(key: string): Promise<AxiosResponse>
  testPost(key: string, postData: object, showData: boolean): Promise<string>
  testPatch(key: string, patchData: object, showData: boolean): Promise<void>
  testDelete(key: string, showData: boolean): Promise<void>
}
