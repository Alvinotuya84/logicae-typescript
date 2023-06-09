import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { makeStyles } from '@material-ui/styles';
import {Pagination, Skeleton, Typography} from '@mui/material'
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom'

import AddBoxIcon from '@mui/icons-material/AddBox';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { getJokes } from '../redux/jokesSlice';
import { formatDate, obfuscateEmail } from '../utils/functions';
import { Joke } from '../types';

// Generate Order Data
function createData(
  id: number,
  date: string,
  name: string,
  shipTo: string,
  paymentMethod: string,
  amount: number,
) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(
    0,
    '16 Mar, 2019',
    'Elvis Presley',
    'Tupelo, MS',
    'VISA ⠀•••• 3719',
    312.44,
  ),
  createData(
    1,
    '16 Mar, 2019',
    'Paul McCartney',
    'London, UK',
    'VISA ⠀•••• 2574',
    866.99,
  ),
  createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
  createData(
    3,
    '16 Mar, 2019',
    'Michael Jackson',
    'Gary, IN',
    'AMEX ⠀•••• 2000',
    654.39,
  ),
  createData(
    4,
    '15 Mar, 2019',
    'Bruce Springsteen',
    'Long Branch, NJ',
    'VISA ⠀•••• 5919',
    212.79,
  ),
];

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

  const classes = useStyles();

  const [page, setPage] = React.useState<number>(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const dispatch=useDispatch<AppDispatch>()
  const {loading, error, jokes} = useSelector((state:RootState) => state.jokes);

  React.useEffect(() => {
    dispatch(getJokes(page))
  }, [page])
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
      <Table className={classes.table}   sx={{
    [`& .${tableCellClasses.root}`]: {
      borderBottom: "none"
    }
  }} size="medium">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Author</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell>Views</TableCell>
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
          
          jokes.map((joke) => (
            <TableRow key={joke.id}>
              <TableCell>      <Link color="primary"  onClick={(e)=>{
                
                
                preventDefault(e)
                
                navigate('/add-edit-joke',{ state: { joke, editMode:true } })
                }} sx={{ mt: 3 }}>
              {joke.Title} 
      </Link></TableCell>
              <TableCell>{obfuscateEmail(joke.Author)}</TableCell>
              <TableCell>{formatDate(joke.CreatedAt)}</TableCell>
              <TableCell><span style={{color:handleViewsColor(joke.Views)}}>{joke.Views}</span></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination count={5}  page={page} onChange={handleChange}/>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more Page {page}
      </Link>
    </React.Fragment>
  );
}