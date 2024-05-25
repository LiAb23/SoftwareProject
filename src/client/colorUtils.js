
// Flytta ut funktionen här
export function alternateColor(currentColor) {
  if (currentColor === "yellow") {
    return "blue"
  } else if (currentColor === "blue") {
    return "pink"
  } else {
    return "yellow"
  }
}