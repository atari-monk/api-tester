import axios, { AxiosError, AxiosResponse } from 'axios'
import { IApiTester, IRouting } from 'atari-monk-api-tester-api'

export class ApiTester implements IApiTester {
  constructor(private readonly routing: IRouting) {}

  public async get(key: string): Promise<AxiosResponse> {
    try {
      const response = await axios.get(this.buildTestData(key))
      console.log('Elements Count:', response.data.length)
      return response
    } catch (error) {
      const axiosError = error as AxiosError
      console.error('Error:', axiosError.message)
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

    console.log(`${nr}. ${key}`)
    console.log('Endpoint:', url)
    return url
  }

  public async post(key: string, postData: object): Promise<AxiosResponse> {
    try {
      return await axios.post(this.buildTestData(key), postData)
    } catch (error) {
      const axiosError = error as AxiosError
      console.error('Error:', axiosError.message)
      throw axiosError
    }
  }

  //todo: assert 200
  public async patch(key: string, patchData: object): Promise<AxiosResponse> {
    try {
      return await axios.patch(this.buildTestData(key), patchData)
    } catch (error) {
      const axiosError = error as AxiosError
      console.error('Error:', axiosError.message)
      throw axiosError
    }
  }

  //todo: assert 200
  public async delete(key: string): Promise<AxiosResponse> {
    try {
      return await axios.delete(this.buildTestData(key))
    } catch (error) {
      const axiosError = error as AxiosError
      console.error('Error:', axiosError.message)
      throw axiosError
    }
  }
}
