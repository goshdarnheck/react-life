import React from 'react';
import ReactDOM from 'react-dom';
import Life from '../Life';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Life size={60} cellSize={12} speed={250} paused={true} />, div);
    ReactDOM.unmountComponentAtNode(div);
});
