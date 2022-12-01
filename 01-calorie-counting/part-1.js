#!/usr/local/bin/node

const { read } = require('../utils')

/*const DATA = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`*/

const DATA = read('01-calorie-counting/data')

const groups = []
let groupIndex = 0

DATA.split('\n').forEach(line => {
	if(line === '') {
		++groupIndex
		return
	}
	if(!groups[groupIndex]) groups[groupIndex] = 0

	groups[groupIndex] += parseInt(line)
})

const max = (a, c) => Math.max(a, c)
const sum = (a, c) => a + c

console.log(groups)
console.log('Highest =', groups.reduce(max, 0))
console.log('Top 3 =', groups.sort((a, b) => b - a).slice(0, 3).reduce(sum, 0))
