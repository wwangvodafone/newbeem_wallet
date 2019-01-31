import React, { Component } from 'react';
import classnames from 'classnames';
import Info from './Info';
import Account from './Account';
import Contractor from './Contractor';
import Finger from './Finger';

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
import 'bootstrap/dist/css/bootstrap.min.css'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: '1',
    };
  }
    toggle(tab) {
      if (this.state.activeTab !== tab) {
        this.setState({
          activeTab: tab
        });
      }
    }

  render() {
    return (
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
              Info
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              Account
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '3' })}
              onClick={() => { this.toggle('3'); }}
            >
              Deploy Contract
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '4' })}
              onClick={() => { this.toggle('4'); }}
            >
              Figure
            </NavLink>
          </NavItem>          
          <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1"> 
            <Info info />
          </TabPane>
          <TabPane tabId="2">
            <Account account />
          </TabPane>
          <TabPane tabId="3">
            <Contractor contractor />
          </TabPane>
          <TabPane tabId="4">
            <Finger finger />
          </TabPane>
        </TabContent>          
        </Nav>        
          

      </div>

    );
  }
}
export default App;