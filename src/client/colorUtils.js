/**
 * Function that returns the next color in a sequence of alternating yellow, blue and pink.
 *
 * @param {string} currentColor - The current color that needs to be alternated.
 * @returns {string} - The next color in the sequence.
 * @version 1.0.0
 * @author Liv <lh224hh@student.lnu.se>
 */

export function alternateColor(currentColor) {
  if (currentColor === "yellow") {
    return "blue"
  } else if (currentColor === "blue") {
    return "pink"
  } else {
    return "yellow"
  }
}
