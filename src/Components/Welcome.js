import React from 'react';
import styled from 'styled-components';

import { motion } from 'framer-motion';

const Welcome = () => {
  
  return (
    <Container>
      <Message>Welcome to our movie theater!</Message>
      <Button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
       <a href="/movies">Buy Now!!!</a>
      </Button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column; /* Arrange elements vertically */
  height: 50vh;
`;

const Message = styled.div`
  font-size: 36px;
  margin-bottom: 20px;
`;

const Button = styled(motion.button)`
  padding: 15px 30px;
  font-size: 24px;
  font-weight: bold;
  background-color: red;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  a{
    text-decoration: none;
    color: white;
  }

  &:hover {
    background-color: #dfdfdf;
    border: 1px solid gray;
  }
`;

export default Welcome;