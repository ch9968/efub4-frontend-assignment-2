"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Developer {
    name;
    age;
    position;
    constructor(name, age, position) {
        this.name = name;
        this.age = age;
        this.position = position;
    }
    sayHi() {
        console.log(`저는 ${this.age}살이고 이름은 ${this.name}입니다. 포지션은 ${this.position}입니다`);
    }
}
class FrontDeveloper extends Developer {
    react;
    constructor(name, age, position, react) {
        super(name, age, position);
        this.react = react;
    }
    func() {
        console.log(this.name);
        console.log(this.react);
    }
}
