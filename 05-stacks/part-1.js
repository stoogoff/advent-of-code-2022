#!/usr/local/bin/node

const { read } = require('../utils')


/*const DATA = `move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`

const stack = [
	[],
	['N', 'Z'],
	['D', 'C', 'M'],
	['P'],
]*/

const DATA = read('05-stacks/data')
/*
                [B]     [L]     [S]
        [Q] [J] [C]     [W]     [F]
    [F] [T] [B] [D]     [P]     [P]
    [S] [J] [Z] [T]     [B] [C] [H]
    [L] [H] [H] [Z] [G] [Z] [G] [R]
[R] [H] [D] [R] [F] [C] [V] [Q] [T]
[C] [J] [M] [G] [P] [H] [N] [J] [D]
[H] [B] [R] [S] [R] [T] [S] [R] [L]
 1   2   3   4   5   6   7   8   9 
*/
const stack = [
	[],
	['R', 'C', 'H'],
	['F', 'S', 'L', 'H', 'J', 'B'],
	['Q', 'T', 'J', 'H', 'D', 'M', 'R'],
	['J', 'B', 'Z', 'H', 'R', 'G', 'S'],
	['B', 'C', 'D', 'T', 'Z', 'F', 'P', 'R'],
	['G', 'C', 'H', 'T'],
	['L', 'W', 'P', 'B', 'Z', 'V', 'N', 'S'],
	['C', 'G', 'Q', 'J', 'R'],
	['S', 'F', 'P', 'H', 'R', 'T', 'D', 'L'],
]

const instruction = /^move (\d+) from (\d+) to (\d+)$/

DATA.split('\n').forEach(line => {
	const result = instruction.exec(line)

	// result[1] number to move
	// result[2] source stack
	// result[3] target stack
	const source = stack[result[2]].splice(0, result[1])

	//stack[result[3]].unshift(...(source.reverse())) // PART 1
	stack[result[3]].unshift(...source) // PART 2
})

console.log(stack.filter(row => row.length).map(row => row[0]).join(''))