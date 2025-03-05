import React from 'react'
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'




const Cardi = ({product, onBuyTicket}) => {
  console.log("product >>>>", product.imageURL);

  if(!product){
    return null;
  }
  
  const imageURL = product.imageURL ? product.imageURL : "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png";
  const title = product.title ? product.title : "No title";
  const price = product.price ? product.price : "No price";
  const date = product.date ? product.date : "No date"; 
   
  return (
    <>
    <Card sx={{ maxWidth: 300 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="250"
        image={imageURL}
      />
      <CardContent>
        
        <Typography gutterBottom variant="h5" component="div">

          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {date}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={onBuyTicket} sx={{ color: 'black' }}>Buy ticket</Button>
        
      </CardActions>
      
    </Card>

    </>
  )
}
export default Cardi