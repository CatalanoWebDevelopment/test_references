const fs = require('fs');

fs.readFile('review_list.txt', 'utf8', (err, data) => {
	if (err) {
		console.error(err);
		return;
	}

	var arrayOfBooks = data.toString().split('\n');

	findRecommendedBooks(arrayOfBooks, 2);
});

const findRecommendedBooks = (recommendations, recommendationCount) => {
	const bookMap = new Map();

	recommendations.forEach((rec) => {
		const title = rec.split('\t')[0];
		const author = rec.split('\t')[1];

		if (bookMap.get([`${title}:${author}`])) {
			bookMap.set(
				[`${title}:${author}`],
				bookMap.get([`${title}:${author}`]) + 1
			);
		} else {
			bookMap.set([`${title}:${author}`], 1);
		}
	});
};
