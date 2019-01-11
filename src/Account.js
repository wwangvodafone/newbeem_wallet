import React, { Component } from 'react';
import Web3 from 'web3';
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
        <div>
            <Row>
            <Col>
              <Alert color="light">
                
              </Alert>              
            </Col>
          </Row>
          <Form onSubmit={this.CreateAccount}>
            <FormGroup>
              <Label for="accountName">Account Key</Label>
              <Input type="text" name="account" id="accountName" placeholder="Account Name" ref={node => {this.inputValue = node}} onChange={this.UpdateInputValue}/>
            </FormGroup>
            <FormGroup>
              <FormText color="muted">
                After creating the account,                                                                                            
                you must save the account information by yourself.
                If you lose the account, you can not recover it.
              </FormText>
            </FormGroup>
            <Button color="primary" >Create Account:</Button>
            <FormGroup>
              <table>
                <tbody>
                  <tr>
                    <td>Account:</td>
                    <td>{this.state.accountRslt}</td>
                  </tr>
                </tbody>
              </table>
            </FormGroup>
          </Form>

          <Form onSubmit={this.GetEthers}>
            <FormGroup>
              <Button color="primary">Get Ethers</Button>
              <table>
                <tbody>
                  <tr>
                    <td>Balance:</td>
                    <td>{this.state.balanceRslt}</td>
                  </tr>
                </tbody>
              </table>  
            </FormGroup>         
          </Form>
          <Form onSubmit={this.ShowEthers}>
            <FormGroup>
              <Label for="accountEthersName">Account For Ethers Showing:</Label>
              <Input type="text" name="accountethers" id="accountEthersName" placeholder="Account For Ethers Showing" ref={node => {this.inputValue = node}} onChange={this.UpdateAccountEtherValue}/>
              <Label for="accountpasswdName">Account Password:</Label>
              <Input type="text" name="accountpasswd" id="accountPasswdName" placeholder="Password For Account" ref={node => {this.inputValue = node}} onChange={this.UpdateAccountPassword}/>
            </FormGroup>
            <FormGroup>
              <Button color="primary">Show Ethers</Button>
              <table>
                <tbody>
                  <tr>
                    <td>Balance:</td>
                    <td>{this.state.accountBalance}</td>
                  </tr>
                </tbody>
              </table> 
            </FormGroup>          
          </Form>
        </div>  
      );
  }
}

export default Account;