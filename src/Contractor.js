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
import { SelectPicker } from 'rsuite';

 class Contractor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contractBin:'',
      contractAbi: '',
      deployAddress: '',
      accountDeploy: '',
      accountDeployPasswd: '',
      accountDeployBalance: 0
    };
    this.inputValue
    const nodeAdd = 'http://192.157.241.6:8501'
    this.web3 = new Web3(new Web3.providers.HttpProvider('http://133.18.23.48:8545'));
    console.debug(this.web3.isConnected())
  }

  UpdateContractBinary = (e) => {
    e.preventDefault();
    this.setState({ contractBin: e.target.value })
  }

  UpdateAccountValue = (e) => {
    e.preventDefault();
    this.setState({ accountDeploy: e.target.value })
  }

  UpdateAccountPassword = (e) => {
    e.preventDefault();
    this.setState({ accountDeployPasswd: e.target.value })
  }

  DeployContract = (e) => {
    e.preventDefault();
    console.debug(this.state.contractBin);
    console.debug(this.state.accountDeploy);
    console.debug(this.state.accountDeployPasswd)
    this.web3.personal.unlockAccount(this.state.accountDeploy, this.state.accountDeployPasswd);

    var binary = "0x" + this.state.contractBin;
    this.web3.eth.sendTransaction({ from: this.state.accountDeploy, data: binary, gas: 500e3 }, (error, tx) => {
      if (error) {
        console.debug(error);
        this.setState({ deployAddress: "Cannot deploy..." });
      }
      else {
        const sleep = (milliseconds) => {
          return new Promise(resolve => setTimeout(resolve, milliseconds))
        }
        sleep(20000).then(() => {
          var hash = tx;
          console.debug(hash);
          var address = this.web3.eth.getTransactionReceipt(hash);
          console.debug(address);
          if (address != null) {
            address = address.contractAddress;
            this.setState({ deployAddress: address });
          }
          else {
            this.setState({ deployAddress: "mining..."});
          }          
        })

        
      }
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
        <Form onSubmit={this.DeployContract}>
          <FormGroup>
            <Label for="Contract Binary">Contract Binary</Label>
            <Input type="text" name="binary" id="binary" placeholder="Contract Binary" ref={node => {this.inputValue = node}} onChange={this.UpdateContractBinary}/>
            <Label for="accountEthersName">Account Deploy Contract:</Label>
            <Input type="text" name="accountethers" id="accountEthersName" placeholder="Account For Deploy Contract" ref={node => {this.inputValue = node}} onChange={this.UpdateAccountValue}/>
             <Label for="accountpasswdName">Account Password:</Label>
             <Input type="text" name="accountpasswd" id="accountPasswdName" placeholder="Password For Account" ref={node => {this.inputValue = node}} onChange={this.UpdateAccountPassword}/> 
          </FormGroup>
          <Button color="primary" >Deploy Contract:</Button>
          <table>
                <tbody>
                  <tr>
                    <td>Result:</td>
                    <td>{this.state.deployAddress}</td>
                  </tr>
                </tbody>
              </table> 
        </Form>
      </div>
    )
  }
 }

 export default Contractor;