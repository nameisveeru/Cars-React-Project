import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Button, Glyphicon  } from 'react-bootstrap';
import { setRecipies} from '../actions';

import Modal from 'react-modal';

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

class ProductsList extends Component{
  onClickEdit= (product) => {
    this.openModal(product);
  }

  onClickDelete = (id) => {
  const url = 'http://localhost:51633/api/Products/'+ id;

  return fetch(url,{
    method: 'DELETE',
    mode: 'CORS',
        headers: {
            'Content-Type': 'application/json'
        }
  }).then(response => response.json())
    .then(json =>

    this.props.setRecipies(json))
    .then(z => console.log(z))
    .catch(err => err);

  }

  onClickSave = (abc) => {

    const product = {
      ProductName: "Gore",
      ProductId: 3,
      ProductMake: "dfdsfs",
      ProductYear: 1991,
      ProductModel: "dsdfsdf"
    }
    const url = 'http://localhost:51633/api/Products/1';

  return fetch(url,{
    method: 'PUT',
        body: JSON.stringify(product),
        headers: {
            'Content-Type': 'application/json'
        }
  }).then(response => response.json())
    .then(json =>

    this.props.setRecipies(json))
    .then(z => console.log(z))
    .catch(err => err);

  }


  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: this.showModal || false,
      productId: props.productId || 0,
      abc : ""
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.product={};
  }

  openModal(product) {
    this.product = product;
    this.setState({modalIsOpen: true,});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }
handleChange=(event)=> {
  this.setState({
    value: event.target.value
  });
}

  render(){
    return(
      <div>
      <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >

            <h2 ref={subtitle => this.subtitle = subtitle}>Edit Car</h2>

            <form>
              <div>productName : <input type="text" defaultValue={this.state.value || this.product.productName} value={this.state.value} onChange={this.handleChange} /></div>

              <div>productMake :   <input value={this.product.productMake} /></div>

              <div>productModel :  <input value={this.product.productModel} /></div>

              <div>productYear :   <input value={this.product.productYear} /></div>

              <div>
              <button onClick={this.onClickSave}>Save</button>
              <button onClick={this.closeModal}>Cancel</button>
              </div>

            </form>
          </Modal>
      <div className="cars-container">
      <Table striped bordered condensed hover className="cars-table">
      <thead>
          <tr>
            <th>Manufacturer</th>
            <th>Make</th>
            <th>Model</th>
            <th>Year</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
      </thead>
      <tbody>
        {
          this.props.recipies.map((product, index) => {
          return (
            <tr key={index}>
            <td>
            {product.productName}
            </td>
            <td>
            {product.productMake}
            </td>
            <td>
            {product.productModel}
            </td>
            <td>
            {product.productYear}
            </td>
            <td>
            <Button bsStyle="warning" bsSize="small" onClick={() => this.onClickEdit(product)}>
              <Glyphicon glyph="pencil"></Glyphicon>
            </Button>
            </td>
            <td>
            <Button bsStyle="danger" bsSize="small" onClick={() => this.onClickDelete(product.productId)}>
              <Glyphicon glyph="trash"></Glyphicon>
            </Button>
            </td>
            </tr>
          )
        })
      }
      </tbody>
      </Table>
      </div>
      </div>
    )
  }
}

function mapStateToProps(state){
  console.log()
  return state;
}

export default connect(mapStateToProps, null)(ProductsList);
