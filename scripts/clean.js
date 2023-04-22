const fs = require('fs');

async function removeDirectory(directory) {
	if (fs.existsSync(directory)) {
		fs.rmdirSync(directory, { recursive: true, force: true });
	}
}

async function run() {
	try {
		await removeDirectory('./dist');
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
}

run();
