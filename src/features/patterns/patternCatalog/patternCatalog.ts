import {
  brickPattern,
  checkerPattern,
  circlesPattern,
  diagonalPattern,
  dotsPattern,
  gridPattern,
  horizontalPattern,
  otherDiagonalPattern,
  slashPattern,
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
  brick: brickPattern,
  circles: circlesPattern,
  slash: slashPattern,
};

export function patternSource(id: string): string {
  return patternSources[id] ?? diagonalPattern;
}
