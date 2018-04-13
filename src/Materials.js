import React, { Component } from "react";
import { FormControl, Button } from "react-bootstrap";
import "./Form.css";

class Materials extends Component {
  constructor(props) {
    super(props);
    this.addPoint = this.addPoint.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
  }

  addPoint() {
    const materials = this.props.materials;
    materials.push([null, null, null]);
    this.props.handlePropertieChange(materials);
  }

  handleRemove(indexToRemove) {
    const newMaterials = [];
    this.props.materials.map((material, index) => {
      if (index != indexToRemove) {
        newMaterials.push(material);
      }
    });
    this.props.handlePropertieChange(newMaterials);
  }

  handleFormChange(e, insideIndex, externalIndex) {
    const materials = this.props.materials;
    materials[externalIndex][insideIndex] = e.target.value;
    this.props.handlePropertieChange(materials);
  }

  render() {
    return (
      <div style={{ marginBottom: "2em" }}>
        <div className="subtittle">Materiais</div>
        <div className="subsession">
          {this.props.materials.map((material, index) => {
            return (
              <div className="form-row" key={index}>
                <div className="centralize-in-column-center bold">
                  {" "}
                  Material {index + 1}{" "}
                </div>
                <FormControl
                  onChange={e => this.handleFormChange(e, 0, index)}
                  className="custom-form-control"
                  value={material[0]}
                />
                <FormControl
                  onChange={e => this.handleFormChange(e, 1, index)}
                  className="custom-form-control"
                  value={material[1]}
                />
                <FormControl
                  onChange={e => this.handleFormChange(e, 2, index)}
                  className="custom-form-control"
                  value={material[2]}
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
            Adicionar Material{" "}
          </Button>
        </div>
      </div>
    );
  }
}

Materials.defaultProps = {
  materials: [[null, null, null]]
};

export default Materials;
