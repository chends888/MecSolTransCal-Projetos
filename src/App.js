import React, { Component } from 'react';
import { FormControl, Button, Modal } from 'react-bootstrap';
import './App.css';
import "./Form.css";
import Coordinates  from '../src/Coordinates';
import Incidences from "../src/Incidences";
import ElementGroups from "../src/ElementGroups";
import Materials from "../src/Materials";
import GeometricProperties from "../src/GeometricProperties";
import Bcnodes from "../src/Bcnodes";
import Loads from "../src/Loads";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showInputsModal: false,
      coordinates: [[null, null, null]],
      element_groups: [[null, null, null]],
      incidences: [[null,null,null]],
      materials: [[null,null,null]],
      geometric_properties:[[null]],
      bcnodes:[[null]],
      loads: [[null,null,null]],
    };
    this.handleInputsModal = this.handleInputsModal.bind(this);
    this.handlePropertieChange = this.handlePropertieChange.bind(this);
    
  }

  handlePropertieChange(newContent, key) {
    const state = this.state;
    state[key]  = newContent;
    this.setState(state);
  }

  handleInputsModal() {
    this.setState({showInputsModal: !this.state.showInputsModal});
  }

  // getMatrix() {
  //   const matrix =  getMatrix(this.state);
  // }

  render() {
    return <div style={{ padding: "3em" }} className="App">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous" />
        <Button onClick={this.handleInputsModal}> Inserir Entradas </Button>
        <Modal show={this.state.showInputsModal} onHide={this.handleInputsModal}>
          <Modal.Header closeButton>
            <Modal.Title>Entradas do Programa</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className='overflow-body'>
              <Coordinates coordinates={this.state.coordinates} handlePropertieChange={newContent => this.handlePropertieChange(newContent, "coordinates")} />
              <ElementGroups element_groups={this.state.element_groups} handlePropertieChange={newContent => this.handlePropertieChange(newContent, "element_groups")} />
              <Incidences incidences={this.state.incidences} handlePropertieChange={newContent => this.handlePropertieChange(newContent, "incidences")} />
              <Materials materials={this.state.materials} handlePropertieChange={newContent => this.handlePropertieChange(newContent, "materials")} />
              <GeometricProperties geometric_properties={this.state.geometric_properties} handlePropertieChange={newContent => this.handlePropertieChange(newContent, "geometric_properties")} />
              <Bcnodes bcnodes={this.state.bcnodes} handlePropertieChange={newContent => this.handlePropertieChange(newContent, "bcnodes")} />
              <Loads loads={this.state.loads} handlePropertieChange={newContent => this.handlePropertieChange(newContent, "loads")} />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className='buttons-row'>
              <Button onClick={this.handleInputsModal}> Cancelar </Button>
              <Button> Salvar </Button>
              <div/>
            </div>
          </Modal.Footer>
        </Modal>
      </div>;
  }
}

export default App;
