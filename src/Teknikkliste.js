import React from 'react';
import Teknikk from './Teknikk';
import axios from 'axios';
import './App.css';
import './Admin.css';

const server = 'http://192.168.0.108:1337/'

var Teknikkliste = React.createClass({
	getInitialState(){
      return {
        teknikker: [],
        stilartNavn: '',
        stilart: false,
        grad: false,
        belte: '',
        admin:false
      }
    },
    getData(stilart,grad){
    	this.setState({teknikker:[]});
    	var url = server+'Teknikk/pensum';
    	    url +=`?stilart=${stilart}`;
    	    url +=`&grad=${grad}`;

		axios.get(url)
		.then(res => res.data)
		.then(arr => arr.forEach(
			teknikk => this.addTeknikk(teknikk)))
		.catch(function(err){
        	console.log("Didn't connect to the server, or some other thing fucked up: ", err);
		});
    },
    setHeader(stilartNavn,belte,stilart,grad){
    	this.setState({
    		stilartNavn:stilartNavn,
    		belte:belte,
    		stilart:stilart,
    		grad:grad
    	})
    },
    addTeknikk(teknikk, empty){
		var teknikker = [
            ...this.state.teknikker,
            {
              id: teknikk.id,
              navn: teknikk.navn,
              stilart: teknikk.stilart,
              grad:teknikk.grad,
              beskrivelse: teknikk.beskrivelse
            }
          ];
          this.setState({teknikker});
	},
	eachTeknikk(teknikk){
		return(
			<Teknikk
				key={teknikk.id}
				id={teknikk.id}
				stilart={teknikk.stilart}
				grad={teknikk.grad}
				beskrivelse={teknikk.beskrivelse}
				admin={this.props.admin}
				update={this.update}>
					<div className="teknikk">
						<h3>{teknikk.navn}</h3>
						<p>{teknikk.beskrivelse}</p>
					</div>
			</Teknikk>
		);
	},
	new(){
		
		var navn = prompt("Navn på teknikken: ");		

		if(navn != null){
			var beskrivelse = prompt("Beskrivelse: ");
			var url = server;
				url += 'Teknikk/create?';
				url += `stilart=${this.state.stilart}`;
				url += `&grad=${this.state.grad}`;
				url += '&navn='+navn;
				url += '&beskrivelse='+beskrivelse;
			
			axios.post(url)
			.then(res => this.update())
			.catch(function(err){
				console.log("Noe feil skjedde",err);
			});
		}
	},
	update(p){
		this.setState(
			{
				teknikker:[]
			}
		);
		this.getData(this.state.stilart,this.state.grad)
	},	
	render(){		
		if(this.state.stilartNavn !== '' && this.props.admin){
			return(
				<div className="teknikk">
					<span onClick={this.new} className="new" title="Ny">[+]</span>
					<h1>{this.state.stilartNavn} {this.state.belte}</h1>
					{this.state.teknikker.map(this.eachTeknikk)}
				</div>
			);
		}
		else
		{
			return(
				<div className="teknikk">
					<h1>{this.state.stilartNavn} {this.state.belte}</h1>
					{this.state.teknikker.map(this.eachTeknikk)}
				</div>
			);
		}
	}
}); 

export default Teknikkliste;