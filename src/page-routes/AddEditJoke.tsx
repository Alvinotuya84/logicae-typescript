import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import CloseIcon from '@mui/icons-material/Close';
import TrashIcon from "@mui/icons-material/Delete"
import {useDispatch,useSelector} from 'react-redux'

import { useNavigate,useLocation } from "react-router-dom";
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { convertDateToTimeStamp, inputFormartedDate } from '../utils/functions';
import { AppDispatch, RootState } from '../redux/store';
import { addJoke, deleteJoke, updateJoke } from '../redux/jokesSlice';
import CircularProgress from '@mui/material/CircularProgress';


function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        Logicae
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const defaultTheme = createTheme();

export default function AddEditJoke() {
    const {loading} = useSelector((state:RootState) => state.jokes);

    const dispatch =useDispatch<AppDispatch>()

    const location=useLocation()
    const navigate = useNavigate();
    console.log(inputFormartedDate(location?.state?.joke?.CreateAt))

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  



    const data = new FormData(event.currentTarget);

    if(!location?.state?.editMode){
        dispatch(addJoke({
            Title:data.get('title'),
            Views:data.get('views'),
            Author:data.get('author'),
            CreatedAt:convertDateToTimeStamp(data.get('created_at')),
         }))
    }else{
        dispatch(updateJoke({
            id:location?.state.joke?.id,
            Title:data.get('title'),
            Views:data.get('views'),
            Author:data.get('author'),
            CreatedAt:convertDateToTimeStamp(data.get('created_at')),
         }))
    }





  };

 React.useEffect(() => {

    
}, [])
  


  

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {
                location.state.editMode? 'Update' : 'Add'
            }
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              label="Title"
              name="title"
              autoFocus
              value={location?.state?.joke?.Title}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="author"
              label="Author"
              type="text"
              id="author"
              value={location?.state?.joke?.Author}
            />

             <TextField
              margin="normal"
              required
              fullWidth
              name="views"
              label="Views"
              type="number"
              id="views"
              value={location?.state?.joke?.Views}
            />
                         <TextField
              margin="normal"
              required
              fullWidth
              name="created_at"
              label="Created At"
              type="date"
              id="created_at"
              value={location?.state?.joke?.CreatedAt?inputFormartedDate(location?.state?.joke?.CreatedAt):null}
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color='secondary'
              disabled={loading}
            >
               {
                loading&&(
                    <CircularProgress/>
                )
               } 
              {
              location?.state?.editMode?'Update Joke':'Add Joke'
              } 
            </Button>
          </Box>
          {
            location?.state?.editMode && (
                <Button 
                
                onClick={()=>{
                    
                
                    if(confirm("Are you sure you want to delete this Joke?")){
                        dispatch(deleteJoke(location?.state?.joke?.id))
                
                    }else{}
                
                }
                
                
                }
                
                color="error" sx={{
                                margin:3
                              }} endIcon={<TrashIcon />}
                              
                                              disabled={loading}

                              >
                  
                Delete 
                </Button>
            )
          }  
          <Button 
onClick={()=>navigate('/home')}
variant="contained" sx={{
                margin:3
              }} endIcon={<CloseIcon />}>
  Close
  
</Button>         </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}