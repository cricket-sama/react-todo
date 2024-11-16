import TodoListItem from "./TodoListItem";

let todoList = [
  {
    id: 1,
    title: "Clean up fish tanks"
  },
  {
    id: 2,
    title: "Feed fish and snails"
  },
  {
    id: 3,
    title: "Take medication"
  }
];

function TodoList() {

    return (
       <ul>
          {todoList.map((item) => (
            <TodoListItem key={item.id} todo={item} />
          ))}
        </ul> 
    )

}

export default TodoList;