import { RouteObject } from 'react-router-dom';

import AddEditJoke from "../page-routes/AddEditJoke";
import Jokes from "../page-routes/Jokes";
import ProtectedLayout from "../page-routes/ProtectedLayout";
import Login from "../page-routes/auth/Login";

export const routes: RouteObject[]=[
    {
        path:"/",
        element:<ProtectedLayout/>,
        children:[
            {
                path:"/home",
                element:<Jokes/>
            },
            {
                path:"/add-edit-joke",
                element:<AddEditJoke/>
            },

        
        ]
    },
    {
        path:"/login",
        element:<Login/>
    },

    
]
