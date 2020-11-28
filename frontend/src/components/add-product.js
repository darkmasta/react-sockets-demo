import React, { Component } from "react";
import ProductService from "../services/products.service";

export default class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.onChangeId = this.onChangeId.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.saveProduct = this.saveProduct.bind(this);
    this.newProduct = this.newProduct.bind(this);

    this.state = {
      id: null,
      name: "",
      published: false,

      submitted: false,
    };
  }

  onChangeId(e) {
    this.setState({
      id: e.target.value,
    });
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  onChangePrice(e) {
    this.setState({
      price: e.target.value,
    });
  }

  saveProduct() {
    var data = {
      id: this.state.id,
      name: this.state.name,
      price: this.state.price,
    };

    ProductService.create(data)
      .then((response) => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          published: response.data.published,

          submitted: true,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  newProduct() {
    this.setState({
      id: null,
      name: "",
      published: false,
      price: 0,

      submitted: false,
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newProduct}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="Id">Id</label>
              <input
                type="text"
                className="form-control"
                id="Id"
                required
                value={this.state.title}
                onChange={this.onChangeId}
                name="title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={this.state.description}
                onChange={this.onChangeName}
                name="name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                className="form-control"
                id="number"
                required
                value={this.state.price}
                onChange={this.onChangePrice}
                name="Price"
              />
            </div>

            <button onClick={this.saveProduct} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
