import React from 'react';
import axios from 'axios';
import Menuitem from './Menuitem';
import './Admin.css';


var Menu = React.createClass({	
	getInitialState(){
		return {
			items: [],
			niva: 1,
			stilartNavn: '',
			stilart:false
		};
	},
	componentWillMount(){
		this.getData(this.state.niva)
	},
	getData(niva,stilart){
		var url = 'http://192.168.0.104:1337/';

		switch(niva){
			case 1:
				url+='Stilarter';
				break;
			case 2:
				url+='Grader';
				url+='?stilart='+stilart;
				break;
			default:
				console.error("Dette skal ikke kunne skje");
		}

		axios.get(url)
		.then(res => res.data)
		.then(arr => arr.forEach(
			menuItem => this.addItem(menuItem, false)))
		.catch(function(err){
        	console.log("Didn't connect to the server, or some other thing fucked up: ", err);
		});
	},
	update(p){
		this.setState(
			{
				items:this.state.niva===1?[]:this.state.items.slice(0,1) 
			}
		);
		this.getData(this.state.niva,p.stilart)
	},	
	new(){		
		var navn = prompt("Navn på det nye elementet: ","Nytt element");

		if(navn != null){
			var url = 'http://192.168.0.104:1337/';

			if(this.state.stilart){
				url += 'Grader/make?';
				url += `stilart=${this.state.stilart}&`;
				url += 'navn='+navn;
			}
			else{
				url += 'Stilarter/create?';
				url += 'navn='+navn;
			}
			
			axios.post(url)
			.then(res => this.update(this.state))
			.catch(function(err){
				console.log("Noe feil skjedde",err);
			});
		}
	},
	addItem(menuItem, empty){
		var items = empty?[
            {
              id: menuItem.id,
              navn: menuItem.navn,
              stilart: menuItem.stilart?menuItem.stilart:false,
              grad:menuItem.grad?menuItem.grad:false
            }
          ]:[
            ...this.state.items,
            {
              id: menuItem.id,
              navn: menuItem.navn,
              stilart: menuItem.stilart?menuItem.stilart:false,
              grad:menuItem.grad?menuItem.grad:false
            }
          ];
          this.setState({items});
	},
	upLevel(menuItem){
		
		this.setState(
			{
				niva: --this.state.niva,
				stilart: false,
				items:[] 
			}
		);

		var stilart = menuItem.stilart?menuItem.stilart:false,
			grad = menuItem.grad?menuItem.grad:false;

		this.getData(this.state.niva,menuItem.id,stilart,grad);
	},
	downLevel(menuItem){
		if(this.state.niva !== 2){	
			this.setState(
				{
					stilart:menuItem.id,
					stilartNavn:menuItem.children,
					niva: ++this.state.niva
				}
			);


			if(this.state.niva > 1){
				this.addItem({
					id:0,
					navn: "<< "+menuItem.children
				},true);
			}

			var stilart = menuItem.stilart?menuItem.stilart:menuItem.id,
				grad = menuItem.grad?menuItem.grad:false;	

			this.getData(this.state.niva,stilart,grad);
		}
		else{
			console.log(this.state.stilartNavn, menuItem.children,menuItem.stilart,menuItem.grad)
			this.props.sendHeader(this.state.stilartNavn, menuItem.children,menuItem.stilart,menuItem.grad)
			this.props.teknikkListeGenerering(menuItem.stilart,menuItem.grad);
		}
	},
	eachItem(menuItem){
		return(
			<Menuitem
				key={menuItem.id}
				id={menuItem.id}
				stilart={menuItem.stilart?menuItem.stilart:false}
				grad={menuItem.grad?menuItem.grad:false}
				admin={this.props.admin}
				onClick={menuItem.id===0?this.upLevel:this.downLevel}
				update={this.update}>
					{menuItem.navn}					
			</Menuitem>
		);
	},
	render(){
		if(this.props.admin){
			return(
				<div>
					<span title="Ny" className="new menuItem" onClick={this.new}>[+]</span>
					{this.state.items.map(this.eachItem)}
				</div>
			);
		}
		else{		
			return(
				<div>
					{this.state.items.map(this.eachItem)}
				</div>
			);
		}
	}
});

export default Menu;