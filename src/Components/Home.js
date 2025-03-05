import Navbar from './Navbar'
import Bannerq from './UserBanner'
import About from './About'
import Welcome from './Welcome'


import styled from 'styled-components'

import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

const Home = ({ dispatch }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleBackNavigation = () => {
      dispatch({
        type : "SET_USER",
        user: null,
      });
      localStorage.removeItem("user");
      navigate("/");
      alart("Logged Out");
    };

    window.addEventListener("popstate", handleBackNavigation);
    return () => {
      window.removeEventListener("popstate", handleBackNavigation);
    };
  }, [dispatch, navigate]);
 


  return (
    <>
    <Container>

    <Navbar/>

    <Bannerq/>

    <About/>

    <Welcome />


    </Container>


   
   
   </>
   
  )
}
const Container = styled.div``



export default Home