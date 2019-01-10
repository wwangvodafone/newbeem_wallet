import React, { Component } from 'react';
import Web3 from 'web3';
import {
  Alert,
  Row,
  Col,
  Form,
 } from 'reactstrap';

 class Info extends Component {
    constructor(props) {
        super(props);
        this.state = {
          mining: false,
          node: '',
          hashrate: '',
          peerCount: '',
          isConnected: false,
          accountRslt: '',
          balanceRslt: 0,
          minerStart: '',
          minerStop: ''
        };
        const nodeAdd = 'http://192.157.241.6:8501'
        this.web3 = new Web3(new Web3.providers.HttpProvider('http://133.18.23.48:8545'));
        console.debug(this.web3.isConnected())
      }

      componentWillMount() {
        console.debug(this.web3.version)
        if(this.web3 && this.web3.isConnected()) {
          this.setState({isConnected: true});
          this.setState({node: this.currentProvider()})
          this.setState({mining: this.isMining()})
          this.setState({hashrate: this.currentHashrate()});
          this.setState({peerCount: this.currentPeerCount()});
          console.debug(this.state.node)
        }
      }
    //接続先ノードの取得
    currentProvider() {
        return this.web3.currentProvider.host;
      }
    
      //接続先ノードのマイニング状態の取得
      //マイニング中であればtrue、そうでなければfalse
      isMining() {
        console.debug("ismining:" + this.web3.eth.mining)
        return this.web3.eth.mining;
      }
    
      //接続先ノードのマイニングのハッシュレートを取得
      currentHashrate() {
        console.debug("hashrate:" + this.web3.eth.hashrate)
        return this.web3.eth.hashrate;
      }
    
      //接続先ノードのピア数の取得
      currentPeerCount() {
        return this.web3.net.peerCount;
      }

    render () {
        return (
            <div>
                <Form>
                <Row>
                <Col>
                    <Alert color="light">
                    
                    </Alert>              
                </Col>
                </Row>
                <table className="table table-striped" >
                <thead>
                    <tr>
                    <th>Item</th>
                    <th>Value</th>
                    </tr>
                </thead>
                <tbody>     
                    <tr className="success">
                    <td>Node</td>
                    <td>{this.state.node}</td>
                    </tr>
                    <tr className="danger">
                    <td>Is Mining?</td>
                    <td>{this.state.mining?'Ture':'False'}</td>
                    </tr>
                    <tr className="info">
                    <td>HashRate</td>
                    <td>{this.state.hashrate}</td>
                    </tr>
                    <tr className="warning">
                    <td>Peer Count</td>
                    <td>{this.state.peerCount}</td>
                    </tr>
                </tbody>
                </table>
                </Form>
            </div>
        );
    }
 }

 export default Info;