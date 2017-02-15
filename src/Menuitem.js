import React from 'react';
import './menu.css';
import './Admin.css';
import axios from 'axios';

var Menuitem = React.createClass({
	propTypes:{
		id: React.PropTypes.number,
		onClick: React.PropTypes.func,
		update: React.PropTypes.func
	},
	click(e){
		
		if (typeof this.props.onClick === 'function') {
            this.props.onClick(this.props);
        }
	},
	update(e){
		if (typeof this.props.update === 'function') {
            this.props.update(this.props);
        }
	},
	edit(){		
		var navn = prompt("Gi nytt navn:");

		if(navn != null){
			var url = 'http://192.168.0.104:1337/';

			if(this.props.grad && this.props.stilart){
				url += 'Grader/update?';
				url += `id=${this.props.id}&`;
				url += 'navn='+navn;
			}
			else{
				url += 'Stilarter/update?';
				url += `id=${this.props.id}&`;
				url += 'navn='+navn;
			}
			axios.post(url)
			.then(res => this.update())
			.catch(function(err){
				console.log("Noe feil skjedde",err);
			});
		}
	},
	remove(){
		if(confirm("Dette vil slette elementet og alle ting under knyttet til dette. \n\nFortsette?")){
			var url = 'http://192.168.0.104:1337/';

			if(this.props.grad && this.props.stilart){
				url += 'Grader/delete?';
				url += `id=${this.props.id}&`
				url += `stilart=${this.props.stilart}&`;
				url += `grad=${this.props.grad}`;
			}
			else{
				url += 'Stilarter/delete?';
				url += `id=${this.props.id}`;
			}
			axios.post(url)
			.then(res => this.update())
			.catch(function(err){
				console.log("Noe feil skjedde",err);
			});
		}
	},
    render(){
		if(this.props.admin && this.props.id !== 0){
			return (
		        <div className="menuItem">
		        	<span onClick={this.edit} title="Endre" className="edit">[#]</span>
		        	<span onClick={this.remove} title="Slett" className="delete">[X]&nbsp;</span>
		        	<span onClick={this.click}>{this.props.children}</span>
		        	
		    	</div>
	    	);
		}
		else{
			return (
		        <div className="menuItem">
		        	<span onClick={this.click}>{this.props.children}</span>        	
		    	</div>
      		);
  		}          
    }
});

export default Menuitem;