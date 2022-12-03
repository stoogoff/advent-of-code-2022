#!/usr/local/bin/node

const { read } = require('../utils')

/*const DATA = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`*/

const DATA = read('03-rucksack/data')

const LC_OFFSET = 96
const UC_OFFSET = 38

const intersect = (a, b) => a.map(c => b.includes(c) ? c : false).filter(d => !!d)

let score = 0
let group = []

DATA.split('\n').forEach((line, idx) => {
	const l = line.split('')

	group.push(l.map((c, i) => line.indexOf(c) === i ? c : false).filter(c => !!c))

	// group of three
	if(idx % 3 === 2) {
		const onetwo = intersect(group[0], group[1])
		const twothree = intersect(group[1], group[2])
		const result = intersect(onetwo, twothree).map(c => c.charCodeAt(0) - (c.match(/[a-z]/) ? LC_OFFSET : UC_OFFSET))

		score += result[0]

		group = []
	}
})

console.log(score)