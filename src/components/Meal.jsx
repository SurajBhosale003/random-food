import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import YouTube from 'react-youtube';
function Meal() {
  const navigate = useNavigate();
  const url = 'https://www.themealdb.com/api/json/v1/1/random.php';
  const [food, setFood] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showContent, setShowContent] = useState(false);
  
  const [opts, setOpts] = useState(getOpts());
  
  function getOpts() {
    if (window.innerWidth > 767) {
      return {
        height: '300',
        width: '700',
      };
    } else {
      return {
        height: '200',
        width: '300',
      };
    }
  }
  
  useEffect(() => {
    const handleResize = () => {
      setOpts(getOpts());
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const fetchFood = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(url);
      const data = await response.json();
      setFood(data.meals);
      setIsLoading(false);
      setShowContent(true);
      
    } catch (error) {
      console.error('Error fetching food:', error);
      setIsLoading(false);
      setShowContent(false);
    }
  };

  const handleClick = () => {
    setIsLoading(true);
    setShowContent(false);

    // Simulate a loading delay of 2 seconds
    const timeoutId = setTimeout(() => {
      fetchFood();
      clearTimeout(timeoutId);
    }, 800);
  };

  useEffect(() => {
    fetchFood();
  }, []);
  const getVideoIdFromUrl = (url) => {
    const regex = /(?:\?v=|\/embed\/|\.be\/|\/v\/|\/\d{2,}\/|\/embed\/|\.be\/|\/v\/|\/\d{2,}\/|\/embed\/|\.be\/|\/v\/|\/\d{2,}\/|youtu\.be\/|embed\/|watch\?v=|\/videos\/|\/user\/\S+|[^-_/a-zA-Z0-9]+?)([a-zA-Z0-9_-]{11})(?:\?|&|\/|$|\#)/;
    const match = url.match(regex);
    return match && match[1];
  };

  return (
    <>
      <div className="button">
        <Button
          variant="contained"
          className="button-28"
          onClick={handleClick}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Generate Meal'}
        </Button>
        
        <Button
          variant="contained"
          className="button-28"
          onClick={()=>{navigate("/");}}
        >
          {isLoading ? 'Loading...' : 'Home'}
        </Button>
      </div>
      <section className="meals">
        {showContent ? (
          food.map((f) => {
            const {
              idMeal,
              strMeal,
              strInstructions,
              strMealThumb,
              strSource,
              strTags,
              strYoutube,
            } = f;
              
            return (
              <article key={idMeal}>
                <div>
                  <h2 className="text-2xl">
                    <span className="font-bold">Name:</span> {strMeal}
                  </h2>
                  <div className="food-container">
                    <div className="food-image">
                      <img src={strMealThumb} alt={strMeal} />
                    </div>
                    <div>
                      <ul>
                        <p className="font-bold mt-5">Ingredients:</p>
                        {Array.from({ length: 20 }).map((_, index) => {
                          const ingredient = f[`strIngredient${index + 1}`];
                          const measurement = f[`strMeasure${index + 1}`];

                          if (ingredient && measurement) {
                            return (
                              <li key={index}>
                                {measurement} {ingredient}
                              </li>
                            );
                          }

                          return null;
                        })}
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold">How to cook</h3>
                  <div className="underline"></div>
                  <p>{strInstructions}</p>
                  <a
                    href={strSource}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 bg-yellow-800 py-1 px-2 rounded-lg inline-block text-white transition-all hover:bg-yellow-900"
                  >
                    Source
                  </a>
                  <div className="my-5">
                    <small>Category: {strTags ? strTags : 'N/A'}</small>
                    <br/>
                    <small>Youtube: {strYoutube ? 
                    <center><YouTube videoId={getVideoIdFromUrl(strYoutube)} opts={opts} /></center> : 'N/A'}</small>
                  </div>
                </div>
              </article>
            );
          })
        ) :  
        <>
          <div className="loader-container">
            <div className="spinner"></div>
          </div>
        </>
      }
      </section>
    </>
  );
}

export default Meal;
