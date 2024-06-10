// Lesson 8
// keyType is one of the keys of DataType
function pluck<DataType, KeyType extends keyof DataType>(
    items: DataType[],
    key: KeyType
): DataType[KeyType][] {
    return items.map(item => item[key]);
}

interface dog {
    name: string;
    age: number;
    breed: string;
}

const dogs: dog[] = [
    { name: 'Jilly', age: 8, breed: 'dalmatin' },
    { name: 'Bob', age: 12, breed: 'hamstaf' }
];

console.log(pluck(dogs, 'age'));

interface BaseEvent {
    time: number;
    user: string;
}

interface EventMapper {
    addToCart: BaseEvent & { quantity: number; sku: string };
    logIn: BaseEvent;
}

function sendEvent<Name extends keyof EventMapper>(
    keyName: Name,
    eventPayload: EventMapper[Name]
): void {
    console.log(keyName, eventPayload);
}

sendEvent('addToCart', {
    time: 12,
    user: 'John',
    quantity: 14,
    sku: '3452212'
});

sendEvent('logIn', {
    time: 19,
    user: 'John 2'
});
