import React from 'react';
import ReactDOM from 'react-dom';
import Menuitem from './Menuitem';
import axios from 'axios';



test('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Menuitem />, div);
});
