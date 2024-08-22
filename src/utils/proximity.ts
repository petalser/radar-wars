import splitter from "./splitter";

export default function proximity(shot: number, targets: number[]) {
  const [shotX, shotY] = splitter(shot);
  let shortestRadius: number = 0;

  for (const spot of targets) {
    const [targetX, targetY] = splitter(spot);

    const radius = Math.sqrt(
      Math.pow(targetX - shotX, 2) + Math.pow(targetY - shotY, 2)
    );
    if (shortestRadius === 0 || radius < shortestRadius)
      shortestRadius = radius;
  }
  return shortestRadius;
}
