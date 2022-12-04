#!/usr/local/bin/node

const { read } = require('../utils')

/*const DATA = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8
67-91,66-66`*/
/*const DATA = `67-84,66-87
70-70,40-69
32-77,31-78
10-84,11-96
15-95,14-94
53-55,48-54
40-92,39-93
67-91,66-66
74-99,74-98
2-49,50-86`*/
const DATA = read('04-cleanup/data')

let contains = 0
const range = input => input.split('-').map(val => parseInt(val))

DATA.split('\n').forEach(line => {
	const parts = line.split(',')
	const left = range(parts[0])
	const right = range(parts[1])

	if(left[1] >= right[0] && right[1] >= left[0]) {
		++contains
	}
})

console.log(contains)