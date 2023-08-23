import axios, { AxiosError, AxiosResponse } from 'axios'
import { IApiTester, IRouting } from 'atari-monk-api-tester-api'

export class ApiTester implements IApiTester {
  constructor(private readonly routing: IRouting) {}

  public async testGet(key: string): Promise<AxiosResponse> {
    try {
      const { nr, url } = this.buildTestData(key)
      console.log(`${nr}. ${key}`)
      console.log('Endpoint:', url)

      const response = await axios.get(url)
      console.log('Elements Count:', response.data.length)

      return response
    } catch (error) {
      const axiosError = error as AxiosError
      console.error('Error:', (error as Error).message)
      throw axiosError
    }
  }

  private buildTestData(key: string) {
    const endpoint = this.routing.endpoints[key]

    if (!endpoint) {
      throw new Error(`Endpoint with key '${key}' not found.`)
    }

    const keys = Object.keys(this.routing.endpoints)
    const nr = keys.indexOf(key) + 1

    const url = this.routing.baseUrl + '/' + endpoint.endpoint
    return { nr, url }
  }

  public async testPost(
    key: string,
    postData: object,
    showData: boolean = false
  ): Promise<string> {
    try {
      const { nr, url } = this.buildTestData(key)
      console.log(`${nr}. ${key}`)
      console.log('Endpoint:', url)

      const response: AxiosResponse = await axios.post(url, postData)
      return this.handleResponse(response, 201, showData)
    } catch (error) {
      const axiosError = error as AxiosError
      console.error('Error:', axiosError)
      return ''
    }
  }

  private handleResponse(
    response: AxiosResponse,
    expectedStatus: number,
    showData: boolean
  ) {
    if (response.status === expectedStatus) {
      console.log('Response Status:', response.status)

      if (showData) {
        console.log('Data:', response.data)
      }

      return response.data
    } else {
      throw new Error('Unexpected response status: ' + response.status)
    }
  }

  public async testPatch(
    key: string,
    patchData: object,
    showData: boolean = false
  ): Promise<void> {
    try {
      const { nr, url } = this.buildTestData(key)
      console.log(`${nr}. ${key}`)
      console.log('Endpoint:', url)

      const response: AxiosResponse = await axios.patch(url, patchData)
      this.handleResponse(response, 200, showData)
    } catch (error) {
      const axiosError = error as AxiosError
      console.error('Error:', axiosError)
    }
  }

  public async testDelete(
    key: string,
    showData: boolean = false
  ): Promise<void> {
    try {
      const { nr, url } = this.buildTestData(key)
      console.log(`${nr}. ${key}`)
      console.log('Endpoint:', url)

      const response: AxiosResponse = await axios.delete(url)
      this.handleResponse(response, 200, showData)
    } catch (error) {
      const axiosError = error as AxiosError
      console.error('Error:', axiosError.response?.data)
    }
  }
}
