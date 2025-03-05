import React from 'react';
import styled from 'styled-components';
import kik from '../Components/kik.jpg'

const About = () => {
  return (
    <Container>
      <Left>
        {/* Your content for the left side goes here */}
        <h1>About Old Skull Movies</h1>
        <p>Discover a world of timeless classics and rediscover the magic of old school cinema.</p>
        <p>We offer a curated selection of vintage films, ranging from iconic blockbusters to hidden gems.</p>
        <p>Join us for a nostalgic journey and experience the thrill of watching movies the way they were meant to be seen.</p>
      </Left>

      <Right>
        {/* Image container */}
        <ImageContainer>
          <Image src={kik} alt="Image" />
        </ImageContainer>
      </Right>
     
    </Container>
    
    
  );
};

export default About;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40px;
  background-color: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 5px;
`;

const Left = styled.div`
  flex: 1;
  padding: 20px;
  h1 {
    font-size: 36px;
    margin-bottom: 20px;
  }
  p {
    font-size: 18px;
    line-height: 1.5;
    margin-bottom: 15px;
  }
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImageContainer = styled.div`
  width: 300px;
  height: 300px;
  border-radius: 50%; /* Makes the image circular */
  overflow: hidden; /* Hides any part of the image that overflows the container */
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover; /* Scales the image to fit the container while preserving aspect ratio */
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

