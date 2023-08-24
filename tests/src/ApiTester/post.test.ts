import { expect } from 'chai'
import { HttpMethod } from 'atari-monk-api-tester-api'
import { ApiTester } from 'atari-monk-api-tester-lib'
import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'

describe('Mock axios and test ApiTester::post', () => {
  const mockRouting = {
    baseUrl: 'https://example.com/api',
    endpoints: {
      endpointKey: { endpoint: 'endpointURL', method: HttpMethod.GET },
    },
  }

  const tester = new ApiTester()
  tester.routing = mockRouting
  let mock: MockAdapter

  beforeEach(() => {
    mock = new MockAdapter(axios)
  })

  it('should test POST request with error, when key does not exist in routing data', async () => {
    const key = 'nonExistentEndpoint'
    const postData = { data: 'some data' }

    try {
      await tester.post(key, postData)
    } catch (error) {
      expect((error as Error).message).to.equal(
        `Endpoint with key '${key}' not found.`
      )
    }
  })

  it('should test POST request successfully', async () => {
    const key = 'endpointKey'
    const postData = { data: 'some data' }

    const mockResponse = { success: true }
    const status = 201

    mock
      .onPost(mockRouting.baseUrl + '/' + mockRouting.endpoints[key].endpoint)
      .reply(status, mockResponse)

    const response = await tester.post(key, postData)
    expect(response.status).to.equal(status)
    expect(response.data).to.deep.equal(mockResponse)
  })
})
