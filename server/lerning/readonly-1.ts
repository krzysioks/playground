// Lesson 10
interface Cat {
    readonly name: string;
    breed: string;
}

type ReadonlyCat = Readonly<Cat>;

const makeCat = (name: string, breed: string): ReadonlyCat => {
    return {
        name,
        breed
    };
};

const usul = makeCat('usul', 'Persian');
// const usul.name = 'Piter';
console.log('usul: ', usul);

const setCoordinates = (
    x: number,
    y: number,
    z: number
): readonly [number, number, number] => {
    return [x, y, z];
};

const coordinates = setCoordinates(10, 20, 30);
console.log('coordinates: ', coordinates);

const rConst = [1, 2, 3] as const;

// rConst[0] = 2;
console.log('rConst: ', rConst);
