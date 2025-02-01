import React from 'react'
import styles from './InputWithLabel.module.css'

function InputWithLabel({ todoTitle , children, handleTitleChange} ) {
    
    const inputRef = React.useRef();

    React.useEffect(() => {
        inputRef.current.focus();
    }, []);
    
    return (
        <>
            <label htmlFor="todoTitle">{children}</label>
                <input 
                    className={styles.inputField}
                    type="text"
                    id="todoTitle"
                    name="title"
                    value={todoTitle}
                    onChange={handleTitleChange}
                    ref={inputRef}
            />
        </>
    );
}

export default InputWithLabel;