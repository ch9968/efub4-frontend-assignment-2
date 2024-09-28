interface Todo {
  title: string;
  description: string;
  completed: boolean;
  createdAt: number;
}

type TodoPreview = Omit<Todo, "description">;
const todo: TodoPreview = {
  title: "Study English",
  completed: false,
  createdAt: 20240915,
};

type TodoInfo = Omit<Todo, "completed" | "createdAt">;

const TodoInfo: TodoInfo = {
  title: "Study Math",
  description: "Exam tmr",
};
