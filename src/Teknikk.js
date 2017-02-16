import React from 'react';
import './App.css';
import './Admin.css';
import axios from 'axios';

const server = 'http://192.168.0.108:1337/'

var Teknikk = React.createClass({	
	edit(){
		var navn = prompt("Gi nytt navn:");

		if(navn != null){
			var beskrivelse = prompt("Endre teksten for å gi ny beskrivelse",this.props.beskrivelse);
			if(beskrivelse===null){
				beskrivelse = this.props.beskrivelse;
			}
			var url =  server;
				url += 'Teknikk/update?';
				url += `id=${this.props.id}`;
				url += '&navn='+navn;
				url += '&beskrivelse='+beskrivelse;			

			axios.post(url)
			.then(res => this.props.update(this))
			.catch(function(err){
				console.log("Noe feil skjedde",err);
			});
		}
	},	
	remove(){
		if(confirm("Dette vil slette elementet. \n\nFortsette?")){
			var url =  server;
				url += 'Teknikk/destroy?';
				url += `id=${this.props.id}&`;			
				
			
			axios.post(url)
			.then(res => this.props.update())
			.catch(function(err){
				console.log("Noe feil skjedde",err);
			});
		}
	},
	render(){
		if(this.props.admin){
			return(
				<div >
					<span title="Endre" onClick={this.edit} className="edit">[#]</span>
					<span title="Slett" onClick={this.remove} className="delete">[X]</span>
					{this.props.children}
				</div>
			);
		}
		else{
			return(
				<div >
					{this.props.children}
				</div>
			);
		}
	}
})

export default Teknikk;