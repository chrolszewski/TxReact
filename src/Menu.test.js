import React from 'react';
import ReactDOM from 'react-dom';
import Menu from './Menu';
import Menuitem from './Menuitem';
import axios from 'axios';


describe('testing av Menu.js', ()=>{
	it('renders without crashing', () => {
	  const div = document.createElement('div');
	  ReactDOM.render(<Menu />, div);
	});

	it('renders without crashing', () => {
	  const div = document.createElement('Menu');
	  ReactDOM.render(<Menuitem />, div);
	});


	it('server call',()=>{
		axios.get('http://192.168.0.108:1337/Teknikk/pensum?stilart=1&grad=1')
		.then(res=> console.log(res))
		

	});
});

