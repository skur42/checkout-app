import React, { Component } from 'react';

import './App.css';

class ReadLists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      refresh_data: [ 
        { "id": 9090, "name": "Item1", "price": 200, "discount": 10, "type": "fiction", "img_url": "https://place-hold.it/40.jpg" }, 
        { "id": 9091, "name": "Item2", "price": 250, "discount": 15, "type": "literature", "img_url": "https://place-hold.it/40.jpg" }, 
        { "id": 9092, "name": "Item3", "price": 320, "discount": 5, "type": "literature", "img_url": "https://place-hold.it/40.jpg" }, 
        { "id": 9093, "name": "Item4", "price": 290, "discount": 0, "type": "thriller", "img_url": "https://place-hold.it/40.jpg" }, 
        { "id": 9094, "name": "Item5", "price": 500, "discount": 25, "type": "thriller", "img_url": "https://place-hold.it/40.jpg" }, 
        { "id": 9095, "name": "Item6", "price": 150, "discount": 5, "type": "literature", "img_url": "https://place-hold.it/40.jpg" }, 
        { "id": 9096, "name": "Item7", "price": 700, "discount": 22, "type": "literature", "img_url": "https://place-hold.it/40.jpg" }, 
        { "id": 9097, "name": "Item8", "price": 350, "discount": 18, "type": "fiction", "img_url": "https://place-hold.it/40.jpg" } 
      ],
      setQuantity: localStorage.getItem('data') === null || localStorage.getItem('data') === undefined 
                      ? true : false,
      data: localStorage.getItem('data') === null || localStorage.getItem('data') === undefined ? [ 
        { "id": 9090, "name": "Item1", "price": 200, "discount": 10, "type": "fiction", "img_url": "https://place-hold.it/40.jpg" }, 
        { "id": 9091, "name": "Item2", "price": 250, "discount": 15, "type": "literature", "img_url": "https://place-hold.it/40.jpg" }, 
        { "id": 9092, "name": "Item3", "price": 320, "discount": 5, "type": "literature", "img_url": "https://place-hold.it/40.jpg" }, 
        { "id": 9093, "name": "Item4", "price": 290, "discount": 0, "type": "thriller", "img_url": "https://place-hold.it/40.jpg" }, 
        { "id": 9094, "name": "Item5", "price": 500, "discount": 25, "type": "thriller", "img_url": "https://place-hold.it/40.jpg" }, 
        { "id": 9095, "name": "Item6", "price": 150, "discount": 5, "type": "literature", "img_url": "https://place-hold.it/40.jpg" }, 
        { "id": 9096, "name": "Item7", "price": 700, "discount": 22, "type": "literature", "img_url": "https://place-hold.it/40.jpg" }, 
        { "id": 9097, "name": "Item8", "price": 350, "discount": 18, "type": "fiction", "img_url": "https://place-hold.it/40.jpg" } 
      ] : JSON.parse(localStorage.getItem('data'))
    }
  }

  componentDidMount() {
    var arr = this.state.data;
    if(this.state.setQuantity === true) {
      arr = this.state.data.map(function(el) {
        var o = Object.assign({}, el);
        o.quantity = 1;
        return o;
      })
    }
    this.setState({ data: arr, loading: false })
  }

  getTotal = () => {
    return this.getTotalAmount() - this.getDiscount() - this.getTypeDiscount();
  }

  getItemIndex = (id) => {
    for(let i = 0; i < this.state.data.length; i++) {
      if(parseInt(id) === parseInt(this.state.data[i].id)) {
        return i;
      }
    }
  }

  quantity = (id, action) => {
    var index = this.getItemIndex(id);
    var el = this.state.data[index];
    var data = this.state.data;
    if(action === -1) {
      if(el.quantity > 1) {
        data[index].quantity = data[index].quantity - 1;
        localStorage.setItem('data', JSON.stringify(data));
        this.setState({ data });
      }
      else {
        this.delete(id);
      }
    }
    else {
      data[index].quantity = data[index].quantity + 1;
      localStorage.setItem('data', JSON.stringify(data));
      this.setState({ data });
    }
  }

  delete = (id) => {
    var index = this.getItemIndex(id);
    var data = this.state.data;
    data.splice(index, 1);
    localStorage.setItem('data', JSON.stringify(data));
    this.setState({ data: data });
  }

  getTotalAmount = () => {
    var result = 0;
    var el = {};
    for(let i = 0; i < this.state.data.length; i++) {
      el = this.state.data[i];
      result = result + (el.quantity * el.price);
    }
    return result;
  }

  getDiscount = () => {
    var result = 0;
    var el = {};
    for(let i = 0; i < this.state.data.length; i++) {
      el = this.state.data[i];
      result = result + (el.quantity * el.discount);
    }
    return result;
  }

  getTypeDiscount = () => {
    var result = 0;
    var el = {};
    for(let i = 0; i < this.state.data.length; i++) {
      el = this.state.data[i];
      if(el.type === 'fiction') {
        result = result + (el.quantity * (el.price * .15));
      }
    }
    return result;
  }

  refresh = () => {
    this.setState({ loading: true });
    var arr = this.state.refresh_data.map(function(el) {
      var o = Object.assign({}, el);
      o.quantity = 1;
      return o;
    })
    this.setState({ data: arr, loading: false })
    localStorage.setItem('data', JSON.stringify(arr));
  }

  render() {
    if(this.state.loading) {
      return (
        <div>
        </div>
      )
    }
    return (
      <div className="home">
        <div className="header">
          <div>
            &lt;&nbsp;&nbsp; Order Summary
          </div>
        </div>
        <div className="cart">
          {this.state.data.length > 0 ? <>
            <div className="left-cart">
              <div className="item-head">
                <div className="item">
                  Items ({this.state.data.length})
                </div>
                <div className="quantity">
                  Qty
                </div>
                <div className="price">
                  Price
                </div>
              </div>
              {this.state.data.map(data => {
                if(data.quantity !== 0) {
                  return <div className="item-div" key={data.id}>
                    <div className="item-content">
                      <div>
                        <img src={data.img_url} alt="img"/>
                        {data.name}
                      </div>
                      <button onClick={() => this.delete(data.id)}>
                        X
                      </button>
                    </div>
                    <div className="quantity-content">
                      <button onClick={() => this.quantity(data.id, -1)}>-</button>
                      {data?.quantity}
                      <button onClick={() => this.quantity(data.id, 1)}>+</button>
                    </div>
                    <div className="price-content">
                      {`$ ${data.price * data.quantity}`}
                    </div>
                  </div>
                }
              })}
            </div>
            <div className="right-cart">
              <span>
                Total
              </span>
              <div>
                <div className="total-label">
                  Items ({this.state.data.length}) :
                </div>
                <div className="total-amount">
                  $ {this.getTotalAmount()}
                </div>
              </div>
              <div>
                <div className="total-label">
                  Discount :
                </div>
                <div className="total-amount">
                  $ -{this.getDiscount()}
                </div>
              </div>
              <div>
                <div className="total-label">
                  Type Discount :
                </div>
                <div className="total-amount">
                  $ -{this.getTypeDiscount()}
                </div>
              </div>
              <div className="order-total">
                <div className="total-label">
                  Order Total :
                </div>
                <div className="total-amount">
                  $ {this.getTotal()}
                </div>
              </div>
            </div>
          </> : <div className="refresh">
            <button onClick={this.refresh}>
              Refresh
            </button>
          </div>}
        </div>
      </div>
    );
  }
}

export default ReadLists;