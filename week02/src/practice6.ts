interface Todo {
  title: string;
  description: string;
  completed: Boolean;
}

type TodoPreview = Pick<Todo, "title" | "completed">;
const todo: TodoPreview = {
  title: "study english",
  completed: false,
};
console.log(todo);
