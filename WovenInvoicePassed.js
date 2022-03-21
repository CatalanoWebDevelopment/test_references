function billFor(month, activeSubscription, users) {
	// If no users or activeSubscription, return 0
	if (!activeSubscription || users.length === 0) {
		return 0;
	}

	// Determine Daily Rate
	const dailyRate =
		activeSubscription.monthlyPriceInDollars / daysInMonth(month);

	// Sum to return
	let sum = 0;

	// Grab all deactivated users and calculate their total
	const deactivatedUsers = users.filter((user) => user.deactivatedOn !== null);

	let totalDaysFromDeactivated = 0;
	if (deactivatedUsers.length > 0) {
		for (let d = 0; d < deactivatedUsers.length; d++) {
			const user = deactivatedUsers[d];

			totalDaysFromDeactivated += toDays(
				user.deactivatedOn - firstDayOfMonth(new Date(month))
			);
		}
	}

	// Update Sum from deactivated
	sum += dailyRate * totalDaysFromDeactivated;

	const activeUsers = users.filter((user) => user.deactivatedOn === null);

	let totalDaysFromActive = 0;
	if (activeUsers.length > 0) {
		for (let a = 0; a < activeUsers.length; a++) {
			const user = activeUsers[a];

			if (firstDayOfMonth(new Date(month)) > user.activatedOn) {
				totalDaysFromActive += daysInMonth(month);
			} else {
				totalDaysFromActive +=
					daysInMonth(month) -
					toDays(user.activatedOn - firstDayOfMonth(new Date(month)));
			}
		}
	}

	// Update Sum from active
	sum += dailyRate * totalDaysFromActive;

	console.log(sum.toFixed(2));
	return parseFloat(sum.toFixed(2));
}

/*******************
 * Helper functions *
 *******************/
const toDays = (d) => {
	d = d | 0;
	return d / 24 / 60 / 60 / 1000;
};

// https://stackoverflow.com/questions/1184334/get-number-days-in-a-specified-month-using-javascript
const daysInMonth = (d) => {
	const year = d.split("-")[0];
	const month = d.split("-")[1];

	return new Date(parseInt(year), parseInt(month), 0).getDate();
};

/**
  Takes a Date instance and returns a Date which is the first day
  of that month. For example:

  firstDayOfMonth(new Date(2019, 2, 7)) // => new Date(2019, 2, 1)

  Input type: Date
  Output type: Date
**/
function firstDayOfMonth(date) {
	return new Date(date.getFullYear(), date.getMonth(), 1);
}

/**
  Takes a Date object and returns a Date which is the last day
  of that month. For example:

  lastDayOfMonth(new Date(2019, 2, 7)) // => new Date(2019, 2, 28)

  Input type: Date
  Output type: Date
**/
function lastDayOfMonth(date) {
	return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

/**
  Takes a Date object and returns a Date which is the next day.
  For example:

  nextDay(new Date(2019, 2, 7))  // => new Date(2019, 2, 8)
  nextDay(new Date(2019, 2, 28)) // => new Date(2019, 3, 1)

  Input type: Date
  Output type: Date
**/
function nextDay(date) {
	return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
}
