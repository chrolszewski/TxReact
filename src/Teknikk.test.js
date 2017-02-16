import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Teknikk from './Teknikk';


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Teknikk />, div);
});