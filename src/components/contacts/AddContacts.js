import React, { Component } from "react";
import { Consumer } from "../../context";
import TextInputGroup from "../layout/TextGroup";
import { v4 as uuid } from "uuid";
import axios from "axios";

class AddContacts extends Component {
  state = {
    name: "",
    email: "",
    phone: "",
    errors: {},
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = async (dispatch, e) => {
    e.preventDefault();

    const { name, email, phone } = this.state;

    //Check for Errors

    if (name === "") {
      this.setState({
        errors: {
          name: "Name is Required",
        },
      });
      return;
    }

    if (email === "") {
      this.setState({
        errors: {
          email: "Email is Required",
        },
      });
      return;
    }

    if (phone === "") {
      this.setState({
        errors: {
          phone: "phone is Required",
        },
      });
      return;
    }

    const newContact = {
      name,
      email,
      phone,
    };

    const res = await axios.post(
      `https://jsonplaceholder.typicode.com/users/`,
      newContact
    );
    dispatch({ type: "ADD_CONTACT", payload: res.data });

    this.setState({
      name: "",
      email: "",
      phone: "",
      erros: {},
    });

    this.props.history.push("/");
  };

  render() {
    const { name, email, phone, errors } = this.state;
    return (
      <Consumer>
        {(value) => {
          const { dispatch } = value;
          return (
            <div className="card mb-5">
              <div className="card-header">Add Contact</div>
              <div className="card-body">
                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                  <TextInputGroup
                    label="Name"
                    name="name"
                    placeholder="Enter Name"
                    value={name}
                    onChange={this.onChange}
                    error={errors.name}
                  />
                  <TextInputGroup
                    type="email"
                    label="Email"
                    name="email"
                    placeholder="Enter Your Email"
                    value={email}
                    onChange={this.onChange}
                    error={errors.email}
                  />

                  <TextInputGroup
                    label="phone"
                    name="phone"
                    placeholder="Enter Your Phone Number"
                    value={phone}
                    onChange={this.onChange}
                    error={errors.phone}
                  />

                  <div className="row justify-content-center">
                    <input
                      type="submit"
                      value="Add Contact"
                      className="btn btn-outline-info btn-lg"
                    />
                  </div>
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default AddContacts;
