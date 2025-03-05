import React from 'react'
import Navbar from './Navbar'
import PostIT from './PostIT'
import styled from 'styled-components'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Card from './Card'

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import ReactDOM from 'react-dom/client';

import { useStateValue } from './StateProvider'

const Movies = () => {
    const [products, setProducts] = useState([]);
    const [{basket},dispatch] = useStateValue();

    useEffect(() => {
      const fetchdata = async () => {
        try{
          const response = await axios.get("http://localhost:5000/products/products");
          console.log(response.data.products);
          setProducts(response.data.products);
        }catch (e){
          console.error(e);
        }
       };
      fetchdata();
  
      
    }, []);

    const handleBuyTicket = (e, product) => {
      e.preventDefault();
      
      dispatch({
        type: "ADD_TO_BASKET",
        item: {
          id: product._id,
          title: product.title,
          imageURL: product.imageURL,
          price: product.price,
          date: product.date
        }
      });
      toast.success("Ticket Bought", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
      });
    }
  return (
    <Container>
      <Navbar />

      <PostIT />
      <div style={gridListView}>
      {Array.isArray(products) && products.map((product) => (
        <Card key={product._id} product={product} onBuyTicket={(e) => handleBuyTicket(e,product)} />
      ))}
    </div>
    <ToastContainer />
    </Container>

    
  )
}

const Container = styled.div``
const gridListView = {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: '10px',
    margin: '30px',
  }

  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(<Movies />);
export default Movies