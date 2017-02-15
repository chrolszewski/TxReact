import React from 'react';
import './App.css';
import Menu from './Menu';
import Teknikkliste from './Teknikkliste';


var App = React.createClass({

  getInitialState(){
    return{
      admin:false
    }
  },
  teknikkListeGenerering(stilart,grad){
    this.refs.teknikkbygging.getData(stilart,grad);
  },
  sendHeader(navn,belte,stilart,grad){
    this.refs.teknikkbygging.setHeader(navn,belte,stilart,grad);
  },
  enableAdmin(){
    this.setState({
      admin:!this.state.admin      
    })  
  },
  render(){
    return(
      <div className="main">
        <Menu
          teknikkListeGenerering={this.teknikkListeGenerering}
          sendHeader={this.sendHeader}
          admin={this.state.admin}
        /> 
        <div className="left">       
          <button onClick={this.enableAdmin} height="25">Admin</button>
            <Teknikkliste 
              admin={this.state.admin}
              ref="teknikkbygging"
              
            />
        </div>
      </div>      
    )    
  }
})

export default App;
