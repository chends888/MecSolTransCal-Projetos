import React, { Component } from "react";
import { FormControl, Button, Grid, Row, Col } from "react-bootstrap";
import { Bar, Line, Radar } from "react-chartjs-2";


class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const deslocationData= {
        labels: ["Node 1", "Node 2", "Node 3"],
        datasets: [{
        label: "Deslocamentos",
        backgroundColor: "rgb(102, 0, 171)",
        borderColor: "rgb(102, 0, 171)",
        data: [30, 40, 25],
        }]
    };
    const deformationData= {
        labels: ["Element 1", "Element 2", "Element 3"],
        datasets: [{
        label: "Deformações",
        backgroundColor: "rgb(230, 88, 58)",
        borderColor: "rgb(230, 88, 58)",
        data: [1230, 483, 1115],
        }]
    };
    const tensaoData= {
        labels: ["Element 1", "Element 2", "Element 3"],
        datasets: [{
        label: "Tensões",
        backgroundColor: "rgb(0, 236, 255)",
        borderColor: "rgb(0, 236, 255)",
        data: [1500, 300, 800],
        }]
    };
    const reactiosData= {
        labels: ["R1", "R2", "R3"],
        datasets: [{
        label: "Reações",
        backgroundColor: "rgb(0, 0, 0)",
        borderColor: "rgb(230, 88, 58)",
        data: [1500, 300, 800],
        }]
    };
    return <div style={{margin:'2em'}}>
        <h1> Dashboard </h1>
        <Grid style={{margin:'2em'}}fluid>
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
        </Grid>
      </div>;
  }
}



export default Dashboard;
