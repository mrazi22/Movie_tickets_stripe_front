import React from 'react'
import { useStateValue } from './StateProvider'
import styled from 'styled-components'
import Navbar from './Navbar'
import CurrencyFormat from "react-currency-format"
import {getBasketTotal} from './Reducer'
import { useNavigate } from 'react-router-dom'

const Checkout = () => {
    const [{basket},dispatch] = useStateValue();
    const navigate = useNavigate();
    const removeFromCart = (id) => {
        dispatch({
          type: 'REMOVE_FROM_BASKET',
          id,
        });
      };
  return (
    <Container>

      <Navbar/>
      <Main>
       <ShoppingCart>
       <h2> My tickets</h2>
       {basket?.map((product) => (
           <Product>
            <Image>
                <img src={product.imageURL} alt="product"/>
            </Image>
            <Description>
                <h4>{product.title}</h4>
                <p>Ksh. {product.price}</p>
                <button onClick={() => removeFromCart(product.id)}>
                    Remove
                </button>
            </Description>
           </Product>
       ))}
       </ShoppingCart>
       <Subtotal>
        <CurrencyFormat
        renderText={(value) => (
            <>
              <p>
                Subtotal ( {basket.length} items ) : <strong> {value}</strong>
              </p>
              <small>
                <input type="checkbox" />
                <span>This ticket comes with free popcorn🍿.</span>
              </small>
            </>
          )}
          decimalScale={2}
          value={getBasketTotal(basket)}
          displayType="text"
          thousandSeparator={true}
          prefix={"Ksh. "}
        />
         <button onClick={() => navigate("/address")}>
            Proceed to Checkout
          </button>
       </Subtotal>
      </Main>
    </Container>

   
  )
}

const Container = styled.div`
width: 100%;
  max-width: 1400px;
  height: fit-content;
  margin: auto;
  background-color: rgb(234, 237, 237);
  position: relative;
  overflow-y:scroll; ;
`

const Main = styled.div`
 display: flex;
  padding: 15px;

  @media only screen and (max-width: 1200px) {
    flex-direction: column;
  }
`

const ShoppingCart = styled.div`
  padding: 15px;
  background-color: #fff;
  flex: 0.7;

  @media only screen and (max-width: 1200px) {
    flex: none;
  }

  h2 {
    font-weight: 500;
    border-bottom: 1px solid lightgray;
    padding-bottom: 15px;
  }
`

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
`

const Product = styled.div`
  display: flex;
  align-items: center;
`;

const Image = styled.div`
  flex: 0.3;
  img {
    width: 70%;
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




export default Checkout