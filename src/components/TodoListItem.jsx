import styles from './TodoListItem.module.css'
import PropTypes from 'prop-types'

function TodoListItem({ todo , onRemoveTodo }) {

    return (
        <li className={styles.ListItem}>
            <button 
                className={styles.removeButton}
                type='button' 
                onClick={() => onRemoveTodo(todo.id)}
            >
                Remove
            </button>
            <span className={styles.todoTitle}>{todo.title}</span>
        </li>
    );
}

TodoListItem.propTypes = {
    todo: PropTypes.object,
    onRemoveTodo: PropTypes.func,
}

export default TodoListItem;