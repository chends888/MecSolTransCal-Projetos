import React, { Component } from "react";
import { FormControl, Button } from "react-bootstrap";
import "./Form.css";

class Coordinates extends Component {
  constructor(props) {
    super(props);
    this.addPoint = this.addPoint.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
  };

  addPoint() {
    const coordinates =  this.props.coordinates;
    coordinates.push([null,null,null]);
    this.props.handlePropertieChange(coordinates);
  }

  handleRemove(indexToRemove) {
    const newCoordinates = [];
    this.props.coordinates.map((coordinate,index) => {
      if(index != indexToRemove) {
        newCoordinates.push(coordinate);
      }
    });
    this.props.handlePropertieChange(newCoordinates);
  }

  handleFormChange(e,insideIndex,externalIndex) {
    const coordinates =  this.props.coordinates;
    coordinates[externalIndex][insideIndex] = e.target.value;
    this.props.handlePropertieChange(coordinates);
  }

  render() {
    return (
      <div style={{marginBottom:'2em'}}>
        <div className='subtittle'>
          Coordenadas
        </div>
        <div className='subsession'>
        {
          this.props.coordinates.map((coordinate, index) => {
            return <div className="form-row" key={index}>
                <div className="centralize-in-column-center bold">
                  {" "}
                  Ponto {index + 1}{" "}
                </div>
                <FormControl onChange={e => this.handleFormChange(e, 0, index)} className="custom-form-control" value={coordinate[0]} />
                <FormControl onChange={e => this.handleFormChange(e, 1, index)} className="custom-form-control" value={coordinate[1]} />
                <FormControl onChange={e => this.handleFormChange(e, 2, index)} className="custom-form-control" value={coordinate[2]} />
                {index > 0 ? <Button
                    onClick={() => this.handleRemove(index)}
                  >
                    Remover
                  </Button> : <div style={{ width: "6em" }} />}
              </div>;
          })
        }
        <Button bsStyle='success' onClick={this.addPoint}> Adicionar Ponto </Button>
        </div>
      </div>
    );
  }
}

Coordinates.defaultProps  = {
  coordinates:[[null,null,null]],
};

export default Coordinates;
