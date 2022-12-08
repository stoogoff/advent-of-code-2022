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
		if(row[current] >= row[start]) return true
	} while(current >= 1 && current < row.length - 1)

	return false
}

const isYHidden = (rowPos, start, dir) => {
	let current = start

	do {
		current += dir
		if(grid[current][rowPos] >= grid[start][rowPos]) return true
	} while(current >= 1 && current < grid.length - 1)

	return false
}

let inner = 0
const outer = (grid.length * 2) + ((grid[0].length - 2) * 2)

for(let y = 1, ylen = grid.length - 1; y < ylen; ++y) {
	const row = grid[y]

	for(let x = 1, xlen = row.length - 1; x < xlen; ++x) {
		if(!isXHidden(row, x, 1)) {
			inner++
			continue
		}

		if(!isXHidden(row, x, -1)) {
			inner++
			continue
		}

		if(!isYHidden(x, y, -1)) {
			inner++
			continue
		}

		if(!isYHidden(x, y, 1)) {
			inner++
			continue
		}
	}
}

console.log(outer + inner)