import React, { useState } from 'react'
import styled from 'styled-components'
import { TbMovie, TbTicket } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'
import { useUserInitialization} from "./Reducer"
import { useStateValue } from './StateProvider'

const Login = () => {
    const navigate = useNavigate()
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [, dispatch] = useStateValue(); // Get dispatch
    const setUser = useUserInitialization(dispatch); // Get setUser
  
    function handleSubmit(e) {
      e.preventDefault();
  
      console.log(email, password);
      fetch("http://localhost:5000/user/login", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
        
          if (data.message === "user login succesfully") {
            alert("login successful");
            window.localStorage.setItem("token", data.data);
            window.localStorage.setItem("userType", data.status);
            window.localStorage.setItem("loggedIn", true);

            // Store user data in state and localStorage
            setUser({
              email: email, // Store email
              // Add other user data as needed from data.data or data.status
          });


          
            if (data.userType === "admin") {
              // Navigate to admin page
              navigate("/admin");
            } else {
              // Navigate to home page
              navigate("/home");
            }
          } else {
            // Handle login errors
            alert("Invalid email or password");
          }
        })
        
    }
    

  return (
    <Container>
      <Logo>
        <h3>Welcome to movie nights with the gang <TbMovie className='icon'/> </h3>
      </Logo>
      <FormContainer>
        <h3>Login <TbTicket className='icona'/></h3>

        <InputContainer>
          <p>Email</p>
          <input
            type="email"
            placeholder="example@example.com"
           
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            
           
          />
        </InputContainer>
        <InputContainer>
          <p>Password</p>
          <input
            type="password"
            placeholder="********"
           
            onChange={(e) => setPassword(e.target.value)}
            value={password}
           
           
          />
        </InputContainer>

        <LoginButton  type='submit' onClick={handleSubmit}  >Login</LoginButton>

        <InfoText>
          By continuing, you agree to Waka's <span>Conditions of Use </span>
          and <span> Privacy Notice</span>
        </InfoText>
        <SignUpButton onClick={() => navigate("/signup")} >
        Create Account
      </SignUpButton>
      </FormContainer>
      
    </Container>
  )
}
const Container = styled.div`
width: 40%;
min-width: 450px;
height: fit-content;
padding: 15px;
margin: auto;
display: flex;
flex-direction: column;
align-items: center;



`

const Logo = styled.div`

.icon{
margin-bottom: -6px;

}

`

const FormContainer = styled.div`
border: 1px solid lightgray;
width: 75%;
height: 450px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
padding: 15px;
margin-top: 50px;

h3 {
  font-size: 28px;
  font-weight: 400;
  line-height: 33px;
  align-self: flex-start;

  margin-bottom: 20px;
}

.icona{
  margin-bottom: -6px;
}

`

const InputContainer = styled.div`
width: 100%;
padding: 10px;

p {
  font-size: 14px;
  font-weight: 600;
}

input {
  width: 95%;
  height: 33px;
  padding-left: 5px;
  border-radius: 5px;
  border: 1px solid lightgray;
  margin-top: 5px;

  &:hover {
    border: 1px solid orange;
  }
}`

const LoginButton = styled.button`
width: 70%;
height: 35px;
background-color: #FF0000;
border: none;
outline: none;
border-radius: 10px;
margin-top: 30px;
cursor: pointer;
color: white;
font-size: 14px;

&:hover {
  background-color: orange;
}
`

const InfoText = styled.div`
font-size: 12px;
width: 100%;
word-wrap: normal;
word-break: normal;
margin-top: 20px;

span {
  color: #426bc0;
  cursor: pointer;
}
`

const SignUpButton = styled.button`
width: 55%;
height: 35px;
font-size: 12px;
margin-top: 20px;
border-radius: 10px;
border: 1px solid lightgray;
cursor: pointer;

&:hover {
  background-color: #dfdfdf;
  border: 1px solid gray;
}
`

export default Login