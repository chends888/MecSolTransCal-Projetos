import React, { Component } from "react";
import { FormControl, Button } from "react-bootstrap";
import "./Form.css";

class ElementGroups extends Component {
  constructor(props) {
    super(props);
    this.addPoint = this.addPoint.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
  }

  addPoint() {
    const element_groups = this.props.element_groups;
    element_groups.push([null, null, null]);
    this.props.handlePropertieChange(element_groups);
  }

  handleRemove(indexToRemove) {
    const newElementGroups = [];
    this.props.element_groups.map((element_group, index) => {
      if (index != indexToRemove) {
        newElementGroups.push(element_group);
      }
    });
    this.props.handlePropertieChange(newElementGroups);
  }

  handleFormChange(e, insideIndex, externalIndex) {
    const element_groups = this.props.element_groups;
    element_groups[externalIndex][insideIndex] = e.target.value;
    this.props.handlePropertieChange(element_groups);
  }

  render() {
    return (
      <div style={{ marginBottom: "2em" }}>
        <div className="subtittle">Grupo de Elementos</div>
        <div className="subsession">
          {this.props.element_groups.map((element_group, index) => {
            return (
              <div className="form-row" key={index}>
                <div className="centralize-in-column-center bold">
                  {" "}
                  Elemento {index + 1}{" "}
                </div>
                <FormControl
                  onChange={e => this.handleFormChange(e, 0, index)}
                  className="custom-form-control"
                  value={element_group[0]}
                />
                <FormControl
                  onChange={e => this.handleFormChange(e, 1, index)}
                  className="custom-form-control"
                  value={element_group[1]}
                />
                <FormControl
                  onChange={e => this.handleFormChange(e, 2, index)}
                  className="custom-form-control"
                  value={element_group[2]}
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
            Adicionar Elemento
          </Button>
        </div>
      </div>
    );
  }
}

ElementGroups.defaultProps = {
  element_groups: [[null, null, null]]
};

export default ElementGroups;
