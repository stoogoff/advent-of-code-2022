#!/usr/local/bin/node

const { read } = require('../utils')

/*const DATA = `A Y
B X
C Z`*/
/*const DATA = `A X
A Y
A Z
B X
B Y
B Z
C X
C Y
C Z`*/
const DATA = read('02-rpssl/data')

const ROCK = 1
const PAPER = 2
const SCISSORS = 3
const POINTS_DRAW = 3
const POINTS_WIN = 6

const map = {
	A: ROCK,
	B: PAPER,
	C: SCISSORS,
	X: ROCK,
	Y: PAPER,
	Z: SCISSORS,
}

let score = 0

DATA.split('\n').map(line => {
	const parts = line.split(' ')
	const left = map[parts[0]]
	const right = map[parts[1]]

	score += right

	const par = right - left

	switch(par) {
		case 0: // draw
			score += POINTS_DRAW
			break

		case -2: // rock beats scissors
		case 1: // victory
			score += POINTS_WIN
			break
	}
})

console.log('Score = ', score)
