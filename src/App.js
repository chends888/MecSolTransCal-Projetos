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
import ChooseUserOptions  from '../src/ChooseUserOptions';
import { getDemoState } from '../src/helper';
import Dashboard from '../src/Dashboard';
 
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      simulate: false,
      step: 1,
      method: 'jacobi',
      iterations: 50,
      tolerance: 0.5,
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
    this.handleStep = this.handleStep.bind(this);
    this.fullFillState = this.fullFillState.bind(this);
    this.handleSimulate = this.handleSimulate.bind(this);
  }

  handlePropertieChange(newContent, key) {
    const state = this.state;
    state[key]  = newContent;
    this.setState(state);
  }

  handleSimulate() {
      this.setState({simulate: true, showInputsModal: false});
  }

  fullFillState() {
    const newState = getDemoState(this.state.method,this.state.iterations, this.state.tolerance);
    this.setState(newState);
  }

  handleStep(bool) {
    let step;
    if(!bool) {
      step =  Number(this.state.step) + 1;
    } else {
      step = Number(this.state.step) - 1;
    }
    this.setState({step});
  }

  handleInputsModal() {
    this.setState({showInputsModal: !this.state.showInputsModal});
  }

  render() {
    return <div className="App">
        {
          !this.state.simulate ?
                    <div className="home-background" />
                    :
                    ''
        }
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous" />
        <div className="background-body">
          {
            !this.state.showInputsModal && !this.state.simulate ?
            <div className="home-brand">
            <div>
              <span className="principal-title"> SimuPrecisão </span>
            </div>
            <span className="subtitle">
              {" "}
              Se você pode simular, você pode fazer!{" "}
            </span>
            <div style={{ paddingTop: "5em" }} className="flex-row-center">
              <Button style={{ fontSize: "1.5em" }} onClick={this.handleInputsModal} className="button-home" bsStyle="success">
                {" "}
                COMEÇAR{" "}
              </Button>
            </div>
          </div>
          :
            this.state.simulate ?
            <Dashboard/>
            :
            ''
          }

        </div>
        <Modal show={this.state.showInputsModal} onHide={this.handleInputsModal}>
          <Modal.Header closeButton>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
              <Modal.Title>Dados do Programa</Modal.Title>
              {this.state.step === 1 ? <Button onClick={this.fullFillState} style={{ marginRight: "2em" }}>
                  {" "}
                  dados p/ demo{" "}
                </Button> : ""}
            </div>
          </Modal.Header>
          <Modal.Body>
            <div className="overflow-body">
              {
                this.state.step === 1 ?
                <div>
                  <Coordinates coordinates={this.state.coordinates} handlePropertieChange={newContent => this.handlePropertieChange(newContent, "coordinates")} />
                  <ElementGroups element_groups={this.state.element_groups} handlePropertieChange={newContent => this.handlePropertieChange(newContent, "element_groups")} />
                  <Incidences incidences={this.state.incidences} handlePropertieChange={newContent => this.handlePropertieChange(newContent, "incidences")} />
                  <Materials materials={this.state.materials} handlePropertieChange={newContent => this.handlePropertieChange(newContent, "materials")} />
                  <GeometricProperties geometric_properties={this.state.geometric_properties} handlePropertieChange={newContent => this.handlePropertieChange(newContent, "geometric_properties")} />
                  <Bcnodes bcnodes={this.state.bcnodes} handlePropertieChange={newContent => this.handlePropertieChange(newContent, "bcnodes")} />
                  <Loads loads={this.state.loads} handlePropertieChange={newContent => this.handlePropertieChange(newContent, "loads")} />
                </div>
                :
                <ChooseUserOptions 
                  iterations={this.state.iterations}
                  tolerance={this.state.tolerance}
                  method={this.state.method}
                  handlePropertieChange={this.handlePropertieChange}
                />
              }

            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="buttons-row">
              {this.state.step === 1 ? <Button
                  onClick={this.handleInputsModal}
                >
                  {" "}
                  Cancelar{" "}
                </Button> : <Button onClick={() => this.handleStep(true)}>
                  {" "}
                  Voltar{" "}
                </Button>}
              {this.state.step === 1 ? <Button
                  onClick={() => this.handleStep(false)}
                >
                  {" "}
                  Prosseguir{" "}
                </Button> : <Button onClick={this.handleSimulate} bsStyle='success'>
                  {" "}
                  SIMULAR{" "}
                </Button>}
              <div />
            </div>
          </Modal.Footer>
        </Modal>
      </div>;
  }
}

export default App;
