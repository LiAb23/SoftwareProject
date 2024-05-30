/**
 * Test suite for the alternateColor function.
 *
 * @module colorUtilsTest
 * @requires module:client/colorUtils
 */

import { alternateColor } from "../../client/colorUtils"

/**
 * Test suite for alternateColor function.
 */
describe("alternateColor", () => {
  /**
   * Test if alternateColor returns blue when current color is yellow.
   */
  test("should return blue when current color is yellow", () => {
    expect(alternateColor("yellow")).toBe("blue")
  })

  /**
   * Test if alternateColor returns pink when current color is blue.
   */
  test("should return pink when current color is blue", () => {
    expect(alternateColor("blue")).toBe("pink")
  })

  /**
   * Test if alternateColor returns yellow when current color is pink.
   */
  test("should return yellow when current color is pink", () => {
    expect(alternateColor("pink")).toBe("yellow")
  })

  /**
   * Test if alternateColor returns yellow when current color is unknown.
   */
  test("should return yellow when current color is unknown", () => {
    expect(alternateColor("unknown")).toBe("yellow")
  })

  /**
   * Test if alternateColor throws an error if no color is provided.
   */
  test("should throw an error if no color is provided", () => {
    expect(() => {
      alternateColor()
    }).toThrow()
  })
})
