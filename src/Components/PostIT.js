import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const PostIT = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.animation = 'bounce 2s infinite';
    }
  }, []);

  return (
    <Container ref={containerRef}>
      <Header>
        <h1>Welcome!! Below are our available movies</h1>
      </Header>
    </Container>
  );
};

const Container = styled.div`
  padding: 40px;
  background-color: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 5px;
  text-align: center;
  animation: bounce 2s infinite;
  @keyframes bounce {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
    100% {
      transform: translateY(0);
    }
  }
`;

const Header = styled.div`
  h1 {
    font-size: 36px;
    margin-bottom: 20px;
  }
`;

export default PostIT;