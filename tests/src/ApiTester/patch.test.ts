import { expect } from 'chai'
import { HttpMethod } from 'atari-monk-api-tester-api'
import { ApiTester } from 'atari-monk-api-tester-lib'
import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'

describe('Mock axios and test ApiTester::patch', () => {
  const mockRouting = {
    baseUrl: 'https://example.com/api',
    endpoints: {
      endpointKey: { endpoint: 'endpointURL', method: HttpMethod.GET },
    },
  }

  const tester = new ApiTester(mockRouting)
  let mock: MockAdapter

  beforeEach(() => {
    mock = new MockAdapter(axios)
  })

  it('should test PATCH request with error when key does not exist in routing data', async () => {
    const key = 'nonExistentEndpoint'
    const patchData = { updatedData: 'some updated data' }

    try {
      await tester.patch(key, patchData)
    } catch (error) {
      expect((error as Error).message).to.equal(
        `Endpoint with key '${key}' not found.`
      )
    }
  })

  it('should test PATCH request successfully', async () => {
    const key = 'endpointKey'
    const patchData = { updatedData: 'some updated data' }

    const mockResponse = { success: true }
    const status = 200

    mock
      .onPatch(mockRouting.baseUrl + '/' + mockRouting.endpoints[key].endpoint)
      .reply(status, mockResponse)

    const response = await tester.patch(key, patchData)
    expect(response.status).to.equal(status)
    expect(response.data).to.deep.equal(mockResponse)
  })
})
