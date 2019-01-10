import React, { Component } from 'react';
import classnames from 'classnames';
import Info from './Info';
import Account from './Account';

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
          <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1"> 
            <Info info />
          </TabPane>
          <TabPane tabId="2">
            <Account account />
          </TabPane>
        </TabContent>          
        </Nav>        
          

      </div>

    );
  }
}
export default App;