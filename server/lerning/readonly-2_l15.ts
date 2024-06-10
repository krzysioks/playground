// Lesson 15

class Doggy {
    public readonly name: string = '';
    public readonly age: number = 0;
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
}

const newDoggy = new Doggy('Milka', 9);
console.log('newDoggy: ', newDoggy);

class DogList {
    private doggies: Doggy[] = [];

    private constructor() {}

    // example of making a singleton: this class can be created only once
    static instance: DogList = new DogList();

    public static addDog(dog: Doggy): void {
        DogList.instance.doggies.push(dog);
    }

    public getDog(): Doggy[] {
        return this.doggies;
    }
}

DogList.instance;
// static methods cannot be accessed directly on instance of class but directly on the class intseflf
DogList.addDog(newDoggy);
// getDog is not static so we can call it on instance of the class
console.log('DogList.instance: ', DogList.instance.getDog());
