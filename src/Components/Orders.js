
import axios from 'axios'
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "./AdminNavbar";
import { useStateValue } from './StateProvider'


function Orders() {
    const [{ user, address }] = useStateValue();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (user && user.email) {
            axios
                .get("http://localhost:5000/orders", { params: { email: user.email } })
                .then((res) => setOrders(res.data))
                .catch((error) => console.error("Error fetching orders:", error));
        }
    }, [user]);

    const handleDeleteOrder = async (orderId) => {
        try {
            await axios.delete(`http://localhost:5000/orders/${orderId}`);
            // Refresh orders after deletion
            if (user && user.email) {
                axios
                    .get("http://localhost:5000/orders", { params: { email: user.email } })
                    .then((res) => setOrders(res.data))
                    .catch((error) => console.error("Error fetching orders:", error));
            }
        } catch (error) {
            console.error("Error deleting order:", error);
            alert("Failed to delete order.");
        }
    };

    console.log(orders);

    return (
        <Container>
            <Navbar />
            <Main>
                <OrderContainer>
                    <h2>Your Orders</h2>
                    {orders.map((order) => (
                        <OrderDetail key={order._id}>
                            <AddressComponent>
                                <h4>Shipping Address</h4>
                                <div>
                                    <p>{address.name}</p>
                                    <p>{address.email}</p>
                                    <p>{address.country}</p>
                                    <p>Phone : {address.phone}</p>
                                </div>
                            </AddressComponent>
                            <OrderBasket>
                                <h4>Order</h4>
                                <p>Subtotal : Ksh <span>{order.price}</span></p>
                                {order.products.map((product) => (
                                    <Product key={product._id}>
                                        <Image>
                                            <img src={product.imageURL} alt="" />
                                        </Image>
                                        <Description>
                                            <h4>{product.title}</h4>
                                            <p>ksh {product.price}</p>
                                        </Description>
                                    </Product>
                                ))}
                            </OrderBasket>
                            <DeleteButton onClick={() => handleDeleteOrder(order._id)}>
                                Delete Order
                            </DeleteButton>
                        </OrderDetail>
                    ))}
                </OrderContainer>
            </Main>
        </Container>
    );
}
  const Container = styled.div`
    width: 100%;
    height: fit-content;
    max-width: 1400px;
  
    margin: auto;
    background-color: rgb(234, 237, 237);
  `;
  
  const Main = styled.div`
    min-width: 100vw;
    min-height: 100vh;
    display: flex;
    justify-content: center;
  `;
  
  const OrderContainer = styled.div`
    padding: 15px;
  
    background-color: #fff;
    width: 95%;
  
    h2 {
      font-weight: 500;
      border-bottom: 1px solid lightgray;
      padding-bottom: 15px;
    }
  `;
  
  const OrderDetail = styled.div`
    border-bottom: 1px solid lightgray;
    padding-bottom: 20px;
  `;
  
  const AddressComponent = styled.div`
    margin-top: 20px;
  
    div {
      margin-top: 10px;
      margin-left: 10px;
  
      p {
        font-size: 14px;
        margin-top: 4px;
      }
    }
  `;
  
  const OrderBasket = styled.div`
    margin-top: 20px;
  
    p {
      font-size: 15px;
      margin-left: 15px;
      margin-top: 15px;
  
      span {
        font-weight: 600;
      }
    }
  `;
  
  const Product = styled.div`
    display: flex;
    align-items: center;
  `;
  
  const Image = styled.div`
    flex: 0.3;
    img {
      width: 50%;
    }
  `;
  const Description = styled.div`
    flex: 0.7;
  
    h4 {
      font-weight: 600;
      font-size: 18px;
  
      @media only screen and (max-width: 1200px) {
        font-size: 14px;
      }
    }
  
    p {
      font-weight: 600;
      margin-top: 10px;
    }
  
    button {
      background-color: transparent;
      color: #1384b4;
      border: none;
      outline: none;
      margin-top: 10px;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
  `;
  const DeleteButton = styled.button`
    background-color: #ff6347;
    color: white;
    padding: 10px 15px;
    border: none;
    cursor: pointer;
    margin-top: 10px;
`;
  export default Orders;