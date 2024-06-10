interface Coordinates {
    x: number;
    y: number;
}

const parseCoordsFromObj = (obj: Coordinates): Coordinates => {
    return { ...obj };
};

const parseCoordsFromNumbers = (x: number, y: number): Coordinates => {
    return { x, y };
};

function parseCoords(str: String): Coordinates;
function parseCoords(obj: Coordinates): Coordinates;
function parseCoords(x: number, y: number): Coordinates;
function parseCoords(arg1: unknown, arg2?: unknown): Coordinates {
    if (typeof arg1 === 'string') {
        const coords = {
            x: 0,
            y: 0
        };
        (arg1 as string).split(', ').forEach(elem => {
            const [key, value] = elem.split(':');
            coords[key as 'x' | 'y'] = parseInt(value, 10);
        });

        return coords;
    } else if (typeof arg1 === 'object') {
        return { ...(arg1 as Coordinates) };
    } else {
        return {
            x: arg1 as number,
            y: arg2 as number
        };
    }
}

console.log('byNumbers:', parseCoords(12, 9));
console.log('byObj:', parseCoords({ x: 10, y: 15 }));
console.log('byString:', parseCoords('x: 100, y: 150'));
