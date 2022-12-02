#!/usr/local/bin/node

const { read } = require('../utils')

/*const DATA = `A Y
B X
C Z`*/
const DATA = read('02-rpssl/data')

const ROCK = 1
const PAPER = 2
const SCISSORS = 3
const POINTS_DRAW = 3
const POINTS_WIN = 6

const shift = {
	[ROCK]: PAPER,
	[PAPER]: SCISSORS,
	[SCISSORS]: ROCK,
	4: PAPER,
}

const map = {
	A: ROCK,
	B: PAPER,
	C: SCISSORS,
	X: left => shift[left + 1], // lose
	Y: left => left + POINTS_DRAW, // draw
	Z: left => shift[left] + POINTS_WIN, // win
}

let score = 0

DATA.split('\n').map(line => {
	const parts = line.split(' ')
	const left = map[parts[0]]
	const right = map[parts[1]]

	score += right(left)
})

console.log('Score = ', score)
