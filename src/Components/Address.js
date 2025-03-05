import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useStateValue } from './StateProvider'
import Navbar from './Navbar'
const Address = () => {
    const [{},dispatch] = useStateValue()
    const navigate = useNavigate()

    const [name, setName] = useState("");
    const [country,setCountry] = useState("")
    const [phone,setPhone] = useState("")
    const [email,setEmail] = useState("")

    const deliver = (e) => {
        e.preventDefault();
    
        dispatch({
          type: "SET_ADDRESS",
          item: {
            name,
            country,
            phone,
            email,
          },
        });
    
        navigate("/payment");
      };
  return (
    <Container>
    <Navbar />
    <Main>
       <FormContainer>
           <InputContainer>
           <p>Full Name</p>
           <input
               type="text"
               placeholder="John Smith"
               onChange={(e) => setName(e.target.value)}
                value={name}
              
           />

           </InputContainer>
           <InputContainer>
           <p>Country</p>
           <input
               type="text"
               placeholder="Kenya"
               onChange={(e) => setCountry(e.target.value)}
              value={country}
              
           />

           </InputContainer>
           <InputContainer>
           <p>Phone Number</p>
           <input
               type="text"
               placeholder="0712345678"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              
           />


           </InputContainer>
           <InputContainer>
           <p>Email</p>
           <input
               type="text"
               placeholder="example@example.com"
               onChange={(e) => setEmail(e.target.value)}
               value={email}
              
           />

           </InputContainer>
           <button onClick={deliver} >Ticket bought</button>
       </FormContainer>
    </Main>

</Container>

   
  )
}
const Container = styled.div`
width: 100%;
height: 580px;
max-width: 1400px;


margin: auto;
background-color: rgb(234, 237, 237);

position: relative;
`;

const Main = styled.div`
padding: 15px;
`;

const FormContainer = styled.form`
border: 1px solid lightgray;
width: 55%;
min-width: 400px;
height: fit-content;

display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
padding: 15px;
background-color: #fff;
margin: auto;

button {
  align-self: flex-start;
  height: 33px;
  width: 250px;
  margin-top: 20px;
  background-color: #ffa32a;
  border: none;
  outline: none;
  border-radius: 5px;
  cursor: pointer;
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

export default Address