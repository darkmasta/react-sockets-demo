import React, { Component } from "react";
import ProductService from "../services/products.service";

export default class Product extends Component {
  constructor(props) {
    super(props);
    this.onChangeId = this.onChangeId.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.getProduct = this.getProduct.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);

    this.state = {
      currentProduct: {
        id: null,
        name: null,
        category: [],
        price: 0,
      },
      message: "",
    };
  }

  componentDidMount() {
    this.getProduct(this.props.match.params.id);
  }

  onChangeId(e) {
    const id = e.target.value;

    this.setState(function (prevState) {
      return {
        currentProduct: {
          ...prevState.currentProduct,
          id: id,
        },
      };
    });
  }

  onChangePrice(e) {
    const price = e.target.value;

    this.setState(function (prevState) {
      return {
        currentProduct: {
          ...prevState.currentProduct,
          price: price,
        },
      };
    });
  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState((prevState) => ({
      currentProduct: {
        ...prevState.currentProduct,
        name: name,
      },
    }));
  }

  getProduct(id) {
    ProductService.get(id)
      .then((response) => {
        this.setState({
          currentProduct: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateProduct() {
    ProductService.update(
      this.state.currentProduct.id,
      this.state.currentProduct
    )
      .then((response) => {
        console.log(response.data);
        this.setState({
          message: "The product was updated successfully!",
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  deleteProduct() {
    ProductService.delete(this.state.currentProduct.id)
      .then((response) => {
        console.log(response.data);
        this.props.history.push("/products");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentProduct } = this.state;

    return (
      <div>
        {currentProduct ? (
          <div className="edit-form">
            <h4>Product</h4>
            <form>
              <div className="form-group">
                <label htmlFor="product">Id</label>
                <input
                  type="text"
                  className="form-control"
                  id="product"
                  value={currentProduct.id}
                  onChange={this.onChangeId}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={currentProduct.name}
                  onChange={this.onChangeName}
                />
              </div>

              <div className="form-group">
                <label htmlFor="price">Price</label>
                <input
                  type="text"
                  className="form-control"
                  id="number"
                  value={currentProduct.price}
                  onChange={this.onChangePrice}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Actions:</strong>
                </label>
              </div>
            </form>

            <button
              type="submit"
              className="badge badge-success mr-2"
              onClick={this.updateProduct}
            >
              Update
            </button>

            <button className="badge badge-danger" onClick={this.deleteProduct}>
              Delete
            </button>

            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Product...</p>
          </div>
        )}
      </div>
    );
  }
}
