import { useState } from "react";

function AddTodoForm({ onAddTodo }) {

    const [todoTitle, setTodoTitle] = useState('');

    const handleTitleChange = (event) => {
        let newTodoTitle = event.target.value;
        setTodoTitle(newTodoTitle);
    };

    const handleAddTodo = (event) => {
        event.preventDefault();
        console.log(todoTitle);
        onAddTodo({
            title: todoTitle,
            id: Date.now(),
        });
        setTodoTitle('');
    };

    return (
        <form onSubmit={handleAddTodo}>
            <label htmlFor="todoTitle">Title</label>
            <input 
                type="text"
                id="todoTitle"
                name="title"
                value={todoTitle}
                onChange={handleTitleChange}
            />
            <button type="submit">Add</button>
        </form>
    );
}

export default AddTodoForm;