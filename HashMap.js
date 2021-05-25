// GLOBAL CONTROLS
const MAX_INTEGER = 5;
const MAX_ARRAY_LENGTH = 10; // Must be greater than, or equal to, the MAX_INTEGER

// PRIMARY FUNCTIONS
const insertMap = (map, key, value) => {
    map.set(key, value);
    return map;
};

const getRandomInteger = max => {
    return Math.floor(Math.random() * Math.floor((max + 1)));
};

const seedArray = (arr, maxInteger, desiredLength) => {
    for (let index = 0; index < desiredLength; index++) {
        arr.push(getRandomInteger(maxInteger));
    };
};

// SEEDING
const array1 = new Array();
seedArray(array1, MAX_INTEGER, MAX_ARRAY_LENGTH);

const array2 = new Array();
seedArray(array2, MAX_INTEGER, MAX_ARRAY_LENGTH);

// IMPLEMENT SEED INTO HASH
const duplicates = new Map();
for (let i = 0; i < MAX_ARRAY_LENGTH; i++) {
    insertMap(duplicates, i, []);
};

// PERFORM LOGIC
// Gather Duplicates
for (idx = 0; idx < MAX_ARRAY_LENGTH; idx++) {
    if (array1[idx] && array2[idx]) {
        duplicates.set(array1[idx], [...duplicates.get(array1[idx]), array1[idx]]);
        duplicates.set(array2[idx], [...duplicates.get(array2[idx]), array2[idx]]);
    };
};

// Generate Console Statement
let string_statement = `Max array length is set to: ${MAX_ARRAY_LENGTH}.\r\nMax integer value is set to ${MAX_INTEGER}.\r\n`;
let duplicates_array = new Array();
for (idx = 0; idx < MAX_ARRAY_LENGTH; idx++) {
    string_statement += `${idx} is repeated ${duplicates.get(idx) ? duplicates.get(idx).length : 0} time(s).\r\n`

    if (duplicates.get(idx) && duplicates.get(idx).length > 0) {
        duplicates_array.push(idx);
    };
};

string_statement += `The duplicates are as follows: ${duplicates_array.sort((a, b) => { return a - b })}\r\n`;

// RESULTS
console.info(string_statement);