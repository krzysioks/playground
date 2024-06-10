// Lesson 16

abstract class StreetFighter {
    protected abstract name: string;
    constructor() {}

    move() {}
    fight(): void {
        console.log(`${this.name} fights with ${this.getSpecialAttack()}`);
    }

    abstract getSpecialAttack(): string;
}

class SpritFire extends StreetFighter {
    name = 'Sprit Fire';
    getSpecialAttack(): string {
        return 'Gun Blaze';
    }
}

const spritFire = new SpritFire();
console.log('spritFire: ', spritFire.getSpecialAttack());
spritFire.fight();
