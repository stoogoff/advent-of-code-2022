#!/usr/local/bin/node

const { read, sum } = require('../utils')

/*const DATA = `$ cd /
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
7214296 k`*/

const DATA = read('07-nospace/data')

class Tree {
	constructor(name) {
		this.name = name
		this.parent = null
		this.nodes = []
		this.files = []
	}

	addNode(node) {
		node.parent = this
		this.nodes.push(node)
	}

	addFile(file) {
		this.files.push(file)
	}

	// convert tree to list
	list() {
		return [this, ...this.nodes.flatMap(node => node.list())]
	}

	size() {
		return this.files.reduce(sum, 0) + this.nodes.flatMap(node => node.size()).reduce(sum, 0)
	}
}


let currentTree = null
let rootTree = null


DATA.split('\n').forEach(line => {
	// change directory
	if(line.startsWith('$ cd')) {
		const dir = line.replace('$ cd ', '')

		switch(dir) {
			case '/': // return to route
				if(rootTree === null) rootTree = new Tree(dir)

				currentTree = rootTree
				break

			case '..': // up dir
				if(currentTree) currentTree = currentTree.parent
				break

			default: // change to a lower dir
				const tree = new Tree(dir)

				if(currentTree) currentTree.addNode(tree)

				currentTree = tree
				break
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

		currentTree.addFile(parseInt(size))
	}
})

const USED = 70000000 - rootTree.size()
const NEEDED = 30000000 - USED
const list = rootTree.list()

console.log(USED)
console.log(list.map(node => node.size()).filter(size => size >= NEEDED).sort((a, b) => a - b))

// TOO LOW: 1193346
// TOO LOW: 1412245
