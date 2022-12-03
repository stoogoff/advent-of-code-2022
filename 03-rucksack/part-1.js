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

let score = 0

DATA.split('\n').forEach(line => {
	const parts = line.split('')
	const left = parts.slice(0, parts.length / 2)
	const right = parts.slice(parts.length / 2)
	const dupe = left.filter(c => right.includes(c)).map(c => c.charCodeAt(0) - (c.match(/[a-z]/) ? LC_OFFSET : UC_OFFSET))

	score += dupe[0]
})

console.log(score)