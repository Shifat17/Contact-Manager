import React, { Component } from "react";
import { Consumer } from "../../context";
import TextInputGroup from "../layout/TextGroup";
import axios from "axios";

class EditContacts extends Component {
  state = {
    name: "",
    email: "",
    phone: "",
    errors: {},
  };

  async componentDidMount() {
    const { id } = this.props.match.params;
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    const contact = res.data;

    this.setState({
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
    });
  }

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

    const updContact = {
      name,
      email,
      phone,
    };

    const { id } = this.props.match.params;

    const res = await axios.put(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      updContact
    );
    dispatch({ type: "UPDATE_CONTACT", payload: res.data });

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
              <div className="card-header">Edit Contact</div>
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
                      value="Edit Contact"
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

export default EditContacts;
