import splitter from "./splitter";

export default function calculateCircleFromPoints(
  shot: number,
  radius: number
) {
  const [centerX, centerY] = splitter(shot);
  const points = [];

  for (let angle = 0; angle < 360; angle += 1) {
    const radians = angle * (Math.PI / 180); // Convert angle to radians
    const x = Math.round(centerX + radius * Math.cos(radians));
    const y = Math.round(centerY + radius * Math.sin(radians));
    if (x < 0 || x > 99 || y < 0 || y > 99) continue;
    points.push(x * 100 + y);
  }

  const uniquePoints = Array.from(new Set(points));

  return uniquePoints;
}
