export default function splitter(coord: number): [number, number] {
  return [Math.floor(coord / 100), coord % 100];
}
