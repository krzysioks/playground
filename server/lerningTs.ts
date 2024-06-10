let userName: string = 'krysiek';
let isLoggedIn: boolean = true;

userName += ' added value';
console.log('isLoggedIn: ', isLoggedIn);

interface Person {
    name: string;
    lastName: string;
    age: number;
}

const myFirstArray: string[] = userName.split(' ');
console.log('myFirstArray: ', myFirstArray);
const secondArray: Array<number> = [1, 2, 3];

const john: Person = {
    name: 'John',
    lastName: 'Dow',
    age: 44
};

const johnsBooks: Record<number, string> = {
    1: 'Book 1',
    2: 'Book 2',
    5: 'Book 5'
};
console.log('johnsBooks: ', johnsBooks);

function addNumbers(a: number, b: number): number {
    return a + b;
}

export const addNumbersAsString = (a: string, b: string | number): string => {
    return `Outcome: ${a} ${b}`;
};

export const printStr = (a: string, b: string | number): void => {
    console.log(addNumbersAsString(a, b));
};

export const fetchData = (a: string, b: string | number): Promise<string> => {
    return Promise.resolve(`Outcome: ${a} ${b}`);
};

export default addNumbers;
