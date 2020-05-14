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

/*

// some files would not be resized appropriately
// http://stackoverflow.com/questions/5870466/imagemagick-incorrect-dimensions
// you have two options:
// use the '!' flag to ignore aspect ratio
gm('/path/to/my/img.jpg')
	.resize(240, 240, '!')
	.write('/path/to/resize.png', function (err) {
		if (!err) console.log('done');
	});

// use the .resizeExact with only width and/or height arguments
gm('/path/to/my/img.jpg')
	.resizeExact(240, 240)
	.write('/path/to/resize.png', function (err) {
		if (!err) console.log('done');
	});

// obtain the size of an image
gm('/path/to/my/img.jpg').size(function (err, size) {
	if (!err) console.log(size.width > size.height ? 'wider' : 'taller than you');
});

// output all available image properties
gm('/path/to/img.png').identify(function (err, data) {
	if (!err) console.log(data);
});

// pull out the first frame of an animated gif and save as png
gm('/path/to/animated.gif[0]').write('/path/to/firstframe.png', function (err) {
	if (err) console.log('aaw, shucks');
});

// auto-orient an image
gm('/path/to/img.jpg')
	.autoOrient()
	.write('/path/to/oriented.jpg', function (err) {
		if (err) {
			//
		}
	});

// crazytown
gm('/path/to/my/img.jpg')
	.flip()
	.magnify()
	.rotate('green', 45)
	.blur(7, 3)
	.crop(300, 300, 150, 130)
	.edge(3)
	.write('/path/to/crazy.jpg', function (err) {
		if (!err) console.log('crazytown has arrived');
	});

// annotate an image
gm('/path/to/my/img.jpg')
	.stroke('#ffffff')
	.drawCircle(10, 10, 20, 10)
	.font('Helvetica.ttf', 12)
	.drawText(30, 20, 'GMagick!')
	.write('/path/to/drawing.png', function (err) {
		if (!err) console.log('done');
	});

// creating an image
gm(200, 400, '#ddff99f3')
	.drawText(10, 50, 'from scratch')
	.write('/path/to/brandNewImg.jpg', function (err) {
		// ...
	});

  */
