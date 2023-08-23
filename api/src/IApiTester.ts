export interface IApiTester {
  testGet(key: string, showFirst: boolean): Promise<void>
  testPost(key: string, postData: object, showData: boolean): Promise<string>
  testPatch(key: string, patchData: object, showData: boolean): Promise<void>
  testDelete(key: string, showData: boolean): Promise<void>
}
