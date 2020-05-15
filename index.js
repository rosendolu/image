const fs = require('fs');
// const gm = require('gm').subClass({ imageMagick: true });
const gm = require('gm');
const path = require('path');
const chalk = require('chalk');
const { log } = console;

const DIR = './';
const ignoredDir = ['node_modules', '.git', '.vscode'];

const compressor = (dir) => {
	const rootDir = path.resolve(__dirname, dir);
	fs.readdir(rootDir, (err, files) => {
		if (err) {
			log(err);
			return;
		}
		// log(files);
		files.forEach((item) => {
			const itemDir = path.join(rootDir, item);

			fs.stat(itemDir, (err, stat) => {
				if (err) return;
				// log('itemDir', itemDir);
				if (stat.isDirectory()) {
					if (!ignoredDir.includes(item)) {
						// log('dir', item);
						compressor(itemDir);
					}
				} else {
					if (stat.isFile() && /\.(png|svg|jpg|jpeg|gif)$/.test(item)) {
						// log(item);
						let pathObj = path.parse(itemDir);
						// 压缩处理
						// .compress()
						gm(itemDir)
							.autoOrient()
							.quality(70)
							.strip()
							.write(pathObj.dir + '/gm_' + pathObj.base, (err) => {
								if (err) {
									log(chalk.red(err));
								}
								log(chalk.bgCyan(itemDir));
							});
						// gm(itemDir)
						// 	.compress()
						// 	.write(pathObj.dir + '/gm_' + pathObj.base, (err) => {
						// 		if (err) {
						// 			log(err);
						// 			return;
						// 		}
						// 		log(itemDir);
						// 	});
					}
				}
			});
		});
	});
};

compressor(DIR);
