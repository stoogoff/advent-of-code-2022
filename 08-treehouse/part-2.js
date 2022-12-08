#!/usr/local/bin/node

const { read } = require('../utils')

/*const DATA = `30373
25512
65332
33549
35390`*/

const DATA = read('08-treehouse/data')

const grid = []

DATA.split('\n').forEach(line => {
	grid.push(line.split('').map(cell => parseInt(cell)))
})

const isXHidden = (row, start, dir) => {
	let current = start

	do {
		current += dir
		if(row[current] >= row[start]) break
	} while(current >= 1 && current < row.length - 1)

	return current > start ? current - start : start - current
}

const isYHidden = (rowPos, start, dir) => {
	let current = start

	do {
		current += dir
		if(grid[current][rowPos] >= grid[start][rowPos]) break
	} while(current >= 1 && current < grid.length - 1)

	return current > start ? current - start : start - current
}

let total = 0
//console.log(grid)

for(let y = 1, ylen = grid.length - 1; y < ylen; ++y) {
	const row = grid[y]

	for(let x = 1, xlen = row.length - 1; x < xlen; ++x) {
		let currentTotal =
			isYHidden(x, y, -1) *
			isXHidden(row, x, -1) *
			isYHidden(x, y, 1) *
			isXHidden(row, x, 1)

			if(currentTotal > total) total = currentTotal
	}
}

console.log('Total = ', total)
