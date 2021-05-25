function billFor(month, activeSubscription, users) {
	// 	If there are no users or the subscription is not present, the function should return 0 since the customer does not owe anything for that month.
	if (users.length < 1 || !activeSubscription) return 0;
	
	// Gather necessary information that will be used multiple times into variables
	const date = new Date(month);
	const totalDays = daysInMonth(date.getMonth(), date.getYear());
	const dailyRate = activeSubscription.monthlyPriceInDollars / totalDays;
	let runningTotal = 0;
	
	// Since we have an array of users, we can now iterate through them and determine how they should be charged
	for (user of users) {
		let daysFromInvoiceStart = daysBetween(date, new Date(user.activatedOn));
		
		if (user.deactivatedOn === null) {
			if (daysFromInvoiceStart > 0) {
				runningTotal += ((totalDays - daysFromInvoiceStart) * dailyRate); 
			} else {
				runningTotal += (totalDays * dailyRate);
			};
		} else {
			let daysFromInvoiceEnd = daysBetween(date, new Date(user.deactivatedOn));
				
			if (daysFromInvoiceStart > 0) {
				runningTotal += (((totalDays - daysFromInvoiceStart) - daysFromInvoiceEnd) * dailyRate);
			} else {
				runningTotal += ((totalDays - daysFromInvoiceEnd) * dailyRate);
			};
		};
	};
	
	// Return our new billing total
	return runningTotal;
};

// Helpers 
const toDays = d => {
    d = d || 0;
    return d / 24 / 60 / 60 / 1000;
};

const toUTC = d => {
    if (!d || !d.getFullYear()) return 0;
    return Date.UTC(d.getFullYear(), d.getMonth(),d.getDate());
};
	
const daysInMonth = (month, year) => {
    var year = year || new Date(Date.now()).getFullyear();
    return toDays(Date.UTC(year, month + 1, 1) - Date.UTC(year, month, 1));
};

const daysBetween = (day1, day2) => {
    return toDays(toUTC(day2) - toUTC(day1));
};