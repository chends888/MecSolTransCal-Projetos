import React, { Component } from "react";
import { FormControl, Button, Grid, Row, Col } from "react-bootstrap";
import { Bar, Line, Radar, Scatter } from "react-chartjs-2";
import SideMenu from '../src/SideMenu';


class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const deslocationData= {
        labels: ["Node 1", "Node 2"],
        datasets: [{
        label: "Deslocamentos",
        backgroundColor: "rgb(102, 0, 171)",
        borderColor: "rgb(102, 0, 171)",
        data: this.props.results.displacements.map(e => e),
        }]
    };
    const deformationData= {
        labels: ["Element 1", "Element 2", "Element 3"],
        datasets: [{
        label: "Deformações",
        backgroundColor: "rgb(230, 88, 58)",
        borderColor: "rgb(230, 88, 58)",
        data: this.props.results.element_strains.map(e => e),
        }]
    };
    const tensaoData= {
        labels: ["Element 1", "Element 2", "Element 3"],
        datasets: [{
        label: "Tensões",
        borderColor: "rgb(0, 236, 255)",
        data:  this.props.results.element_stresses.map(e => e),
        }]
    };
    const reactiosData= {
        labels: ["R1", "R2", "R3", "R4"],
        datasets: [{
        label: "Reações",
        backgroundColor: "rgb(0, 0, 0)",
        borderColor: "rgb(230, 88, 58)",
        data: this.props.results.reaction_forces.map(e => e),
        }]
    };
    
    return <div style={{margin:'2em'}}>
        <h1> Dashboard </h1>
        <Grid style={{margin:'2em'}}fluid>
          <Row>
          <Col md={9}>
          <Row>
            <Col md={6}>
              <div style={{ padding: "1em" }}>
                <h4> Deslocamentos </h4>
                <div className="tensao-container">
                  <Bar data={deslocationData} />
                </div>
              </div>
            </Col>
            <Col md={6}>
              <div style={{ padding: "1em" }}>
                <h4> Deformações </h4>
                <div className="tensao-container">
                  <Bar data={deformationData} />
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <div style={{ padding: "1em" }}>
                <h4> Tensões </h4>
                <div className="tensao-container">
                  <Line data={tensaoData} />
                </div>
              </div>
            </Col>
            <Col md={6}>
              <div style={{ padding: "1em" }}>
                <h4> Reações de Apoio </h4>
                <div className="tensao-container">
                  <Radar data={reactiosData} />
                </div>
              </div>
            </Col>
          </Row>
          </Col>
          <Col md={3}>
            <SideMenu 
              handlePropertieChange={this.props.handlePropertieChange}
              tolerance={this.props.state.tolerance}
              iterations={this.props.state.iterations}
              atualizar={this.props.atualizar}
              handleInputsModal={this.props.handleInputsModal}/>
          </Col>
        </Row>
        </Grid>
      </div>;
  }
}



export default Dashboard;
