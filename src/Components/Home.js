import React, { Component } from 'react';
import AccountBalance from "./AccountBalance";
import {Link} from "react-router-dom";

class Home extends Component {
  render() {
    return (
        <div>
          <img src="https://img.etimg.com/thumb/msid-71487585,width-300,imgsize-169788,resizemode-4/bank-getty.jpg" alt="bank"/>
          <h1>Bank of React</h1>
          <Link to="/userProfile">User</Link><br/>
          <Link to="/addCredit">Add credit</Link><br/>
          <Link to="/addDebit">Add debit</Link><br/>
          <AccountBalance accountBalance ={this.props.accountBalance} />
        </div>
    );
  }
}

export default Home;