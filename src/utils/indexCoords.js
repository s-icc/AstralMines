export const indexToCoords = (index, dimensionWidth) => {
	return {
		x: Math.floor(index / dimensionWidth),
		y: index % dimensionWidth
	}
}

export const coordsToIndex = (x, y, dimensionWidth) => {
	return x * dimensionWidth + y
}
