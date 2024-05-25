// colorUtils.test.js
import { alternateColor } from '../../client/colorUtils'

describe('alternateColor', () => {
  test('should return blue when current color is yellow', () => {
    expect(alternateColor('yellow')).toBe('blue')
  })

  test('should return pink when current color is blue', () => {
    expect(alternateColor('blue')).toBe('pink')
  })

  test('should return yellow when current color is pink', () => {
    expect(alternateColor('pink')).toBe('yellow')
  })

  test('should return yellow when current color is unknown', () => {
    expect(alternateColor('unknown')).toBe('yellow')
  })

  test('should throw an error if no color is provided', () => {
    expect(() => {
      alternateColor()
    }).toThrow()
  })
})
