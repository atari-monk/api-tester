import { expect } from 'chai'
import { HttpMethod } from 'atari-monk-api-tester-api'
import { ApiTester } from 'atari-monk-api-tester-lib'
import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'

describe('Mock axios and test ApiTester::get', () => {
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

  it('should test GET request with error, when key dosent exist in routing data', async () => {
    const key = 'nonExistentEndpoint'

    try {
      await tester.get(key)
    } catch (error) {
      expect((error as Error).message).to.equal(
        `Endpoint with key '${key}' not found.`
      )
    }
  })

  it('should test GET request successfully', async () => {
    const key = 'endpointKey'

    const mockResponse = [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
    ]

    mock
      .onGet(mockRouting.baseUrl + '/' + mockRouting.endpoints[key].endpoint)
      .reply(200, mockResponse)

    const response = await tester.get(key)
    expect(response.status).to.equal(200)
    expect(response.data).to.deep.equal(mockResponse)
  })
})
