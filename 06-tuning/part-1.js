#!/usr/local/bin/node

const { read } = require('../utils')

/*const DATA = `bvwbjplbgvbhsrlpgdmjqwftvncz
nppdvjthqldpwncqszvftbrmjlhg
nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg
zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw`*/

const DATA = read('06-tuning/data')

const OFFSET = 14
const result = []

DATA.split('\n').forEach(line => {
	for(let i = 0, ilen = line.length - OFFSET; i < ilen; ++i) {
		const code = line.substring(i, i + OFFSET).split('')
		const hasMatch = code.map((c, idx) => code.indexOf(c) !== idx).reduce((acc, cur) => acc || cur, false)

		if(!hasMatch) {
			result.push(i + OFFSET)
			break
		}
	}
})

console.log(result)
