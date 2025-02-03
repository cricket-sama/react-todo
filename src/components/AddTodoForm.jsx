import { useState } from 'react'
import InputWithLabel from './InputWithLabel.jsx'
import styles from './AddTodoForm.module.css'
import PropTypes from 'prop-types'

function AddTodoForm({ onAddTodo }) {

    const [todoTitle, setTodoTitle] = useState('');

    const handleTitleChange = (event) => {
        let newTodoTitle = event.target.value;
        setTodoTitle(newTodoTitle);
    };

    const handleAddTodo = (event) => {
        event.preventDefault();
        onAddTodo(todoTitle);
        setTodoTitle('');
    };

    return (
        <form onSubmit={handleAddTodo} className={styles.formContainer}>
            <button type="submit" className={styles.addButton}>Add</button>
            <InputWithLabel
                todoTitle={todoTitle}
                handleTitleChange={handleTitleChange}
            >
                <span className={styles.title}>Title:</span>
            </InputWithLabel>
        </form>
    );
}

AddTodoForm.propTypes = {
    onAddTodo: PropTypes.func,
}

export default AddTodoForm;