import './App.css';
import { Button } from 'react-bootstrap';
import { createContext, useContext, useEffect, useState } from 'react';
import {createBrowserRouter, createHashRouter, Navigate, RouterProvider, useNavigate} from "react-router-dom";
import { Signin, Signup } from './components/Auth/Auth';
import Home from './pages/Home/Home';
import { validate } from './apis/server';
import { getCookie } from './utils/cookie';
import EpisodeDetails from './components/EpisodeDetails/EpisodeDetails';
import PodcastDetails from './pages/PodcastDetails/PodcastDetails';
import SpeakIt from './components/SpeakIt/SpeakIt';

// Router 

 

// App Started 
export const MyContext = createContext()
function App() {
 const [podcasts, setPodcasts] = useState([])

  const contextValue = {
   podcasts, setPodcasts
  }


  const router = createHashRouter([
    { path: "/podcast/episode/:feedId/:episodeId", element: <EpisodeDetails/> },
    { path: "/podcast/:id", element: <PodcastDetails/> },
    { path: "/signup", element: <Signup/> },
    { path: "/signin", element: <Signin/> },
    // { path: "/", element: <Home/>},
    { path: "/", element: <SpeakIt/>},
  ]);
  
  return (
    <div className="app">
        <MyContext.Provider value={contextValue} >
        <RouterProvider router={router} ></RouterProvider>
        </MyContext.Provider>
      {/* <RouterProvider router={router} >
        <MyContext.Provider value={contextValue} />
      </RouterProvider> */}
    </div>
  );
}

export default App;


function Protected(props){
  if(!getCookie('user')){
    return <Navigate to="/signin"  replace/>;
  }else{
    return props.children
  }
}