import { StrictMode } from 'react' // a helper that catches potenial react issues
import { createRoot } from 'react-dom/client' // creates the react app inside the broswer
import App from './App.jsx' // imports my pixie progress app

createRoot(document.getElementById('root')).render( // finds my html <div id="root"></div>
  <StrictMode> {/*helps catch bugs that will cause bugs later */}
    <App />  {/*displays my app */}
  </StrictMode>, // i know i can remove this <strictMODE></StrictMode> and leave the app but i'll just leave it 
)
