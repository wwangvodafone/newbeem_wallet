import React, { Component } from 'react';
import Web3 from 'web3';
import logo from './images/newbeem.png'
import line from './images/line.png'
import {
  Alert,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Button,
  Row,
  Col,
  Form,
  FormText,
  FormGroup,
  Label,
  Input,
 } from 'reactstrap';

 import { Divider } from 'rsuite';

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountValue:'',
      accountRslt: '',
      balanceRslt: '',
      accountEthers: '',
      accountPasswd: '',
      accountBalance: 0
    };
    var accountText;
    this.inputValue
    const nodeAdd = 'http://192.157.241.6:8501'
    this.web3 = new Web3(new Web3.providers.HttpProvider('http://133.18.23.48:8545'));
    console.debug(this.web3.isConnected())
  }

  UpdateInputValue = (e) => {
    e.preventDefault();
    console.log("input field updated with "+e.target.value);
    const text = e.target.value;
    this.setState({ accountValue: text })
  }

  UpdateAccountEtherValue = (e) => {
    e.preventDefault();
    this.setState({ accountEthers: e.target.value })
  }

  UpdateAccountPassword = (e) => {
    e.preventDefault();
    this.setState({ accountPasswd: e.target.value })
  }

  CreateAccount = (e) => {
    e.preventDefault();
    console.debug(this.state.accountValue)
    var result = this.web3.personal.newAccount(this.state.accountValue)
    
    this.setState({ accountRslt: result })
    //var coinbase = this.web3.eth.coinbase
    this.web3.personal.unlockAccount(this.web3.eth.accounts[0], "wwangvodafone");
  }

  //onSetResult = (result) => {
    //  this.setState({ accountRslt: result })
  //}
  
  GetEthers = (e) => {
    e.preventDefault();
    console.debug(this.state.accountValue)
    console.debug(this.state.accountRslt)
    this.web3.personal.unlockAccount(this.state.accountRslt, this.state.accountValue);
    this.web3.eth.sendTransaction({from:this.web3.eth.accounts[0], to:this.web3.eth.accounts[this.web3.eth.accounts.length-1], value: this.web3.toWei(0.05, "ether")})
    //var sBalance = this.web3.eth.getBalance(this.state.accountRslt);
    this.web3.eth.getBalance(this.state.accountRslt, (error, balance) => {
      console.debug("balance:" + balance);
      this.setState({ balanceRslt: "OK" });
    });

    //console.debug("balance:" + sBalance);
    //this.setState({ balanceRslt: sBalance });
  }
  
  ShowEthers = (e) => {
    e.preventDefault();
    console.debug(this.state.accountEthers);
    console.debug(this.state.accountPasswd);

    this.web3.personal.unlockAccount(this.state.accountEthers, this.state.accountPasswd);
    this.web3.eth.getBalance(this.state.accountEthers, (error, balance) => {
      console.debug("balance:" + balance);

      this.setState({ accountBalance: Number(balance) });
    });
  }
  render () {
      return (
        <div className="container">
          <img src={logo} alt="newbeem" width="200" height="80"/>

          <Form onSubmit={this.CreateAccount}>         
              <div className="row">
                <div className="col-25">
                  <Label for="accountName">Account Key:</Label>
                </div>
                <div className="col-75">
                  <Input type="text" name="account" id="accountName" placeholder="Account Name" ref={node => {this.inputValue = node}} onChange={this.UpdateInputValue}/>
                </div>
              </div>
              <div className="row">
                <input type="submit" value="Create Account"/>
              </div>

            <FormGroup>
              <FormText color="muted">
                After creating the account,                                                                                            
                you must save the account information by yourself.
                If you lose the account, you can not recover it.
              </FormText>
            </FormGroup>
             <FormGroup>
              <table>
                <tbody>
                  <tr>
                    <td>Account:</td>
                    <td class="color">{this.state.accountRslt}</td>
                  </tr>
                </tbody>
              </table>
            </FormGroup>
          </Form>
          <img src={line} alt="line" width="800" height="20"/>
          <Form onSubmit={this.GetEthers}>
              <div class="row">
                <input type="submit" value="Get Ethers"/>
              </div>
              <div class="row5">
                <table>
                  <tbody>
                    <tr>
                      <td>Balance:</td>
                      <td class="color">{this.state.balanceRslt}</td>
                    </tr>
                  </tbody>
                </table>  
              </div>
  
          </Form>

          <img src={line} alt="line" width="800" height="20"/>
          <Form onSubmit={this.ShowEthers}>
            <FormGroup>
              <div class="row">
                <div class="col-25">
                  <Label for="accountEthersName">Account For Ethers Showing:</Label>
                </div>
                <div class="col-75">
                  <Input type="text" name="accountethers" id="accountEthersName" placeholder="Account For Ethers Showing" ref={node => {this.inputValue = node}} onChange={this.UpdateAccountEtherValue}/>
                </div>
              </div>
              <div class="row">
                <div class="col-25">
                  <Label for="accountpasswdName">Account Password:</Label>
                </div>
                <div class="col-75">
                  <Input type="text" name="accountpasswd" id="accountPasswdName" placeholder="Password For Account" ref={node => {this.inputValue = node}} onChange={this.UpdateAccountPassword}/>
                </div>
              </div>
            </FormGroup>
            <FormGroup>
              <div class="row">
                <input type="submit" value="Show Ethers"/>
              </div>
              <div class="row">
                <table>
                  <tbody>
                    <tr>
                      <td>Balance:</td>
                      <td>{this.state.accountBalance}</td>
                    </tr>
                  </tbody>
                </table> 
            </div>
            </FormGroup>          
          </Form>

        </div>  
      );
  }
}

export default Account;