export const GAME_TITLE = 'Astral Mines'

export const DEFAULT_THEME = 'forest'

export const THEMES = {
	Default: { VALUE: DEFAULT_THEME },
	Retro: { VALUE: 'retro' },
	Dracula: { VALUE: 'dracula' },
	Valentine: { VALUE: 'valentine' },
	Night: { VALUE: 'night' }
}

export const THEMES_VALUES = Object.values(THEMES).map((theme) => theme.VALUE)

export const NEARBY_CELLS = [
	{ x: -1, y: -1 },
	{ x: -1, y: 0 },
	{ x: -1, y: 1 },
	{ x: 0, y: -1 },
	{ x: 0, y: 1 },
	{ x: 1, y: -1 },
	{ x: 1, y: 0 },
	{ x: 1, y: 1 }
]

export const CELL_CONTENT = {
	EMPTY: {
		VALUE: 0,
		LABEL: ''
	},
	MINE: {
		VALUE: -1,
		LABEL: '💣'
	}
}

export const CELL_MARK = '🚩'
