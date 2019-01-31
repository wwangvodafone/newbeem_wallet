import React, { Component } from 'react';
import Web3 from 'web3';
import ipfsAPI from 'ipfs-http-client';
import logo from './images/newbeem.png'
import {
  Form,
  FormGroup,
 } from 'reactstrap';

class Finger extends Component {
    constructor(props) {
      super(props);
      this.state = {
        file: '',
        imagePreviewUrl: '',
        added_file_hash: ''
      };
      this._handleImageChange = this._handleImageChange.bind(this);
      this._handleSubmit = this._handleSubmit.bind(this);
      this.ipfsApi = ipfsAPI('localhost', '5001')
    }
  
    _handleSubmit(e) {
      e.preventDefault();
      // TODO: do something with -> this.state.file
      let reader = new FileReader();
      let file = this.state.file;
      reader.onloadend = () => {
        const ipfs = ipfsAPI('localhost', 5001) // Connect to IPFS
        const buf = Buffer.from(reader.result) // Convert data into buffer
        this.ipfsApi.add(buf, (err, result) => { // Upload buffer to IPFS
          if(err) {
            console.error(err)
            return
          }
          let url = `https://ipfs.io/ipfs/${result[0].hash}`
          console.log(`Url --> ${url}`)

          this.setState({ added_file_hash:url });
          console.debug("url=", this.state.added_file_hash);
        });
      }
  
      reader.readAsDataURL(file)
    }
  
    _handleImageChange(e) {
      e.preventDefault();
  
      let reader = new FileReader();
      let file = e.target.files[0];
  
      reader.onloadend = () => {
        this.setState({
          file: file,
          imagePreviewUrl: reader.result
        });
      }
  
      reader.readAsDataURL(file)
    }
  
    saveToIpfs = (reader) => {
      let ipfsId
      const buffer = Buffer.from(reader.result)
      this.ipfsApi.add(buffer)
      .then((response) => {
        console.log(response)
        ipfsId = response[0].hash
        console.log(ipfsId)
        this.setState({added_file_hash: ipfsId})
      }).catch((err) => {
        console.error(err)
      })
    }

    render() {
      let {imagePreviewUrl} = this.state;
      let $imagePreview = null;
      if (imagePreviewUrl) {
        $imagePreview = (<img src={imagePreviewUrl} />);
      }
  
      return (
        <div className="container">
          <img src={logo} alt="newbeem" width="200" height="80"/>        
          <Form onSubmit={this._handleSubmit}>
            <input type="file" onChange={this._handleImageChange} />
            <button type="submit" onClick={this._handleSubmit}>Upload Image</button>
          </Form>
          {$imagePreview}
          <Form>
          <FormGroup>
              <table>
                <tbody>
                  <tr>
                    <td class="color">{this.state.added_file_hash}</td>
                  </tr>
                </tbody>
              </table>
            </FormGroup>
          </Form>
        </div>
      )
    }
  
  }

  
 export default Finger;