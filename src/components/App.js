import React, { Component } from 'react';
import DashBoard from './DashBoard.js';
import { Button } from 'react-bootstrap';
import '../styles/index.css';

class App extends Component{
  render(){
    return(
<div>
<h2>Cars App</h2>
<DashBoard />

</div>
    )
  }
}
export default App;
