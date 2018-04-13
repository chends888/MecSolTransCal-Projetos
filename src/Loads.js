import React, { Component } from "react";
import { FormControl, Button } from "react-bootstrap";
import "./Form.css";

class Loads extends Component {
  constructor(props) {
    super(props);
    this.addPoint = this.addPoint.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
  }

  addPoint() {
    const loads = this.props.loads;
    loads.push([null, null, null]);
    this.props.handlePropertieChange(loads);
  }

  handleRemove(indexToRemove) {
    const newLoads = [];
    this.props.loads.map((load, index) => {
      if (index != indexToRemove) {
        newLoads.push(load);
      }
    });
    this.props.handlePropertieChange(newLoads);
  }

  handleFormChange(e, insideIndex, externalIndex) {
    const loads = this.props.loads;
    loads[externalIndex][insideIndex] = e.target.value;
    this.props.handlePropertieChange(loads);
  }

  render() {
    return (
      <div style={{ marginBottom: "2em" }}>
        <div className="subtittle">Carregamento</div>
        <div className="subsession">
          {this.props.loads.map((load, index) => {
            return (
              <div className="form-row" key={index}>
                <div className="centralize-in-column-center bold">
                  {" "}
                  Carregamento {index + 1}{" "}
                </div>
                <FormControl
                  onChange={e => this.handleFormChange(e, 0, index)}
                  className="custom-form-control"
                  value={load[0]}
                />
                <FormControl
                  onChange={e => this.handleFormChange(e, 1, index)}
                  className="custom-form-control"
                  value={load[1]}
                />
                <FormControl
                  onChange={e => this.handleFormChange(e, 2, index)}
                  className="custom-form-control"
                  value={load[2]}
                />
                {index > 0 ? (
                  <Button onClick={() => this.handleRemove(index)}>
                    Remover
                  </Button>
                ) : (
                  <div style={{ width: "6em" }} />
                )}
              </div>
            );
          })}
          <Button bsStyle="success" onClick={this.addPoint}>
            {" "}
            Adicionar Carregamento{" "}
          </Button>
        </div>
      </div>
    );
  }
}

Loads.defaultProps = {
  loads: [[null, null, null]]
};

export default Loads;
