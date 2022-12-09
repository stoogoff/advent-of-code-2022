#!/usr/local/bin/node

const { read } = require('../utils')

/*const DATA = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2
L 2
D 2`*/

/*const DATA = `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`*/

const DATA = read('09-ropebridge/data')

class Point {
	constructor(x, y) {
		this.x = x
		this.y = y
	}

	inRange(x, y) {
		return Math.abs(this.x - x) <= 1 && Math.abs(this.y - y) <= 1
	}
}

class Head extends Point {
	constructor(x, y) {
		super(x, y)
	}

	moveRight(amount, tail) {
		for(let x = 1; x <= amount; ++x) {
			tail.follow(this.x + x, this.y)
		}

		this.x += amount
	}
	moveLeft(amount, tail) {
		for(let x = 1; x <= amount; ++x) {
			tail.follow(this.x - x, this.y)
		}

		this.x -= amount
	}

	moveUp(amount, tail) {
		for(let y = 1; y <= amount; ++y) {
			tail.follow(this.x, this.y + y)
		}

		this.y += amount
	}
	moveDown(amount, tail) {
		for(let y = 1; y <= amount; ++y) {
			tail.follow(this.x, this.y - y)
		}

		this.y -= amount
	}
}

class Tail extends Point {
	constructor(x, y) {
		super(x, y)
		this.visited = {
			'0:0': true,
		}
	}

	follow(x, y) {
		if(!this.inRange(x, y)) {
			// not in range move 1 step closer to target

			if(x > this.x) {
				this.x += 1
			}

			if(x < this.x) {
				this.x -= 1
			}

			if(y > this.y) {
				this.y += 1
			}

			if(y < this.y) {
				this.y -= 1
			}

			this.visited[`${this.x}:${this.y}`] = true
		}
	}
}

class Tails {
	constructor(len, x, y) {
		this.tails = []

		for(let i = 0; i < len; ++i) {
			this.tails.push(new Tail(x, y))
		}
	}

	follow(x, y) {
		for(let i = 0, ilen = this.tails.length; i < ilen; ++i) {
			this.tails[i].follow(x, y)

			x = this.tails[i].x
			y = this.tails[i].y
		}
	}
}

const print = (h, t) => {
	for(let y = 4; y >= 0; --y) {
		let buffer = []

		for(let x = 0; x <= 5; ++x) {
			if(h.x === x && h.y === y) {
				buffer.push('H')
			}
			else if(t.x === x && t.y === y) {
				buffer.push('T')
			}
			else if(x === 0 && y === 0) {
				buffer.push('s')
			}
			else {
				buffer.push('.')
			}
		}
		console.log(buffer.join(''))
	}

	console.log('')
}

const plot = v => {
	for(let y = 4; y >= 0; --y) {
		let buffer = []

		for(let x = 0; x <= 5; ++x) {
			const key = `${x}:${y}`

			if(v[key]) {
				buffer.push('#')
			}
			else if(x === 0 && y === 0) {
				buffer.push('s')
			}
			else {
				buffer.push('.')
			}
		}
		console.log(buffer.join(''))
	}

	console.log('')
}

const head = new Head(0, 0)
const tail = new Tails(9, 0, 0)

DATA.split('\n').forEach(line => {
	const parts = line.split(' ')
	const direction = parts[0]
	const amount = parseInt(parts[1])

	switch(direction) {
		case 'U':
			head.moveUp(amount, tail)
			break

		case 'D':
			head.moveDown(amount, tail)
			break

		case 'L':
			head.moveLeft(amount, tail)
			break

		case 'R':
			head.moveRight(amount, tail)
			break
	}
})

console.log(Object.keys(tail.tails[tail.tails.length - 1].visited).length)
