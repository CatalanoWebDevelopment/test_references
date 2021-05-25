// @CREDIT: https://dev.to/damxipo/handle-money-with-js-4a13

// Conversion function.
const toCents = val => val*100;
const toNum = val => Math.round(val)/100;

// Integer conversion.
const toInt = a => {
    const x = Number(a);
    return x < 0 ? Math.ceil(x) : Math.floor(x);
};

// Detector functions.
const isSafe  = n => (typeof n === 'number' && Math.round(n) === n && Number.MIN_SAFE_INTEGER <= n &&  n <= Number.MAX_SAFE_INTEGER);
const isEqual = (a,b) => Math.abs(a.number - b.number) < Number.EPSILON;
const isNaN = value => typeof value === 'number' && isNaN(value);

// Comparer functions.
const isLte = (a,b) => a.value <= b.value;
const isGte = (a,b) => a.value >= b.value;
const isLt  = (a,b) => a.value < b.value;
const isGt  = (a,b) => a.value > b.value;

// Money constructor.
const money = (number,value) =>{
	const moneyResult = number ? {number,value:toCents(number)} : {number:toNum(value),value};
	if (!isSafe(moneyResult.value)) throw new Error('Number exceeds integer SAFE range');

	return moneyResult;
};

// Arithmetic operators.
const add = (a,b) => money(null,a.value+b.value);
const sub = (a,b) => money(null,a.value-b.value);
const mul = (a,b) => money(null,a.value*b.value);
const div = (a,b) => money(null,a.value/b.value);

// Run it all
const payment = money(100.20);
const loan    = money(15000);
const bill    = money(6000);
const debth   = money(2000.60);

const addRes = add(payment,bill);
console.log(`${payment.number} + ${bill.number} = ${addRes.number}`);

const subRes = sub(loan,debth);
console.log(`${loan.number} - ${debth.number} = ${subRes.number}`);

console.log(`${payment.number} + ${debth.number} = `, isEqual(payment,bill));
console.log(`${payment.number} + ${payment.number} = `, isEqual(payment,payment));