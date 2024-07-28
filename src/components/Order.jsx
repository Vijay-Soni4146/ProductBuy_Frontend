import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
// import FormatPrice from "./helpers/FormatPrice";
import { useEffect, useState } from "react";
import { getOrders } from "../store/actions/carts";
import { getUser } from "../Auth";
import { clearCart } from "../store/reducers/carts";

const Order = () => {
  const [cleanupDone, setCleanupDone] = useState(false);
  const [latestCreatedAt, setLatestCreatedAt] = useState("");
  const order = useSelector((state) => state.carts.orders);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  useEffect(() => {
    // console.log("Effect running");
    if (!cleanupDone && localStorage.getItem("paymentInProgress") === "true") {
      dispatch(clearCart());
      localStorage.removeItem("VijayCart");
      localStorage.removeItem("paymentInProgress");
      setCleanupDone(true);
      console.log("Payment successful and cart cleared.");
    }
  }, [cleanupDone]);

  const user = getUser();

  function getLatestCreatedAt(data) {
    const latest = data.reduce((latestItem, currentItem) => {
      const latestDate = new Date(latestItem.createdAt);
      const currentDate = new Date(currentItem.createdAt);

      return currentDate > latestDate ? currentItem : latestItem;
    });

    return latest.createdAt;
  }

  useEffect(() => {
    if (order.length > 0) {
      const latest = getLatestCreatedAt(order);
      setLatestCreatedAt(latest);
    }
  }, [order]);

  const date = moment(latestCreatedAt);

  const formattedDate = date.format("MMM Do, YYYY");

  const allProducts = order.flatMap((order) => order.products);

  let totalAmount =
    allProducts.length > 0
      ? allProducts.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        )
      : 0;

  totalAmount = totalAmount / 100;

  return (
    <Wrapper>
      <div className="container">
        <h2 className="text-charcoal hidden-sm-down">Your Orders</h2>
        <h5 className="text-charcoal hidden-md-up">Your Orders</h5>
        <div className="orders">
          <div className="list-group">
            <div className="list-group-item bg-snow">
              <div className="order-details">
                <div className="order-info">
                  <h6 className="text-charcoal mb-0 fs-14">Order Number</h6>
                  <a href="" className="text-pebble mb-0">
                    #A915AFLE4FO
                  </a>
                </div>
                <div className="order-info">
                  <h6 className="text-charcoal mb-0 fs-14">Date</h6>
                  <p className="text-pebble mb-0">
                    {formattedDate ? formattedDate : "Aug 5th, 2024"}
                  </p>
                </div>
                <div className="order-info">
                  <h6 className="text-charcoal mb-0 fs-14">Total</h6>
                  <p className="text-pebble mb-0">₹{totalAmount}</p>
                </div>
                <div className="order-info">
                  <h6 className="text-charcoal mb-0 fs-14">Shipped To</h6>
                  <p className="text-pebble mb-0">{user && user.name}</p>
                </div>
              </div>
            </div>
            <div className="list-group-item bg-white">
              <div className="order-shipment">
                <div className="alert alert-success">
                  <h6 className="text-green mb-0 fs-14">
                    <b>Shipped</b>
                  </h6>
                  <p className="text-green hidden-sm-down mb-0">
                    Est. delivery between Aug 5 – Aug 9th,{" "}
                    {new Date().getFullYear()}
                  </p>
                </div>
              </div>
              <div className="products-list">
                {allProducts.map((item) => {
                  return (
                    <div className="order-product" key={item.product._id}>
                      <div className="product-image">
                        <img
                          className="img-fluid"
                          src={item.product.image}
                          alt="Product Image"
                        />
                      </div>
                      <div className="product-details">
                        <h6 className="text-charcoal mb-2">
                          <a href="" className="text-charcoal fs-16">
                            {item.quantity} x {item.product.name}
                          </a>
                        </h6>
                        <ul className="list-unstyled text-pebble mb-2 small">
                          <li className="d-flex align-items-center">
                            <b className="fs-14">Color:</b>
                            <div
                              className="color-box"
                              style={{ backgroundColor: item.product.color }}
                            ></div>
                          </li>
                          {/* <li>
                        <b className="fs-14">Size:</b> L
                      </li> */}
                        </ul>
                        <h6 className="text-charcoal text-left mb-0 fs-14">
                          <b>₹{item.product.price / 100}</b>
                        </h6>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .container {
    max-width: 1200px;
    margin: 2rem auto;
    padding: 0 1rem;
  }

  h2,
  h5 {
    color: #333;
    margin: 0 0 1rem;
  }

  .hidden-sm-down {
    display: none;
  }

  .hidden-md-up {
    display: block;
  }

  .fs-14 {
    font-size: 14px;
  }
  .fs-16 {
    font-size: 16px;
  }

  @media (min-width: 768px) {
    .hidden-sm-down {
      display: block;
    }
    .hidden-md-up {
      display: none;
    }
  }

  .orders {
    margin-top: 2rem;
  }

  .list-group {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .list-group-item {
    border: 1px solid #ccc;
    padding: 1rem;
  }

  .bg-snow {
    background-color: #f8f8f8;
  }

  .bg-white {
    background-color: #fff;
  }

  .order-details {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .order-info {
    flex: 1 1 45%;
    margin-bottom: 1rem;
  }

  .text-charcoal {
    color: #333;
  }

  .text-pebble {
    color: #777;
  }

  .mb-0 {
    margin-bottom: 0;
  }

  .mb-2 {
    margin-bottom: 0.5rem;
  }

  .alert {
    border: 1px solid #ccc;
    padding: 1rem;
    border-radius: 0.25rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .alert-success {
    border-color: #d4edda;
    background-color: #d4edda;
  }

  .text-green {
    color: #28a745;
  }

  .order-shipment {
    display: flex;
    flex-direction: column;
  }

  .shipment-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 1rem;
  }

  .btn {
    padding: 0.5rem 1rem;
    border: none;
    cursor: pointer;
  }

  .btn-secondary {
    background-color: #6c757d;
    color: #fff;
    border-radius: 0.25rem;
    transition: background-color 0.3s;
  }

  .btn-secondary:hover {
    background-color: #5a6268;
  }

  .products-list {
    margin-top: 1rem;
  }

  .order-product {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-top: 1rem;
  }

  .product-image {
    flex: 0 0 15%;
    padding-right: 1rem;
  }

  .product-details {
    flex: 1;
  }

  .img-fluid {
    max-width: 100%;
    height: auto;
  }

  .color-box {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-left: 5px;
  }

  .small {
    font-size: 0.875rem;
  }

  .d-flex {
    display: flex;
  }

  .align-items-center {
    align-items: center;
  }
`;

export default Order;
