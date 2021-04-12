import './App.css'
import sky from './images/wallpaper.jpg'
import Home from './Home.js';
function App() {
 return (
   <div styles={{ backgroundImage: `url(${sky})`}} className="App">
     <Home/>
   </div>
 )
}

export default App;
