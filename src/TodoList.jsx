import TodoListItem from './TodoListItem'
import styles from './TodoList.module.css'

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

export default TodoList;