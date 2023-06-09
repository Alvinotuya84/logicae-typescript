import React, {useState, useContext, createContext, useEffect, useCallback} from 'react';
import { User } from '../types';

const authContext = createContext<AuthMethods>({user: {}, setUser: undefined});

export function AuthProvider({children}: any) {
    const user = useAuthProvider();

    return <authContext.Provider value={user}>{children}</authContext.Provider>;
}

export const useAuthContext = () => useContext(authContext);

interface AuthMethods {
    user: User;
    setUser: any;
}

function useAuthProvider() {
    const [user, setUser] = useState<User | {}>({});




    useEffect(() => {
        let profile:User;
        if(localStorage.getItem('profile')){
         const data = localStorage.getItem('profile');
             if (data !== null) {
             profile = JSON.parse(data);
             setUser(profile)
     }
        }
        console.log(user)
        
    }, []);



    return {
        user,
        setUser,
    };
}
