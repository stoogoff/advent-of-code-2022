#!/usr/local/bin/node

const { read, sum } = require('../utils')

/*const DATA = `noop
addx 3
addx -5`*/

const DATA = `addx 15
addx -11
addx 6
addx -3
addx 5
addx -1
addx -8
addx 13
addx 4
noop
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx -35
addx 1
addx 24
addx -19
addx 1
addx 16
addx -11
noop
noop
addx 21
addx -15
noop
noop
addx -3
addx 9
addx 1
addx -3
addx 8
addx 1
addx 5
noop
noop
noop
noop
noop
addx -36
noop
addx 1
addx 7
noop
noop
noop
addx 2
addx 6
noop
noop
noop
noop
noop
addx 1
noop
noop
addx 7
addx 1
noop
addx -13
addx 13
addx 7
noop
addx 1
addx -33
noop
noop
noop
addx 2
noop
noop
noop
addx 8
noop
addx -1
addx 2
addx 1
noop
addx 17
addx -9
addx 1
addx 1
addx -3
addx 11
noop
noop
addx 1
noop
addx 1
noop
noop
addx -13
addx -19
addx 1
addx 3
addx 26
addx -30
addx 12
addx -1
addx 3
addx 1
noop
noop
noop
addx -9
addx 18
addx 1
addx 2
noop
noop
addx 9
noop
noop
noop
addx -1
addx 2
addx -37
addx 1
addx 3
noop
addx 15
addx -21
addx 22
addx -6
addx 1
noop
addx 2
addx 1
noop
addx -10
noop
noop
addx 20
addx 1
addx 2
addx 2
addx -6
addx -11
noop
noop
noop`

//const DATA = read('10-cathode/data')

const instructions = []
let value = 1

DATA.split('\n').forEach(line => {
	if(line === 'noop') {
		instructions.push(value)
	}
	else {
		const parts = line.split(' ')
		const adjustment = parseInt(parts[1])

		instructions.push(value)

		value += adjustment

		instructions.push(value)
	}
})

const superBuffer = []

for(let y = 0; y < 6; ++y) {
	const buffer = []

	for(let x = 0; x < 40; ++x) {
		const pos = x + (y * 40)
		const value = instructions[pos]
		console.log(pos, value)
		if(value === pos || value === pos -1 || value === pos + 1) {
			buffer.push('#')
		}
		else {
			buffer.push('.')
		}
	}

	superBuffer.push(buffer.join(''))
}

console.log(superBuffer.join('\nx'))
