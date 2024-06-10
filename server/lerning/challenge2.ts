function myForEach<T>(items: T[]): void {
    items.reduce((acc, item) => {
        console.log('item: ', item);
        return undefined;
    }, undefined);
}
myForEach([1, 2, 3]);

function myFilter<T>(items: T[], filterFunc: (v: T) => boolean): T[] {
    return items.reduce((acc: T[], item) => {
        return filterFunc(item) ? [...acc, item] : acc;
    }, []);
}

function myMap<T, K>(items: T[], mapperFunc: (v: T) => K): K[] {
    return items.reduce((acc: K[], item) => {
        return [...acc, mapperFunc(item)];
    }, []);
}

interface f1Car {
    name: string;
    power: number;
}

const f1Cars2: f1Car[] = [
    {
        name: 'rb24',
        power: 980
    },
    {
        name: 'mcl224',
        power: 945
    },
    {
        name: 's24',
        power: 780
    }
];

interface f1Team extends f1Car {
    teamName: string;
}

const mapToF1Team = (v: f1Car): f1Team => {
    if (v?.name === 'rb24') {
        return {
            ...v,
            teamName: 'Red Bull'
        };
    } else if (v?.name === 'mcl224') {
        return {
            ...v,
            teamName: 'McLaren'
        };
    } else if (v?.name === 's24') {
        return {
            ...v,
            teamName: 'Stake F1'
        };
    } else {
        return {
            ...v,
            teamName: 'Unknown'
        };
    }
};

const filterF1cars = (v: f1Car): boolean => {
    return v?.power > 900 ?? false;
};

const mappedArray: f1Team[] = myMap(f1Cars2, mapToF1Team);
console.log('mappedArray: ', mappedArray);

const fastF1Car: f1Car[] = myFilter(f1Cars2, filterF1cars);
console.log('fastF1Car: ', fastF1Car);
// console.log(myFilter([1, 2], v => v % 2 === 0));
