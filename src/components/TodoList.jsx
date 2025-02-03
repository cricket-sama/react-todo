import TodoListItem from './TodoListItem'
import styles from './TodoList.module.css'
import PropTypes from 'prop-types'

function TodoList({ todoList , onRemoveTodo }) {

    return (
       <ul className={styles.List}>
          {todoList.map((item) => (
            <TodoListItem 
              key={item.id}
              todo={item}
              onRemoveTodo={onRemoveTodo}
              />
          ))}
        </ul> 
    );

}

TodoList.propTypes = {
  todoList: PropTypes.array,
  onRemoveTodo: PropTypes.func,
}

export default TodoList;