import React from 'react'
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import Login from './Login'
import Browse from './Browse';


const Body = () => {

    const apppRouter = createBrowserRouter([        
        {
          path: "/",
          element: <Login/>,
        },
        {
            path: "/browse",
            element: <Browse/>,
        }
    ])  
    
  
    return (
      <div className='overflow-x-hidden'>
        <RouterProvider router={apppRouter}/>
      </div>
      
    );
}

export default Body