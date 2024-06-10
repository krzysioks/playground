// Lesson 14
type flexibleDogInfo = {
    name: string;
} & Record<string, string>;

const dog1: flexibleDogInfo = {
    name: 'Tody',
    age: '10'
};

type flexibleDogInfo2 = {
    name: string;
    [key: string]: string | number;
};

interface DogInfo {
    name: string;
    age: number;
}

type OptionsFlags<Type> = {
    [Property in keyof Type]: boolean;
};

type DogInfoOptions = OptionsFlags<DogInfo>;

// newValue will take type of the given Type property
type Listeners<Type> = {
    [Property in keyof Type as `on${Capitalize<string & Property>}Change`]?: (
        newValue: Type[Property]
    ) => void;
} & {
    [Property in keyof Type as `on${Capitalize<string & Property>}Delete`]?: (
        newValue: Type[Property]
    ) => void;
};
type DogInfoListeners = Listeners<DogInfo>;
function listenToObject<T>(obj: T, listenrs: DogInfoListeners): void {
    console.log('Test');
}

const milka: DogInfo = {
    name: 'Milka',
    age: 13
};

listenToObject(milka, {
    onNameChange: (v: string) => {},
    onAgeChange: (v: number) => {},
    onAgeDelete: (v: number) => {},
    onNameDelete: (v: string) => {}
});
