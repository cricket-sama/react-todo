import React from 'react'
import styles from './InputWithLabel.module.css'
import PropTypes from 'prop-types'

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

InputWithLabel.propTypes = {
    todoTitle: PropTypes.string,
    children: PropTypes.object,
    handleTitleChange: PropTypes.func,
}

export default InputWithLabel;