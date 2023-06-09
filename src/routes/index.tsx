import { Route } from "../types";
import { RouteObject} from 'react-router-dom';

import Login from "../page-routes/auth/Login";
import ProtectedLayout from "../page-routes/ProtectedLayout";
import Jokes from "../page-routes/Jokes";
import AddEditJoke from "../page-routes/AddEditJoke";

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
