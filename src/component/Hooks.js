import React, { useState, useEffect } from 'react';
const Hooks = () => {
    // useEffect hook is called after every render. To simulate componentDidMount lifecycle method pass empty array as a second argument. useEffect() will be called after render only if any parameter from the list have changed.
    useEffect(() => {
        fetch('./test')
            .then(res => res.json())
            .then(response => {
                console.log('response', response);
            });
    }, []);

    const [counter, setCounter] = useState(0);
    const _onClickHandler = () => {
        const newValue = counter + 1;
        setCounter(newValue);
    };

    return (
        <div>
            <div>Counter: {counter}</div>
            <button onClick={_onClickHandler}>Count</button>
        </div>
    );
};
export default Hooks;
