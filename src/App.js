import logo from './logo.svg';
import './App.css';
import Navigation from './Navigation';
import { useEffect } from 'react';


const imagePaths = [
  // Escaping.js
  "chultui_intro.svg", "chultui_button.svg", "리오.svg", "리아.svg",
];

const preloadImages = (paths) => {
  paths.forEach((filename) => {
    const img = new Image();
    img.src = `${process.env.PUBLIC_URL}/asset/dressingImages/${filename}`;
  });
};

function App() {
  
  useEffect(() => {
    console.log('ffiojoijoi')
    preloadImages(imagePaths);
  }, []);

  return (
    <div className="App">
      <Navigation/>
    </div>
  );
}

export default App;
   