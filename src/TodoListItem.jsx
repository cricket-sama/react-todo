function TodoListItem({ todo , onRemoveTodo }) {

    return (
        <li>
            <button 
                type="button" 
                onClick={() => onRemoveTodo(todo.id)}
            >
                Remove
            </button>
            {todo.title}
        </li>
    );
}

export default TodoListItem;