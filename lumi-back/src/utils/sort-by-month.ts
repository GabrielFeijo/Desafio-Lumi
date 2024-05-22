const monthsOrder = [
	'JAN',
	'FEV',
	'MAR',
	'ABR',
	'MAI',
	'JUN',
	'JUL',
	'AGO',
	'SET',
	'OUT',
	'NOV',
	'DEZ',
];

export const sortByMonth = (
	a: { referenceMonth: string },
	b: { referenceMonth: string }
) => {
	const [monthA, yearA] = a.referenceMonth.split('/');
	const [monthB, yearB] = b.referenceMonth.split('/');

	const yearDiff = parseInt(yearA) - parseInt(yearB);
	if (yearDiff !== 0) {
		return yearDiff;
	}

	return monthsOrder.indexOf(monthA) - monthsOrder.indexOf(monthB);
};
