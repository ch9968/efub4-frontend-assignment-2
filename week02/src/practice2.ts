class Developer {
  constructor(
    public name: string,
    protected age: number,
    private position: string
  ) {}
  sayHi() {
    console.log(`저는 ${this.name}이고 ${this.age}살입니다.`);
  }
}
const me = new Developer("이찬희", 23, "학생");
me.sayHi();
