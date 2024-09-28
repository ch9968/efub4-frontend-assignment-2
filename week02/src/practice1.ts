class Developer {
  name: string;
  age: number;
  position: string;
  constructor(name: string, age: number, position: string) {
    this.name = name;
    this.age = age;
    this.position = position;
  }
  sayHi() {
    console.log(
      `저는 ${this.age}살이고 이름은 ${this.name}입니다. 포지션은 ${this.position}입니다`
    );
  }
}

class FrontDeveloper extends Developer {
  protected react: boolean;
  constructor(name: string, age: number, position: string, react: boolean) {
    super(name, age, position);
    this.react = react;
  }
  func() {
    console.log(this.name);
    console.log(this.react);
  }
}

const me = new FrontDeveloper("이찬희", 23, "student", true);
me.func();
