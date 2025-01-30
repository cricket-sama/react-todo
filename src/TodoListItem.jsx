import styles from './TodoListItem.module.css'

function TodoListItem({ todo , onRemoveTodo }) {

    return (
        <li className={styles.ListItem}>
            <button 
                className={styles.removeButton}
                type="button" 
                onClick={() => onRemoveTodo(todo.id)}
            >
                Remove
            </button>
            <span className={styles.todoTitle}>{todo.title}</span>
        </li>
    );
}

export default TodoListItem;