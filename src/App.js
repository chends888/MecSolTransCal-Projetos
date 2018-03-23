import React, { Component } from 'react';
import { FormControl } from 'react-bootstrap';
import { getParameters } from './helper';
import logo from './logo.svg';
import './App.css';

let fileName = '';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.handleFileSelection = this.handleFileSelection.bind(this);
  }

  handleFileSelection() {
    var reader = new FileReader();
    reader.onload = function (e) {
      fileName = reader.result;
      // console.log(fileName);
      getParameters(fileName);
    }
    reader.readAsText(document.querySelector('input').files[0]);
  }

  render() {
    return (
      <div style={{ padding: '3em' }} className="App">
        <FormControl onChange={this.handleFileSelection} type="file" />
      </div>
    );
  }
}

export default App;
