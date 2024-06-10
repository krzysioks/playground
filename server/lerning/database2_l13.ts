// Lesson 13
interface Database2<T, K> {
    get(id: K): T;
    set(id: K, value: T): void;
}

interface Persistable2 {
    saveToString(): string;
    restoreFromString(storedState: string): void;
}

type DbKeyType = string | number | symbol;

class InMemoryDatabase2<T, K extends DbKeyType> implements Database2<T, K> {
    protected db: Record<K, T> = {} as Record<K, T>;
    get(id: K): T {
        return this.db[id];
    }
    set(id: K, value: T): void {
        this.db[id] = value;
    }
    print(id: K): void {
        const printableId = id as string;
        console.log(
            `Id ${printableId} has value = ${this.get(
                id
            )} and type of id = ${typeof id}`
        );
    }
}

class PersistentMemoryDB2<T, K extends DbKeyType>
    extends InMemoryDatabase2<T, K>
    implements Persistable2
{
    saveToString(): string {
        return JSON.stringify(this.db);
    }
    restoreFromString(storedState: string): void {
        this.db = JSON.parse(storedState);
    }
}

const myNewDb3 = new PersistentMemoryDB2<number, number>();
myNewDb3.set(1, 23);
myNewDb3.print(1);
myNewDb3.set(1, 12);
const savedDb3: string = myNewDb3.saveToString();
console.log('savedDb: ', savedDb3);

const myNewDb4 = new PersistentMemoryDB2<number, string>();

myNewDb4.restoreFromString(savedDb3);
console.log('myNewDb4: ', myNewDb4.saveToString());
