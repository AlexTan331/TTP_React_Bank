import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class AddCredit extends Component {
  constructor() {
    super();
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
    const updatedCredit = { ...this.state.info };
    const inputField = e.target.name;
    const inputValue = e.target.value;
    updatedCredit[inputField] = inputValue;

    this.setState({ info: updatedCredit });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addCredit(this.state.info);
    this.setState({ redirect: true });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }

    let display = this.props.creditInfo.map((debit) => {
      return (
        <div className="info">
          <ul>
            <li>Description: {debit.description}</li>
            <li>Amount: {debit.amount}</li>
            <li>Date: {debit.date}</li>
          </ul>
        </div>
      );
    });

    return (
      <>
        <div>
          <h1>Add Your Credit Amount</h1>
          <form onSubmit={this.handleSubmit}>
            <div>
              <label htmlFor="amount">Credit Amount</label>
              <input type="number" name="amount" value={this.state.info.amount} onChange={this.handleChange} />
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
            <button disabled={!(this.state.info.amount && this.state.info.description)}>Confirm</button>
          </form>
        </div>
        {display}
      </>
    );
  }
}

export default AddCredit;
