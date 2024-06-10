import moment from 'moment'
import { CountdownService } from './countdown.service'

describe('CountdownService', () => {
  let service: CountdownService

  beforeEach(() => {
    service = new CountdownService()
  })

  afterEach(() => {
    jasmine.clock().uninstall()
  })

  describe('#getCountdown', () => {
    it('should return the correct string', () => {
      const tomorrow = moment().add(1, 'day').startOf('day')
      jasmine
        .clock()
        .mockDate(
          tomorrow
            .clone()
            .subtract(25, 'hours')
            .subtract(10, 'minutes')
            .subtract(30, 'seconds')
            .toDate(),
        )
      expect(service.getCountdownString(tomorrow)).toBe('1 days, 1 h, 10m, 30s')
    })
  })
})
