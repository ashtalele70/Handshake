import React, { Component } from 'react';
import './App.css';
import Main from './Components/Main';
import {BrowserRouter} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'

class App extends Component {
  
  render() {
    return (
    	<BrowserRouter>
        <div>
          {/* App Component Has a Child Component called Main*/}
          <Main/>
        </div>
    	</BrowserRouter>
    );
  }
}
//Export the App component so that it can be used in index.js


export default App;