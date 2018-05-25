import React, { Component } from "react";
import { FormControl, Button } from "react-bootstrap";
import "./Form.css";

class Bcnodes extends Component {
  constructor(props) {
    super(props);
    this.addPoint = this.addPoint.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
  }

  addPoint() {
    const bcnodes = this.props.bcnodes;
    bcnodes.push([null, null]);
    this.props.handlePropertieChange(bcnodes);
  }

  handleRemove(indexToRemove) {
    const newBcnodes = [];
    this.props.bcnodes.map((bcnode, index) => {
      if (index != indexToRemove) {
        newBcnodes.push(bcnode);
      }
    });
    this.props.handlePropertieChange(newBcnodes);
  }

  handleFormChange(e, insideIndex, externalIndex) {
    const bcnodes = this.props.bcnodes;
    bcnodes[externalIndex][insideIndex] = e.target.value;
    this.props.handlePropertieChange(bcnodes);
  }

  render() {
    return (
      <div style={{ marginBottom: "2em" }}>
        <div className="subtittle">Bcnodes</div>
        <div className="subsession">
          {this.props.bcnodes.map((bcnode, index) => {
            return <div className="form-row" key={index}>
                <div className="centralize-in-column-center bold">
                  {" "}
                  Nó {index + 1}{" "}
                </div>
                <FormControl onChange={e => this.handleFormChange(e, 0, index)} className="custom-form-control" value={bcnode[0]} />
                <FormControl onChange={e => this.handleFormChange(e, 1, index)} className="custom-form-control" value={bcnode[1]} />
                {index > 0 ? <Button
                    onClick={() => this.handleRemove(index)}
                  >
                    Remover
                  </Button> : <div style={{ width: "6em" }} />}
              </div>;
          })}
          <Button bsStyle="success" onClick={this.addPoint}>
            {" "}
            Adicionar Nó{" "}
          </Button>
        </div>
      </div>
    );
  }
}

Bcnodes.defaultProps = {
  bcnodes: [[null, null, null]]
};

export default Bcnodes;
