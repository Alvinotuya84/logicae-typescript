import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AuthProvider } from './contexts/auth.tsx';
import { createBrowserRouter ,RouterProvider} from 'react-router-dom';
import { routes } from './routes/index.tsx';
import { Provider } from 'react-redux';
import store from './redux/store.ts';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { OverallThemeProvider } from './contexts/theme.tsx';



const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


const router = createBrowserRouter(routes);


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
    <OverallThemeProvider>
    <CssBaseline />

            <AuthProvider>
            <RouterProvider router={router}/>

            <App />



      </AuthProvider>
      </OverallThemeProvider>

      </Provider>

  </React.StrictMode>,
)
