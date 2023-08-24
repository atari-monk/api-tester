import { expect } from 'chai'
import { HttpMethod } from 'atari-monk-api-tester-api'
import { ApiTester } from 'atari-monk-api-tester-lib'
import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'

describe('Mock axios and test ApiTester::delete', () => {
  const mockRouting = {
    baseUrl: 'https://example.com/api',
    endpoints: {
      endpointKey: { endpoint: 'endpointURL', method: HttpMethod.DELETE },
    },
  }

  const tester = new ApiTester(mockRouting)
  let mock: MockAdapter

  beforeEach(() => {
    mock = new MockAdapter(axios)
  })

  it('should test DELETE request with error, when key does not exist in routing data', async () => {
    const key = 'nonExistentEndpoint'

    try {
      await tester.delete(key)
    } catch (error) {
      expect((error as Error).message).to.equal(
        `Endpoint with key '${key}' not found.`
      )
    }
  })

  it('should test DELETE request successfully', async () => {
    const key = 'endpointKey'

    const mockResponse = { success: true }
    const status = 204

    mock
      .onDelete(mockRouting.baseUrl + '/' + mockRouting.endpoints[key].endpoint)
      .reply(status, mockResponse)

    const response = await tester.delete(key)
    expect(response.status).to.equal(status)
    expect(response.data).to.deep.equal(mockResponse)
  })
})
