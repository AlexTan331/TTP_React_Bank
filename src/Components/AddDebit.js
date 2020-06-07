import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class AddDebit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: {
        id: "",
        description: "",
        amount: 0,
        date: "",
      },
      redirect: false,
    };
  }

  handleChange = (e) => {
    const updatedDebit = { ...this.state.info };
    const inputField = e.target.name;
    const inputValue = e.target.value;
    updatedDebit[inputField] = inputValue;
    let date = new Date();
    updatedDebit.date = date.toISOString();
    let id = Math.random().toString(36).slice(2);
    updatedDebit.id = id;
    this.setState({ info: updatedDebit });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addDebit(this.state.info);
    this.setState({ redirect: true });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }

    let display = this.props.debitInfo.map((debit) => {
      return (
        <div className="info" key={debit.id}>
          <ul>
            <li>Description: {debit.description}</li>
            <li>Amount: {debit.amount}</li>
            <li>Date: {debit.date.toString()}</li>
          </ul>
        </div>
      );
    });

    return (
      <>
        <div>
          <h1>Add Your Debit Amount</h1>
          <form onSubmit={this.handleSubmit}>
            <div>
              <label htmlFor="amount">Debit Amount</label>
              <input
                type="number"
                name="amount"
                value={this.state.info.amount}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <input
                type="text"
                name="description"
                value={this.state.info.description}
                onChange={this.handleChange}
              />
            </div>
            <button
              disabled={
                !(this.state.info.amount && this.state.info.description)
              }
            >
              Confirm
            </button>
          </form>
        </div>
        {display}
      </>
    );
  }
}

export default AddDebit;
