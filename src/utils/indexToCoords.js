export const indexToCoords = (index, dimensionWidth) => {
	return {
		x: Math.floor(index / dimensionWidth),
		y: index % dimensionWidth
	}
}
