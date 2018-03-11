import React from 'react';
import ReactDOM from 'react-dom';
import Life from './Life';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Life />, div);
    ReactDOM.unmountComponentAtNode(div);
});
