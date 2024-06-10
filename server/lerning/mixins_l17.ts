// Lesson 17

function myLogFunction() {
    return (str: string): void => {
        console.log(str);
    };
}

const logger = myLogFunction();
logger('do your best');

function createLoggerClass() {
    return class Logger {
        private completedLog: string = '';
        public log(log: string): void {
            this.completedLog += `${log}\n`;
        }

        public dumpLog(): void {
            console.log(this.completedLog);
        }

        clearLog(): void {
            this.completedLog = '';
        }
    };
}

const LogClass = createLoggerClass();
const myLogClass = new LogClass();
myLogClass.log('Time to finish');
myLogClass.log('2. Second log');
myLogClass.dumpLog();
myLogClass.clearLog();

function CreateSimpleMemoryDatabase<T>() {
    return class SimpleMemoryDatabase {
        protected db: Record<string, T> = {};

        set(id: string, value: T): void {
            this.db[id] = value;
        }
        get(id: string): T {
            return this.db[id];
        }

        getData(): Record<string, T> {
            return this.db;
        }
        getObject(): object {
            return {};
        }
    };
}

class SimpleMemoryDatabase {
    protected db: Record<string, string> = {};

    set(id: string, value: string): void {
        this.db[id] = value;
    }
    get(id: string): string {
        return this.db[id];
    }

    getData(): Record<string, string> {
        return this.db;
    }
    getObject(): object {
        return {};
    }
}

const createStringMemoryDatabase = CreateSimpleMemoryDatabase<string>();
const StringMemoryDataBaseClass = new createStringMemoryDatabase();
StringMemoryDataBaseClass.set('1', 'Nearly finishing learning for today');
StringMemoryDataBaseClass.get('1');
const data = StringMemoryDataBaseClass.getData();
console.log('data: ', data);

// read more here about mixins examples with generics:
// https://www.typescriptlang.org/docs/handbook/mixins.html
type GConstructor<T = {}> = new (...args: any[]) => T;
type MemoryDataBase = GConstructor<SimpleMemoryDatabase>;
// when defining a generic type for base class, it must extend Constructor, which need to define its own generic type with fields or methods you want to use in extnded class
function extendStringMemoryDatabase<T extends MemoryDataBase>(Base: T) {
    return class ExtendedMemoryDatabase extends Base {
        remove(id: string) {
            delete this.db[id];
        }
    };
}

const ExtendClass = extendStringMemoryDatabase(SimpleMemoryDatabase);
const newExtenedClass = new ExtendClass();
newExtenedClass.set('10', 'test');
const extenedData = newExtenedClass.getData();
console.log('extenedData: ', extenedData);
newExtenedClass.remove('10');
const extenedData2 = newExtenedClass.getData();
console.log('extenedData: ', extenedData2);
