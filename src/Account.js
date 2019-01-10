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

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountValue:'',
      accountRslt: '',
      balanceRslt: 0,
    };
    this.inputValue
    const nodeAdd = 'http://192.157.241.6:8501'
    this.web3 = new Web3(new Web3.providers.HttpProvider('http://133.18.23.48:8545'));
    console.debug(this.web3.isConnected())
  }

  updateInputValue(evt){
    console.log("input field updated with "+evt.target.value);
    this.inputValue = evt.target.value;
  }

  CreateAccount = (e) => {
    e.preventDefault();
    console.debug(this.state.accountValue)
    //var result = this.web3.personal.newAccount(accountValue)
    
    //this.setState({ accountRslt: result })
    var coinbase = this.web3.eth.coinbase
    console.debug("conibase:" + coinbase)
    
    var sBalance = this.web3.eth.getBalance(coinbase)
    console.debug("balance:" + sBalance)
 
    //this.setState({ balanceRslt: sBalance }) 
  }

  onSetResult = (result) => {
      this.setState({ accountRslt: result })
  }
  
  GetEthers = (e) => {
    e.preventDefault();
    console.debug(this.state.accountValue)
    console.debug(this.state.accountRslt)
    this.web3.personal.unlockAccount(this.state.accountRslt, this.state.accountValue);
    this.web3.eth.sendTransaction({from: this.web3.eth.accounts[0], to: this.state.accountRslt, value: this.web3.toWei(5, "ether")}) 
    var nAccount = this.web3.eth.accounts.length;
    var sBalance = this.web3.eth.getBalance(this.state.accountRslt);
    console.debug("balance:" + sBalance);
    this.onSetResult({ balanceRslt: sBalance });
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
              <Input type="text" name="account" id="accountName" placeholder="Account Name" ref={node => {this.inputValue = node}} onChange={this.updateInputValue}/>
            </FormGroup>
            <FormGroup>
              <FormText color="muted">
                After creating the account,                                                                                            
                you must save the account information by yourself.
                If you lose the account, you can not recover it.
              </FormText>
            </FormGroup>
            <Button color="primary" >Create Account</Button>
            <table>
              <tbody>
                <tr>
                  <td>Account:</td>
                  <td>{this.state.accountRslt}</td>
                </tr>
                <tr>
                  <Form onSubmit={this.GetEthers}>
                    <formGroup>
                        <Button color="primary">Get Ethers</Button>
                    </formGroup>
                  </Form>
                  <td>Balance:</td>
                  <td>{this.state.balanceRslt}</td>
                </tr>
              </tbody>
            </table>
          </Form>
        </div>  
      );
  }
}

export default Account;