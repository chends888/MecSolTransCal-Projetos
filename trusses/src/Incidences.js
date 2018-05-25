import React, { Component } from "react";
import { FormControl, Button } from "react-bootstrap";
import "./Form.css";

class Incidences extends Component {
  constructor(props) {
    super(props);
    this.addPoint = this.addPoint.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
  }

  addPoint() {
    const incidences = this.props.incidences;
    incidences.push([null, null, null]);
    this.props.handlePropertieChange(incidences);
  }

  handleRemove(indexToRemove) {
    const newIncidences = [];
    this.props.incidences.map((incidence, index) => {
      if (index != indexToRemove) {
        newIncidences.push(incidence);
      }
    });
    this.props.handlePropertieChange(newIncidences);
  }

  handleFormChange(e, insideIndex, externalIndex) {
    const incidences = this.props.incidences;
    incidences[externalIndex][insideIndex] = e.target.value;
    this.props.handlePropertieChange(incidences);
  }

  render() {
    return (
      <div style={{ marginBottom: "2em" }}>
        <div className="subtittle">Incidências</div>
        <div className="subsession">
          {this.props.incidences.map((incidence, index) => {
            return (
              <div className="form-row" key={index}>
                <div className="centralize-in-column-center bold">
                  {" "}
                  Incidência {index + 1}{" "}
                </div>
                <FormControl
                  onChange={e => this.handleFormChange(e, 0, index)}
                  className="custom-form-control"
                  value={incidence[0]}
                />
                <FormControl
                  onChange={e => this.handleFormChange(e, 1, index)}
                  className="custom-form-control"
                  value={incidence[1]}
                />
                <FormControl
                  onChange={e => this.handleFormChange(e, 2, index)}
                  className="custom-form-control"
                  value={incidence[2]}
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
            Adicionar Incidência
          </Button>
        </div>
      </div>
    );
  }
}

Incidences.defaultProps = {
  incidences: [[null, null, null]]
};

export default Incidences;
