import { useState } from 'react';
import InputWithLabel from './InputWithLabel.jsx';

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
        <form onSubmit={handleAddTodo}>
            <button type="submit">Add</button>
            <InputWithLabel
                todoTitle={todoTitle}
                handleTitleChange={handleTitleChange}
            >
                Title
            </InputWithLabel>
        </form>
    );
}

export default AddTodoForm;