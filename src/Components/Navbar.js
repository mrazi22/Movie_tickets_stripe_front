import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { TbBasket } from 'react-icons/tb';


const Navbar = () => {

    const navigate = useNavigate();
    const [{ basket }, dispatch] = useStateValue();

    const logout = () => {
        dispatch({
            type:"SET_USER",
            user: null
        })
        localStorage.removeItem("user");
        navigate("/")
    }

    return (
        <Container>
            <Inner>
                <Logo>
                <h1 onClick={()=>navigate('/home')}>Night Movie.ke😎🍿 </h1>

                </Logo>

                <RightContainer>
                    <NavButton onClick={() => navigate("/home")}>
                    <p>Home</p>

                    </NavButton  >
                    

                    <NavButton onClick={() => navigate("/movies")}>
                    <p>Movies</p>
                    </NavButton>

                    <NavButton onClick={() => logout()}>
            <button>Log Out</button>
          </NavButton>

         <BasketButton onClick={() => navigate("/checkout")} >
            < TbBasket  className='icon'/>
            <p>{basket?.length}</p>
           
          </BasketButton>

                </RightContainer>
            </Inner>
        </Container>
    )
}
const Container = styled.div`
width: 100%;
  height: 60px;
  background-color: black;
  color: white;
  display: flex;
  align-items: center;
  position: relative;



`

const Inner = styled.div`
 width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Logo = styled.div`
margin-left: 20px;
  cursor: pointer;
  h1{
    color: white;
    font-weight: 500;
    font-size: 20px;
  }

`

const RightContainer = styled.div`
display: flex;
  align-items: center;
  width: fit-content;
  justify-content: space-around;
  height: 100%;
  padding: 5px 15px;
  margin-right: 20px;
`

const NavButton = styled.div`
color: #fff;
  padding: 5px;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  margin-right: 15px;

  p {
    &:nth-child(1) {
      font-size: 12px;
      
    }

    &:nth-child(2) {
      font-size: 14px;
      font-weight: 600;
      margin-top: -0.3px;
    }
  }

  button {
    width: 120%;
    border: none;
    background-color: red;
    color: #fff;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    border-radius: 5px;

    &:hover {
      background-color: #dfdfdf;
      border: 1px solid gray;
    }
  }
`

const BasketButton = styled.div`
display: flex;
  align-items: center;
  height: 90%;
  cursor: pointer;
  margin-left: 25px;

  .icon {
  font-size: 30px;
  color: #fff;
  margin-left: 5px;
  
  }

 

  p {
    color: #fff;
    font-weight: 500;
    font-size: 20px;
    margin-top:22px;
  }
`







export default Navbar