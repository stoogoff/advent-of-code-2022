#!/usr/local/bin/node

const { read } = require('../utils')

/*const DATA = `Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3

Monkey 1:
  Starting items: 54, 65, 75, 74
  Operation: new = old + 6
  Test: divisible by 19
    If true: throw to monkey 2
    If false: throw to monkey 0

Monkey 2:
  Starting items: 79, 60, 97
  Operation: new = old * old
  Test: divisible by 13
    If true: throw to monkey 1
    If false: throw to monkey 3

Monkey 3:
  Starting items: 74
  Operation: new = old + 3
  Test: divisible by 17
    If true: throw to monkey 0
    If false: throw to monkey 1`*/


const DATA = read('11-monkey/data')

class Monkey {
	constructor(input) {
		this.items = []
		this.operation = () => {}
		this.test = () => {}
		this.ifTrue = -1
		this.ifFalse = -1
		this.inspected = 0

		input.split('\n').forEach(line => {
			line = line.trim()

			if(line.startsWith('Starting items:')) {
				const parts = line.split(':')

				this.items = parts[1].split(', ').map(l => BigInt(l.trim()))
			}
			else if(line.startsWith('Operation:')) {
				const parts = line.split('new =')
				let op = parts[1].trim()

				if(op.match(/\d$/)) op += 'n'

				this.operation = old => eval(op)
			}
			else if(line.startsWith('Test: divisible by ')) {
				const parts = line.split('Test: divisible by ')
				const check = BigInt(parts[1].trim())

				this.test = level => throwTo(level, level % check === 0 ? this.ifTrue : this.ifFalse)
			}
			else if(line.startsWith('If true:')) {
				const parts = line.split('If true: throw to monkey ')

				this.ifTrue = parseInt(parts[1].trim())
			}
			else if(line.startsWith('If false:')) {
				const parts = line.split('If false: throw to monkey ')

				this.ifFalse = parseInt(parts[1].trim())
			}
		})
	}
}

const monkeys = []

const throwTo = (item, idx) => {
	if(monkeys[idx]) {
		//console.log(`-- throw item ${item} to monkey ${idx}`)
		monkeys[idx].items.push(item)
	}
}


DATA.split(/^$/gm).forEach(chunk => {
	monkeys.push(new Monkey(chunk))
})

//console.log(monkeys)

const ROUNDS = 10000 // 20
const CHECK = [1, 20, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000]

for(let rounds = 1; rounds <= ROUNDS; ++rounds) {
	for(let i = 0, ilen = monkeys.length; i < ilen; ++i) {
		const monkey = monkeys[i]
//console.log(`Round: ${rounds}, Monkey: ${i}`)
		for(let j = 0, jlen = monkey.items.length; j < jlen; ++j) {
			monkey.inspected++

			const item = BigInt(monkey.items[j])

			let worry = BigInt(monkey.operation(item))
//console.log(`Item ${item} new worry ${worry}`)
	    //worry = parseInt(worry / 3)
	    monkey.test(worry)
		}

		monkey.items = []
	}

	if(CHECK.indexOf(rounds) !== -1) {
		console.log(monkeys.map(m => m.inspected))
	}
}

const result = monkeys.map(m => m.inspected).sort((a, b) => b - a)

// Part 2 TOO LOW: 14403120153
// Part 2 TOO LOW: 14400960016

console.log(result)
console.log('Final Score:', result[0] * result[1])
