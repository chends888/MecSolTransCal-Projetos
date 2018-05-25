import React, { Component } from "react";
import { FormControl, Button, Grid, Row, Col } from "react-bootstrap";
import '../src/App.css';


class SideMenu extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className="sidemenu">
        <h3 className="sidemenu-tittle"> Menu Auxiliar </h3>
        <div style={{ paddingTop: "1em" }}>
          <h5> mudar método </h5>
          <div className="flex-row-around">
            <Button onClick={() => this.props.handlePropertieChange('jacobi', 'method', false, true)}>
              {" "}
              Jacobi{" "}
            </Button>
            <Button onClick={() => this.props.handlePropertieChange('gauss','method', false,true)}>
              {" "}
              Gauss{" "}
            </Button>
          </div>
        </div>
        <div style={{ paddingTop: "1em" }}>
          <h5> número de iterações </h5>
          <div className="flex-row-around">
            <FormControl value={this.props.iterations} onChange={e => this.props.handlePropertieChange(e.target.value, "iterations", true)} />
            <Button onClick={this.props.atualizar}> Atualizar </Button>
          </div>
        </div>
        <div style={{ paddingTop: "1em" }}>
          <h5> erro admissível </h5>
          <div className="flex-row-around">
            <FormControl value={this.props.tolerance} onChange={e => this.props.handlePropertieChange(e.target.value, "tolerance", true)} />
            <Button onClick={this.props.atualizar}> Atualizar </Button>
          </div>
        </div>
        <div className="flex-row-center" style={{ paddingTop: "2em" }}>
          <Button onClick={() => this.props.handleInputsModal(1)} bsStyle="success">
            {" "}
            Editar Entradas{" "}
          </Button>
        </div>
      </div>;
  }
}

export default SideMenu;
