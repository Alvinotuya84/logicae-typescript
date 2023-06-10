import { makeStyles } from '@material-ui/styles';
import { Container, Grid, IconButton, InputLabel, MenuItem, Pagination, Select, Skeleton, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import AddBoxIcon from '@mui/icons-material/AddBox';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { useDispatch } from 'react-redux';
import { getJokes } from '../redux/jokesSlice';
import { AppDispatch, RootState } from '../redux/store';
import { Joke } from '../types';
import { formatDate, obfuscateEmail } from '../utils/functions';






function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}


const useStyles = makeStyles({
  table: {
    borderCollapse: 'separate',
    '& th': {
      borderBottom: 'none',
    },
    '& td': {
      borderRight: '1px solid rgba(224, 224, 224, 1)',
    },
    '& td:last-child': {
      borderRight: 'none',
    },
  },
});



export default function Jokes() {
  const {loading, jokes} = useSelector((state:RootState) => state.jokes);

  

  const classes = useStyles();

  const [page, setPage] = React.useState<number>(1);
  const [limit, setLimit] = React.useState<any>(10);
  const [jokesFilterered, setJokesFiltered] = React.useState(jokes)
  const [sortKey, setSortKey] = React.useState('');
  const [sortOrder, setSortOrder] = React.useState('asc');
  const [sortViewOrder, setViewsSortOrder] = React.useState('asc');

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const dispatch=useDispatch<AppDispatch>()


  
  const handleSort = (key:string) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
      setViewsSortOrder(sortViewOrder === 'asc' ? 'desc' : 'asc');

    } else {
      setSortKey(key);
      setSortOrder('asc');
      setViewsSortOrder('asc');

    }
  };

  const handleFilter = (event:any) => {
     const searchValue = event.target.value;
     const filteredItems = jokes.filter(
       (item:Joke) =>
         item.Views==searchValue ||
         formatDate(item.CreatedAt).toLowerCase().includes(searchValue)
     );
     setJokesFiltered(filteredItems);
  };

  const sortByCreatedAtOrViews=(jokesFilterered:Joke[])=>{
    let filteredItems=jokesFilterered

     let sortedData = filteredItems.slice().sort((a, b) => {
       if (sortKey === 'CreatedAt') {
          return sortOrder === 'asc'
            ? a.CreatedAt - b.CreatedAt
            : b.CreatedAt - a.CreatedAt;
       } else if (sortKey === 'Views') {
          return sortViewOrder === 'asc' ? a.Views - b.Views : b.Views - a.Views;
       }
       return 0;
     });
     setJokesFiltered(sortedData)

  }



  React.useEffect(() => {
    dispatch(getJokes({
      page,
      limit,
    }))
    console.log(limit)
  }, [page,limit])
  React.useEffect(()=>{
    if(jokes.length>0){
      setJokesFiltered(jokes)

    }
  }
    ,[jokes]
  )
  const navigate = useNavigate();
  

  

  
 
const handleViewsColor=(views:number)=>{
  switch(true){

    case views >= 0 && views <= 25:
      return'tomato'
      case views >= 26 && views <= 50:
        return 'orange'
      case views >= 51 && views <= 75:
        return 'yellow'
      case views >= 76 && views <= 100:
        return 'green'
      default:
          return 'tomato';
  }
}

  return (
    <React.Fragment>

<Button 
onClick={()=>navigate('/add-edit-joke',{state:{
  editMode:false
}})}
variant="contained" sx={{
                margin:3
              }} endIcon={<AddBoxIcon />}>
  Add
  
</Button> 
<TextField id="filter" label="Filter By Views or Date" variant="outlined" 
onChange={(e)=>handleFilter(e)}
/>

      <Table className={classes.table}   sx={{
    [`& .${tableCellClasses.root}`]: {
      borderBottom: "none"
    }
  }} size="small">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Author</TableCell>
            <TableCell>Created At

            <IconButton onClick={()=>{
                sortByCreatedAtOrViews(jokesFilterered)
                handleSort('CreatedAt')}}>
              {sortOrder === 'asc'?(
                <ArrowDropDown/>
              ):(<ArrowDropUpIcon/>)}
              </IconButton>
            </TableCell>
            <TableCell>Views
              <IconButton onClick={()=>{
                sortByCreatedAtOrViews(jokesFilterered)
                handleSort('Views')}}>
              {sortViewOrder === 'asc'?(
                <ArrowDropDown/>
              ):(<ArrowDropUpIcon/>)}
              </IconButton>
              </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
          
          loading?
          [1,2,3,4,5].map((_, i)=>         (
            
            <TableRow key={i}>
              <TableCell><Skeleton width={100} height={20}/></TableCell>
              <TableCell><Skeleton width={100} height={20}/></TableCell>
              <TableCell><Skeleton width={100} height={20}/></TableCell>
              <TableCell><Skeleton width={100} height={20}/></TableCell>
            </TableRow>
          ))
 :
          
 jokesFilterered.map((joke) => joke?.CreatedAt?(
  <TableRow key={joke.id}>
  <TableCell>      <Button color="primary"  onClick={(e)=>{
    
    
    preventDefault(e)
    
    navigate('/add-edit-joke',{ state: { joke, editMode:true } })
    }}>
  {joke.Title} 
</Button></TableCell>
  <TableCell>{obfuscateEmail(joke.Author)}</TableCell>
  <TableCell>{formatDate(joke.CreatedAt)}</TableCell>
  <TableCell><span style={{color:handleViewsColor(joke.Views)}}>{joke.Views}</span></TableCell>
</TableRow>
 ):null)}
        </TableBody>
      </Table>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item sm={12} lg={12} xs={12}>
              <Pagination count={5}  page={page} onChange={handleChange}/>

              </Grid>
              <Grid item sm={4} lg={4} xs={4}>
              <InputLabel id="limit">Limit</InputLabel>
        <Select
          labelId="limit"
          id="limit"
          value={limit}
          label="Limit"
          onChange={(e)=>setLimit(e.target.value)}
        >
          <MenuItem value={5}>Five</MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
        </Select>
</Grid>
            </Grid>
          </Container>
    </React.Fragment>
  );
}