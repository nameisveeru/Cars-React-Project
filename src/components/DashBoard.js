import React, { Component } from 'react';
import { Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { setRecipies } from '../actions';
import Modal from 'react-modal';


import ProductsList from './ProductsList.js';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class DashBoard extends Component{
  constructor() {
    super();

    this.state = {
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  componentDidMount()
  {
    const url = 'http://localhost:51633/api/Products/';

    fetch(url,{
      method: 'GET'
    }).then(response => response.json())
      .then(json =>
      this.props.setRecipies(json))
  }

  search(){
    const url = 'http://localhost:51633/api/Products/';

  fetch(url,{
    method: 'GET'
  }).then(response => response.json())
    .then(json =>
    this.props.setRecipies(json))
  }

onAddNew = () => {
  return (
    <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >

          <h2 ref={subtitle => this.subtitle = subtitle}>Edit Car</h2>
          <button onClick={this.closeModal}>close</button>
          <div>I am a modal</div>
          <form>
            <input />
            <button>tab navigation</button>
            <button>stays</button>
            <button>inside</button>
            <button>the modal</button>
          </form>
        </Modal>
  )
}

render(){
  return (
  <div>

      <Button bsStyle="danger" bsSize="small" className="new-record-btn" onClick={this.openModal}>Add New</Button>
      <ProductsList />
      </div>
  )
}
}

export default connect(null, { setRecipies })(DashBoard);
