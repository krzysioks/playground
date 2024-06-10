interface House {
    name: string;
    planet: string | string[];
}

interface HouseWithID extends House {
    id: number;
}

type filterFunction = (house: House) => boolean;

const houses: House[] = require('./houses.json');

// function findHouses(houses: string): HouseWithID[];
// function findHouses(
//     houses: string,
//     filter: (house: House) => boolean
// ): HouseWithID[];
// function findHouses(houses: House[]): HouseWithID[];
// function findHouses(
//     houses: House[],
//     filter: (house: House) => boolean
// ): HouseWithID[];

const findHouses = (
    houses: string | House[],
    filterFunc?: filterFunction
): HouseWithID[] => {
    const mappedHouses: House[] =
        typeof houses === 'string' ? JSON.parse(houses) : houses;

    return mappedHouses
        .filter(filterFunc ? filterFunc : (house: House) => house)
        .map((item: House, id: number) => {
            return { ...item, id };
        });

    // let id = 0;
    // const filteredHouses = mappedHouses.filter((house, idx) => {
    //     if (filter(house)) {
    //         id = idx;
    //         return true;
    //     } else {
    //         return false;
    //     }
    // });
    // return [{ id, ...filteredHouses[0] }];
};

// const findHouses2 = (
//     houses: House[],
//     filter: filterFunction
// ): HouseWithID[] => {
//     let id = 0;
//     const filteredHouses = houses.filter((house, idx) => {
//         if (filter(house)) {
//             id = idx;
//             return true;
//         } else {
//             return false;
//         }
//     });
//     return [{ id, ...filteredHouses[0] }];
// };

console.log(
    findHouses(JSON.stringify(houses), ({ name }) => name === 'Atreides')
);

console.log(findHouses(houses, ({ name }) => name === 'Harkonnen'));
console.log(findHouses(houses));
