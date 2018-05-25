import React, { Component } from "react";
import { FormControl, Button } from "react-bootstrap";
import "./Form.css";

class GeometricProperties extends Component {
  constructor(props) {
    super(props);
    this.addPoint = this.addPoint.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
  }

  addPoint() {
    const geometric_properties = this.props.geometric_properties;
    geometric_properties.push([null, null, null]);
    this.props.handlePropertieChange(geometric_properties);
  }

  handleRemove(indexToRemove) {
    const newGeometricProperties = [];
    this.props.geometric_properties.map((geometric_propertie, index) => {
      if (index != indexToRemove) {
        newGeometricProperties.push(geometric_propertie);
      }
    });
    this.props.handlePropertieChange(newGeometricProperties);
  }

  handleFormChange(e, insideIndex, externalIndex) {
    const geometric_properties = this.props.geometric_properties;
    geometric_properties[externalIndex][insideIndex] = e.target.value;
    this.props.handlePropertieChange(geometric_properties);
  }

  render() {
    return (
      <div style={{ marginBottom: "2em" }}>
        <div className="subtittle">Propriedades Geométricas</div>
        <div className="subsession">
          {this.props.geometric_properties.map((geometric_propertie, index) => {
            return (
              <div className="form-row" key={index}>
                <div className="centralize-in-column-center bold">
                  {" "}
                  Propriedade {index + 1}{" "}
                </div>
                <FormControl
                  onChange={e => this.handleFormChange(e, 0, index)}
                  className="custom-form-control"
                  value={geometric_propertie[0]}
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
            Adicionar Propriedade{" "}
          </Button>
        </div>
      </div>
    );
  }
}

GeometricProperties.defaultProps = {
  geometric_properties: [[null]]
};

export default GeometricProperties;
