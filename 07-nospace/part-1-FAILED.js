#!/usr/local/bin/node

const { read } = require('../utils')

const DATA = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`

//const DATA = read('07-nospace/data')

const structure = {}
let currentDir = ''



DATA.split('\n').forEach(line => {
	// change directory
	if(line.startsWith('$ cd')) {
		const dir = line.replace('$ cd ', '')

		switch(dir) {
			case '/': // return to route
				currentDir = dir
				break

			case '..': // up dir
				currentDir = currentDir.substring(0, currentDir.lastIndexOf('/'))

				if(currentDir === '') currentDir = '/'
				break

			default: // change to a lower dir
				currentDir += currentDir === '/' ? dir : `/${dir}`
				break
		}

		if(!(currentDir in structure)) {
			structure[currentDir] = 0
		}
	}
	else if(line.startsWith('$ ls')) {
		// list so skip
	}
	else if(line.startsWith('dir ')) {
		// directory
	}
	else {
		// file, add its numbers
		const [size, name] = line.split(' ')

		// add size to current dir
		structure[currentDir] += parseInt(size)
	}
})

// sort keys (dirs) by number of / (directory depth)
/*const pathMatch = /\//g

Object.keys(structure).sort((a, b) => {
	const aLen = a.match(pathMatch).length
	const bLen = b.match(pathMatch).length

	if(aLen === bLen) {
		if(a === '/') return -1
		if(b === '/') return -1

		return a === b ? 0 : (a < b ? -1 : 1)
	}

	return bLen - aLen
	
}).forEach(key => {
	let currentKey = key

	while(currentKey.indexOf('/') !== -1) {
		currentKey = currentKey.substring(0, currentKey.lastIndexOf('/'))

		if(currentKey !== '' && currentKey in structure) {
			structure[currentKey] += structure[key]
		}
	}
})*/

const MAX = 100000

console.log(Object.keys(structure).filter(key => structure[key] <= MAX).map(key => structure[key]).reduce((a, c) => a + c, 0))

// TOO LOW: 1193346
// TOO LOW: 1412245
console.log(structure)
