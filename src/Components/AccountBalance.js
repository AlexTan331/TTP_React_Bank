import React, {Component} from 'react';

class AccountBalance extends Component {
  render() {
    return (
        <div>           
          Balance: {this.props.accountBalance.toFixed(3)}  
        </div>
    );
  }
}

export default AccountBalance;