import React, { Component } from "react";
import { FormControl, Button } from "react-bootstrap";
import "./Form.css";
import "./App.css";

class ChooseUserOptions extends Component {
  constructor(props) {
    super(props);
    this.handleMethod = this.handleMethod.bind(this);
  }

  handleMethod(method) {
      return this.props.handlePropertieChange(method,'method');
  }

  render() {
    
    let jacobiClassName;
    let gaussClassName;
    if(this.props.method === 'gauss') {
      jacobiClassName='inativatedd-button';
      gaussClassName='ativatedd-button';
    } else {
       jacobiClassName = "ativatedd-button";
       gaussClassName = "inativatedd-button";
    }   
    
    return <div style={{ padding: "1em", paddingTop: "2em" }}>
        <div className="flex-row-around">
          <span style={{ fontWeight: "700" }}>
            {" "}
            Método de Convergência:{" "}
          </span>
          <Button onClick={() => this.handleMethod("jacobi")} className={jacobiClassName}>
            {" "}
            Jabobi{" "}
          </Button>
          <Button onClick={() => this.handleMethod("gauss")} className={gaussClassName}>
            {" "}
            Gauss{" "}
          </Button>
        </div>
        <div style={{ margin: "2em" }} className="flex-row-around">
          <span style={{ fontWeight: "700" }}> Tolerancia: </span>
          <FormControl onChange={(e) => this.props.handlePropertieChange(e.target.value, "tolerance")} style={{ maxWidth: "8em" }} value={this.props.tolerance} />
        </div>
        <div style={{ margin: "3 0 1 0" }} className="flex-row-around">
          <span style={{ fontWeight: "700" }}> Iterações: </span>
          <FormControl onChange={(e) => this.props.handlePropertieChange(e.target.value, "iterations")} style={{ maxWidth: "8em" }} value={this.props.iterations} />
        </div>
      </div>;
  }
}


export default ChooseUserOptions;
