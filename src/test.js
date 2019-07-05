import React, { Component } from 'react';
import ReactDOM from 'react-dom';
class Test extends Component {
    constructor() {
        super();
        this.onClick = this.onClick.bind(this);
        this.state = {
            counter: 0
        };
    }
    //using arrow function as a way of binding this, used with babel npm install "@babel/plugin-proposal-class-properties" and proper setting in .babelrc
    onClick = () => {
        const arr = [1, 2, 3, 4, 5, 6];
        if (arr.includes(3)) {
            console.info('3 is in');
        }

        this.setState(state => ({
            counter: state.counter + 1
        }));
    };
    render() {
        return (
            <div>
                <div>Counter: {this.state.counter}</div>
                <button onClick={this.onClick}>Count</button>
            </div>
        );
    }
}
export default Test;
