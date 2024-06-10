// Lesson 3
export const printToFile = (text: string, callback: () => void): void => {
    console.log('text: ', text);
    callback();
};

export type numberFunc = (v: number) => number;

export const arrayMutate = (
    numbers: number[],
    mutate: (v: number) => number
): number[] => {
    return numbers.map(mutate);
};

export const newMutationFunc: numberFunc = v => {
    return v * 2;
};

console.log(
    'arrayMutate: ',
    arrayMutate([1, 2, 5, 6], v => v * 5)
);

export const createAdder = (num: number): numberFunc => {
    return (val: number) => num + val;
};

const addOne = createAdder(1);
console.log('addOne: ', addOne(55));
