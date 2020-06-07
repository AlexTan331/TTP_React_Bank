import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Axios from "axios";
import index, {
  Home,
  UserProfile,
  LogIn,
  AddCredit,
  AddDebit,
} from "./Components/index";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountBalance: 0,
      debitInfo: [],
      creditInfo: [],
      currentUser: {
        userName: "bob_loblaw",
        memberSince: "06-03-2010",
      },
    };
  }

  componentDidMount() {
    const debitURL = "https://moj-api.herokuapp.com/debits";
    Axios.get(debitURL)
      .then((response) => {
        const data = response.data;
        this.setState({ debitInfo: data });
        let total = this.state.accountBalance;
        data.forEach((element) => (total -= element.amount));
        this.setState({ accountBalance: total });
      })
      .catch((err) => console.log(err));

    const creditURL = "https://moj-api.herokuapp.com/credits";
    Axios.get(creditURL)
      .then((response) => {
        const data = response.data;
        this.setState({ creditInfo: data });
        let total = this.state.accountBalance;
        data.forEach((element) => {
          total += element.amount;
        });
        this.setState({ accountBalance: total });
      })
      .catch((err) => console.log(err));
  }

  mockLogIn = (logInInfo) => {
    const newUser = { ...this.state.currentUser };
    newUser.userName = logInInfo.userName;
    this.setState({ currentUser: newUser });
  };

  addCredit = (credit) => {
    let newCredit = [credit, ...this.state.creditInfo];
    this.setState({ creditInfo: newCredit });
    this.setState({
      accountBalance: this.state.accountBalance + parseInt(credit.amount),
    });
  };

  addDebit = (debit) => {
    let newDebit = [debit, ...this.state.debitInfo];
    this.setState({ debitInfo: newDebit });
    this.setState({ accountBalance: this.state.accountBalance - debit.amount });
  };

  render() {
    const HomeComponent = () => (
      <Home accountBalance={this.state.accountBalance} />
    );
    const UserProfileComponent = () => (
      <UserProfile
        userName={this.state.currentUser.userName}
        memberSince={this.state.currentUser.memberSince}
      />
    );
    const LogInComponent = () => (
      <LogIn
        user={this.state.currentUser}
        mockLogIn={this.mockLogIn}
        {...this.props}
      />
    );
    const AddCreditComponent = () => (
      <AddCredit
        balance={this.state.accountBalance}
        addCredit={this.addCredit}
        creditInfo={this.state.creditInfo}
      />
    );
    const AddDebitComponent = () => (
      <AddDebit
        balance={this.state.accountBalance}
        addDebit={this.addDebit}
        debitInfo={this.state.debitInfo}
      />
    );

    return (
      <Router>
        <div>
          <Route exact path="/" render={HomeComponent}></Route>
          <Route
            exact
            path="/userProfile"
            render={UserProfileComponent}
          ></Route>
          <Route exact path="/LogIn" render={LogInComponent} />
          <Route exact path="/AddCredit" render={AddCreditComponent}></Route>
          <Route exact path="/AddDebit" render={AddDebitComponent}></Route>
        </div>
      </Router>
    );
  }
}

export default App;
