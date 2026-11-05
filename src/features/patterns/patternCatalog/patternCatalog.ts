import {
  bigDotsPattern,
  brickPattern,
  checkerPattern,
  circlesPattern,
  diagonalPattern,
  dotsPattern,
  gridPattern,
  horizontalPattern,
  otherDiagonalPattern,
  plusPattern,
  slashPattern,
  starPattern,
  verticalPattern,
} from "./patternCatalog.constants.ts";

const patternSources: Record<string, string> = {
  diagonal: diagonalPattern,
  "other-diagonal": otherDiagonalPattern,
  horizontal: horizontalPattern,
  vertical: verticalPattern,
  grid: gridPattern,
  checker: checkerPattern,
  dots: dotsPattern,
  "big-dots": bigDotsPattern,
  plus: plusPattern,
  star: starPattern,
  brick: brickPattern,
  circles: circlesPattern,
  slash: slashPattern,
};

export function patternSource(id: string): string {
  return patternSources[id] ?? diagonalPattern;
}
