/**
 * Calculates the estimated calories burned during a cycling session based on average speed.
 * @param   {number} weightKg - Weight in kilograms.
 * @param   {number} avgSpeed - Average speed in km/h.
 * @param   {number} durationHours - Duration in hours.
 * @returns {number} Estimated calories burned.
 */
const calcCalories = function (weightKg, avgSpeed, duration) {
  let met;

  if (avgSpeed < 16) {
    met = 5.8;
  } else if (avgSpeed >= 16 && avgSpeed <= 19) {
    met = 6.8;
  } else if (avgSpeed > 19) {
    met = 8.0;
  } else {
    console.error("Invalid average speed provided to calc MET");
  }

  const caloriesPerMinute = (met * 3.5 * weightKg) / 200;
  const durationMinutes = duration * 60;
  const totalCalories = caloriesPerMinute * durationMinutes;

  return Number(totalCalories).toFixed(1);
};

export default calcCalories;
