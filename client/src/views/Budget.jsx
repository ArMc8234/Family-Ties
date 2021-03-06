import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  // FormGroup,
  // ControlLabel,
  // FormControl,
  Table
} from "react-bootstrap";
import { Link } from "react-router-dom";

import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import { UserCard } from "components/UserCard/UserCard.jsx";
import Button from "components/CustomButton/CustomButton.jsx";

import avatar from "assets/img/faces/face-3.jpg";
import API from "utils/API";

export default class Budget extends Component {
  constructor() {
    super();
    this.state = {
      bills: [],
      creditor: " ",
      amount: " ",
      dueDate: " "
    };
  }

  componentDidMount() {
    this.loadBills();
  }

  loadBills = () => {
    API.getBills()
      .then(res =>
        this.setState({
          bills: res.data,
          creditor: "",
          amount: "",
          dueDate: ""
        })
      )
      .catch(err => console.log(err));
  };

  deleteBill = id => {
    API.deleteBill(id)
      .then(res => this.loadBills())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { id, value } = event.target;
    this.setState({
      [id]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    API.saveBill({
      creditor: this.state.creditor,
      amount: this.state.amount,
      dueDate: this.state.dueDate
    })
      .then(res => this.loadBills())
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={8}>
              <Card
                title="Add New Bill"
                content={
                  <form onSubmit={this.handleFormSubmit}>
                    <FormInputs
                      ncols={["col-md-4", "col-md-4", "col-md-4"]}
                      properties={[
                        {
                          label: "Creditor",
                          id: "creditor",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Company Name",
                          value: this.state.creditor,
                          onChange: this.handleInputChange
                        },
                        {
                          label: "Amount",
                          id: "amount",
                          type: "numberDecimal",
                          bsClass: "form-control",
                          placeholder: "0.00",
                          value: this.state.amount,
                          onChange: this.handleInputChange
                        },
                        {
                          label: "Due Date",
                          id: "dueDate",
                          type: "Date",
                          bsClass: "form-control",
                          placeholder: "MM/DD/YY",
                          value: this.state.dueDate,
                          onChange: this.handleInputChange
                        }
                      ]}
                    />
                    <Button
                      bsStyle="info"
                      pullRight
                      fill
                      type="submit"
                      disabled={!this.state.creditor}
                    >
                      Add Bill!
                    </Button>
                    <div className="clearfix" />
                  </form>
                }
              />
            </Col>
            <Col md={4}>
              <UserCard
                bgImage="https://ununsplash.imgix.net/photo-1431578500526-4d9613015464?fit=crop&fm=jpg&h=300&q=75&w=400"
                avatar={avatar}
                name="Mike Andrew"
                userName="michael24"
                description={
                  <span>
                    "Lamborghini Mercy
                    <br />
                    Your chick she so thirsty
                    <br />
                    I'm in that two seat Lambo"
                  </span>
                }
                socials={
                  <div>
                    <Button simple>
                      <i className="fa fa-facebook-square" />
                    </Button>
                    <Button simple>
                      <i className="fa fa-twitter" />
                    </Button>
                    <Button simple>
                      <i className="fa fa-google-plus-square" />
                    </Button>
                  </div>
                }
              />
            </Col>
          </Row>
        </Grid>
        <Row>
          <Col md={12}>
            <Grid fluid>
              <Row>
                <Col md={12}>
                  <Card
                    plain
                    title="Striped Table with Hover"
                    category="Here is a subtitle for this table"
                    ctTableFullWidth
                    ctTableResponsive
                    content={
                      this.state.bills.length ? (
                        <Table hover>
                          <thead>
                          <tr>
                            <th>Creditor</th>
                            <th>Amount</th>
                            <th>Due Date</th>
                            <th></th>
                          </tr>
                          <tr></tr>
                          </thead>
                          <tbody>
                          {this.state.bills.map(bill => (
                            <tr key={bill._id}>
                              <td>
                                <Link to={"api/bills/" + bill._id}>
                                  <strong>{bill.creditor}</strong>
                                </Link>
                              </td>
                              <td>{bill.amount}</td>
                              <td>{bill.dueDate}</td>
                              <td>
                                <Button
                                  bsStyle="danger"
                                  simple type="button" bsSize="xs"
                                  onClick={() => this.deleteBill(bill._id)}
                                >
                                <i className="fa fa-times" />
                                </Button>
                              </td>
                            </tr>
                          ))}
                          </tbody>
                        </Table>
                      ) : (
                        <h3>No Results to Display</h3>
                      )
                    }
                  />
                </Col>
              </Row>
            </Grid>
          </Col>
        </Row>
      </div>
    );
  }
}
