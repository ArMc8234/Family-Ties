import React, { Component } from "react";
import API from "utils/API"
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import { UserCard } from "components/UserCard/UserCard.jsx";
import Button from "components/CustomButton/CustomButton.jsx";

import avatar from "assets/img/faces/face-3.jpg";

export default  class UserProfile extends Component {
  state = {
    users: [],
    groupName: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    country: "",
    zipCode: "",
    aboutMe: ""
  };

  componentDidMount() {
    this.loadProfiles();
  }

  loadProfiles = () => {
    API.getProfiles()
      .then(res =>
        this.setState({ profiles: res.data, username: "", email: "", groupName: "", firstName: "", lastName: "", address: "", city: "", country: "", zipCode: "", aboutMe:"", picture: "" })
      )
      .catch(err => console.log(err));
  };

  deleteProfile = id => {
    API.deleteProfile(id)
      .then(res => this.loadProfiles())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title && this.state.author) {
      API.saveProfile({
        username: this.state.username,
        email: this.state.email,
        groupName:  this.state.groupName,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        city: this.state.city,
        country: this.state.country,
        zipCode: this.state.zipCode,
        aboutMe: this.state.aboutMe,
        picture: this.state.picture
      })
        .then(res => this.loadProfiles())
        .catch(err => console.log(err));
    }
  };


  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={8}>
              <Card
                title="Edit Profile"
                content={
                  <form>
                    <FormInputs
                      ncols={["col-md-5", "col-md-3", "col-md-4"]}
                      properties={[
                        {
                          label: "Group (disabled)",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Group Name",
                          defaultValue: "Smith Family",
                          disabled: true
                        },
                        {
                          label: "Username",
                          name: "username",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Username",
                          defaultValue: "michael23",
                          onChange: this.handleInputChange
                        },
                        {
                          label: "Email address",
                          name: "email",
                          type: "email",
                          bsClass: "form-control",
                          placeholder: "Email",
                          onChange: this.handleInputChange
                        }
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-6", "col-md-6"]}
                      properties={[
                        {
                          label: "First name",
                          name: "firstName",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "First name",
                          defaultValue: "Mike",
                          onChange: this.handleInputChange
                        },
                        {
                          label: "Last name",
                          name: "lastName",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Last name",
                          defaultValue: "Andrew",
                          onChange: this.handleInputChange
                        }
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-12"]}
                      properties={[
                        {
                          label: "Adress",
                          name: "address",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Home Adress",
                          defaultValue:
                            "Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09",
                          onChange: this.handleInputChange
                        }
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-4", "col-md-4", "col-md-4"]}
                      properties={[
                        {
                          label: "City",
                          name: "city",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "City",
                          defaultValue: "Mike",
                          onChange: this.handleInputChange
                        },
                        {
                          label: "Country",
                          name: "country",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Country",
                          defaultValue: "Andrew",
                          onChange: this.handleInputChange
                        },
                        {
                          label: "Postal Code",
                          name: "zipCode",
                          type: "number",
                          bsClass: "form-control",
                          placeholder: "ZIP Code",
                          onChange: this.handleInputChange
                        }
                      ]}
                    />

                    <Row>
                      <Col md={12}>
                        <FormGroup controlId="formControlsTextarea">
                          <ControlLabel>About Me</ControlLabel>
                          <FormControl
                            rows="5"
                            componentClass="textarea"
                            bsClass="form-control"
                            placeholder="Here can be your description"
                            defaultValue="Lamborghini Mercy, Your chick she so thirsty, I'm in that two seat Lambo."
                            onChange={this.handleInputChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <label>Profile Picture</label>
                    <input type="file" label="profile picture" value={this.state.picture}/>

                    <Button bsStyle="primary" pullRight fill type="submit" onSubmit={this.handleFormSubmit}>
                      Update Profile
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
      </div>
    );
  }
}
