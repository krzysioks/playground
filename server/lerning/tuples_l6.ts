// Lesson 6
const useStringState = (
    initial: string
): [() => string, (v: string) => void] => {
    let state = initial;
    return [
        () => state,
        (v: string) => {
            state = v;
        }
    ];
};

const [getter1, setter1] = useStringState('myInitialState');
console.log('getter1: ', getter1());
setter1('updated');
console.log('getter2: ', getter1());
