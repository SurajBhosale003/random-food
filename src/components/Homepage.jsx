import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useState, useEffect } from 'react';
import breakfast from '../assets/breakfast.jpg';
import meal from '../assets/meal.jpg';
import snacks from '../assets/snacks.jpg';
import { useNavigate } from "react-router-dom";
function Homepage() {
  const navigate = useNavigate();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    
    useEffect(() => {
        const handleResize = () => {
          setWindowWidth(window.innerWidth);
        };
    
        window.addEventListener('resize', handleResize);
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);
    
      const isMobile = windowWidth <= 767;
  return (
    <>
    <div>
      <center><h1>Random Food Genrator</h1></center>
    </div>
      <div className='main-flex-div'>
        {/* Meal */}
        <div>
        
        <Card sx={{ maxWidth: 390 }} onClick={()=>{navigate("/meal");}}>
      <CardActionArea>
        <CardMedia
          component="img"
          height= {isMobile ? "210" : "400"}
          image={meal}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          Meal
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    
        </div>
        {/* Breakfast */}
        <div>
        <Card sx={{ maxWidth: 390 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height= {isMobile ? "210" : "400"} 
          image={breakfast}
          alt="Breakfast"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Breakfast
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
        </div>
        
        {/* Snacks */}
        <div>
        <Card sx={{ maxWidth: 390 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height= {isMobile ? "210" : "400"}
          image={snacks}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          Snacks
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
        </div>
      </div>
    </>
  )
}

export default Homepage