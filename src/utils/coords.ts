import type { Coord } from "@/types/game"

export const indexToCoords = (index: number, dimensionWidth: number) => {
  return {
    x: index % dimensionWidth,
    y: Math.floor(index / dimensionWidth),
  }
}

export const coordsToIndex = (coords: Coord, dimensionWidth: number) => {
  return coords.x * dimensionWidth + coords.y
}
