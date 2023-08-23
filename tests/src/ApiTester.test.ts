import { expect } from 'chai'
import { HttpMethod } from 'atari-monk-api-tester-api'
import { ApiTester } from 'atari-monk-api-tester-lib'

describe('ApiTester', () => {
  const mockRouting = {
    baseUrl: 'https://example.com/api',
    endpoints: {
      endpointKey: { endpoint: 'endpointURL', method: HttpMethod.GET },
    },
  }

  const tester = new ApiTester(mockRouting)

  it('should test GET request with error, when key dosent exist in routing data', async () => {
    const key = 'nonExistentEndpoint'

    try {
      await tester.testGet(key)
    } catch (error) {
      expect((error as Error).message).to.equal(
        `Endpoint with key '${key}' not found.`
      )
    }
  })
})
