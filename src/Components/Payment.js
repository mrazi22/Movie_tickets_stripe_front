import React,{useEffect, useState} from 'react'
import CurrencyFormat from 'react-currency-format'
import styled from 'styled-components'
import {getBasketTotal} from "./Reducer"
import { useStateValue } from './StateProvider'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import axios from 'axios'
import {CardElement,useElements,useStripe } from '@stripe/react-stripe-js'



function Payment() {
  const [{ address, basket, user }, dispatch] = useStateValue();
  const [clientSecret, setClientSecret] = useState('');
  const navigate = useNavigate();
  const elements = useElements();
  const stripe = useStripe();
 // Use the custom hook

  useEffect(() => {
      const fetchClientSecret = async () => {
          try {
              const response = await axios.post('http://localhost:5000/payment', {
                  amount: getBasketTotal(basket),
                  currency: "usd",
              });
              setClientSecret(response.data.clientSecret); // Correctly get clientSecret from response
          } catch (error) {
              console.error('Error fetching clientSecret:', error);
              // Handle error (e.g., show error message to user)
          }
      };

      fetchClientSecret();
  }, [basket]); // Depend on basket to refetch if basket changes

  useEffect(() => {
      console.log('clientSecret updated:', clientSecret);
  }, [clientSecret]);

  const confirmPayment = async (e) => {
    e.preventDefault();

    await stripe
        .confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
            },
        })
        .then((result) => {
            console.log("Axios Request Data:", {basket: basket, price: getBasketTotal(basket), email: user?.email});
            axios
                .post("http://localhost:5000/addorder", {
                    basket: basket,
                    price: getBasketTotal(basket),
                    email: user?.email,
                })
                .then((addOrderResponse) => {
                    // Handle successful addorder response
                    console.log("Order added successfully:", addOrderResponse);
                     
                })
                .catch((addOrderError) => {
                    // Handle addorder error
                    console.error("Payment confirmation error:", addOrderError);
                    if(addOrderError.response && addOrderError.response.data){
                        console.log("Server Response:", addOrderError.response.data);
                    }
                });

            dispatch({
                type: "EMPTY_BASKET",
            });
            // Show success message before navigating
            alert("Payment successful!");
            navigate("/home");
        })
        .catch((err) => console.warn(err));
};


  return (
    <Container>
    <Navbar />

    <Main>
      <ReviewContainer>
        <h2>Review Your Order</h2>

        <AddressContainer>
          <h5>Shipping Address</h5>

          <div>
            <p>Full Name: {address.name}</p>
            <p>Country: {address.country}</p>
           
            <p>
              Email: {address.email}
            </p>

            <p>Phone: {address.phone}</p>
          </div>
        </AddressContainer>

        <PaymentContainer>
          <h5>Payment Method</h5>
         
         <div>
          <p>Card Details</p>

          <CardElement/>
         </div>
        </PaymentContainer>

      

        <OrderContainer>
          <h5>Your Order:Can't  wait to see you there😁</h5>

          <div>
            {basket?.map((product) => (
              <Product>
                <Image>
                  <img src={product.imageURL} alt="" />
                </Image>
                <Description>
                  <h4>{product.title}</h4>

                  <p>ksh. {product.price}</p>
                </Description>
              </Product>
            ))}
          </div>
        </OrderContainer>
      </ReviewContainer>
      <Subtotal>
        <CurrencyFormat
          renderText={(value) => (
            <>
              <p>
                Subtotal ( {basket.length} tickets ) : <strong> {value}</strong>
              </p>
            </>
          )}
          decimalScale={2}
          value={getBasketTotal(basket)}
          displayType="text"
          thousandSeparator={true}
          prefix={"ksh. "}
        />

        <button onClick={confirmPayment} >Place Order</button>
      </Subtotal>
    </Main>
  </Container>
  )
}
const Container = styled.div`
  width: 100%;

  max-width: 1400px;
  background-color: rgb(234, 237, 237);
`;

const Main = styled.div`
  padding: 15px;
  display: flex;

  @media only screen and (max-width: 1200px) {
    flex-direction: column;
  }
`;

const ReviewContainer = styled.div`
  background-color: #fff;
  flex: 0.7;
  padding: 15px;
  h2 {
    font-weight: 500;
    border-bottom: 1px solid lightgray;
    padding-bottom: 15px;
  }
`;

const AddressContainer = styled.div`
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

const PaymentContainer = styled.div`
  margin-top: 15px;

  div {
    margin-top: 15px;
    margin-left: 15px;

    p {
      font-size: 14px;
    }
  }
`;

const OrderContainer = styled.div`
  margin-top: 30px;
`;

const Product = styled.div`
  display: flex;
  align-items: center;
`;

const Image = styled.div`
  flex: 0.3;
  img {
    width: 80%;
    padding:5px

  }
`;
const Description = styled.div`
  flex: 0.7;

  h4 {
    font-weight: 600;
    font-size: 18px;
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
const Subtotal = styled.div`
  flex: 0.3;
  background-color: #fff;
  margin-left: 15px;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: 1200px) {
    flex: none;
    margin-top: 20px;
  }
  p {
    font-size: 20px;
  }

  small {
    display: flex;
    align-items: center;
    margin-top: 10px;

    span {
      margin-left: 10px;
    }
  }

  button {
    width: 65%;
    height: 33px;
    margin-top: 20px;
    background-color: #ffd814;
    border: none;
    outline: none;
    cursor: pointer;

    border-radius: 8px;

    &:hover {
      background-color: orange;
}

  }
`;

export default Payment

