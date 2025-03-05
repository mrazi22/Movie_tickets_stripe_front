import React, { useState } from 'react'
import styled from 'styled-components'
import {useNavigate} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const Register = () => {
  const navigate = useNavigate()
   const [fullName,setFullName] = useState('')
   const [email,setEmail] = useState('')
   const [password,setPassword] = useState('')
   const [userType,setUserType]  = useState('')
   const [secretKey, setSecretKey] = useState("");

   const handleSubmit = (e) => {
    if(userType==="admin" && secretKey !== "admin123"){
      e.preventDefault();
      alert("invalid admin")

    }else{
      e.preventDefault();
      console.log(fullName,email,password)
      fetch("http://localhost:5000/user/register", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          fullName,
          email,
          password,
          userType
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data, "userRegister");
          alert("Registered successfully");
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
     }
  }
  return (
    <Container>
      <ToastContainer />
       <FormContainer>
        <h3>Welcome to SergeVents</h3>
        <InputContainer>
        <p>Register as </p>

        <input type = "text"
               name  ="user" 
               onChange = {(e) => setUserType(e.target.value)}
               value = {userType}
               />
        </InputContainer>

        {userType==="admin" ? (
     
     <InputContainer>
       <p>secretKey</p>
       <input
         type="text"
         placeholder="*****"
         onChange={(e) => setSecretKey(e.target.value)}
         value={secretKey}
       />
     </InputContainer>
   ) : null}

        <InputContainer>
        <p>Full Name</p>

        <input type = "text"
               name  ="fullName" 
               onChange = {(e) => setFullName(e.target.value)}
               value = {fullName}
               />
        </InputContainer>

        <InputContainer>
        <p>Email</p>

        <input type = "text"
        name = "email"
        onChange = {(e) => setEmail(e.target.value)}
        value = {email}
         />

        </InputContainer>

        <InputContainer>
        <p>Password</p>

        <input type = "password"
        name = "password" 
        onChange = {(e) => setPassword(e.target.value)}
        value = {password}
        />

        </InputContainer>


        <SignUpButton type='submit' onClick={handleSubmit}>
            Create Account
        </SignUpButton>

        <LoginButton>
            Sign in 
        </LoginButton>


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
`;


const FormContainer = styled.form`
border: 1px solid lightgray;
width: 100%;
height: 900px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
padding: 15px;

h3 {
  font-size: 28px;
 
  align-self: flex-start;

  margin-bottom: 10px;
}


`;
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
}
`;
const SignUpButton = styled.button`
width: 70%;
height: 35px;
font-size: 12px;
margin-top: 20px;
border-radius: 5px;
border:none;
outline: none;
cursor: pointer;

&:hover {
  background-color: #dfdfdf;
  border: 1px solid gray;
}
`;

const LoginButton = styled.button`
width: 70%;
height: 35px;
font-size: 12px;
margin-top: 20px;
background-color: #FF0000;
color: white;
border-radius: 5px;
border:none;
outline: none;
cursor: pointer;

&:hover {
  background-color: orange;
  
}
`


export default Register