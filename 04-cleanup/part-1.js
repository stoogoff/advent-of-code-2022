#!/usr/local/bin/node

const { read } = require('../utils')

/*const DATA = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`*/

const DATA = read('04-cleanup/data')

let contains = 0
const range = input => input.split('-').map(val => parseInt(val))

DATA.split('\n').forEach(line => {
	const parts = line.split(',')
	const left = range(parts[0])
	const right = range(parts[1])

	if(
		(left[0] <= right[0] && left[1] >= right[1]) ||
		(left[0] >= right[0] && left[1] <= right[1])
	) ++contains
})

console.log(contains)