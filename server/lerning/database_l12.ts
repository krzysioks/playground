// Lesson 12
interface Database {
    get(id: string): string;
    set(id: string, value: string): void;
}

interface Persistable {
    saveToString(): string;
    restoreFromString(storedState: string): void;
}

class InMemoryDatabase implements Database {
    protected db: Record<string, string> = {};
    get(id: string): string {
        return this.db[id];
    }
    set(id: string, value: string): void {
        this.db[id] = value;
    }
    print(id: string): void {
        console.log(`key ${id} has value = ${this.get(id)}`);
    }
}

class PersistentMemoryDB extends InMemoryDatabase implements Persistable {
    saveToString(): string {
        return JSON.stringify(this.db);
    }
    restoreFromString(storedState: string): void {
        this.db = JSON.parse(storedState);
    }
}

const myNewDb = new PersistentMemoryDB();
myNewDb.set('1', 'tonight');
myNewDb.print('1');
myNewDb.set('1', 'yestarday');
const savedDb: string = myNewDb.saveToString();
console.log('savedDb: ', savedDb);

const myNewDb2 = new PersistentMemoryDB();

myNewDb2.restoreFromString(savedDb);
console.log('myNewDb2: ', myNewDb2.saveToString());
