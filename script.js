function Node(pos, path) {
	if (pos[0] < 0 || pos[0] > 7 || pos[1] < 0 || pos[1] > 7) {
		return null; //se tiver fora do array, retorna um null
	}
	return { pos, path };
}

function knightMoves([x, y], [a, b]) {
	// direções possiveis
	const directions = [
		[2, -1],
		[2, 1],
		[-2, -1],
		[-2, 1],
		[1, -2],
		[1, 2],
		[-1, -2],
		[-1, 2],
	];

	let queue = [Node([x, y], [[x, y]])];
	let visited = new Set();
	visited.add(`${x},${y}`); //loga os locais passados

	while (queue.length > 0) {
		let currentNode = queue.shift();

		if (currentNode.pos[0] === a && currentNode.pos[1] === b) {
			return {
				moves: currentNode.path.length - 1,
				path: currentNode.path,
			};
		}

		for (let [dx, dy] of directions) {
			let newPos = [currentNode.pos[0] + dx, currentNode.pos[1] + dy];
			if (!visited.has(`${newPos[0]},${newPos[1]}`)) {
				let node = Node(newPos, currentNode.path.concat([newPos]));
				if (node) {
					queue.push(node);
					visited.add(`${newPos[0]},${newPos[1]}`);
				}
			}
		}
	}
	return null; // Caso não encontre um caminho, retorna null
}

let result = knightMoves([1, 2], [3, 4]);
if (result) {
	console.log(`You did ${result.moves} moves! Here's the path you took:`);
	result.path.forEach((pos) => console.log(pos));
}
