import React from 'react';

function InputWithLabel({ todoTitle , children, handleTitleChange} ) {
    
    const inputRef = React.useRef();

    React.useEffect(() => {
        inputRef.current.focus();
    }, []);
    
    return (
        <>
            <label htmlFor="todoTitle">{children}</label>
                <input 
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