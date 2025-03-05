import react from 'react'
import styled from 'styled-components'
import banner from '../Components/rayz.jpg'
import {useNavigate} from 'react-router-dom'

const Banner = () => {
    
 const navigate = useNavigate()


    return (

        <Container>
          

               

        
            <Content>
               
                <h1>Welcome to night movie life </h1>
                <p>Discover your next favorite old skull movie</p>
                <p>Click below to post movies</p>
                <button onClick={() => navigate('/postmovies')}>Post Movie</button>

            </Content>


        </Container>



    )
}

const Container = styled.div`

width: 100%;
height: 50vh;
background-image: url(${banner});
background-repeat: no-repeat;
background-size: cover;
background-position: center;
display: flex;
align-items: center;
justify-content: center;`

const Content = styled.div`
width: 100%;
height: 100%;
background-color: rgba(0,0,0,0.5);
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
h1{
    color: white;
    font-weight: 500;
    font-size: 40px;
}
p{
    color: white;
    font-weight: 500;
    font-size: 20px;
}
button{
    width: 100px;
    height: 30px;
    background-color: red;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-bottom: 20px;
}
`

export default Banner