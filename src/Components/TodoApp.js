import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper, Button } from '@material-ui/core';
import { ConstructionRounded, LineAxisOutlined } from '@mui/icons-material';
import axios from 'axios';

export default function TodoApp() {
  
    const paperStyle={padding: '50px 20px', width:600,margin:"20px auto"}
    const [description, setDescription]=React.useState('')
    const [date, setDate]=React.useState('')
    const [tasks, setTasks]=React.useState([])
    const handleClick=(e)=>{
        e.preventDefault()
        const TodoApp={description,date}
        console.log(TodoApp)
        fetch("http://localhost:8080/todoModel/add",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(TodoApp)
        }).then(()=>{
            console.log("New task added")
        })
    }
   
    const handleDeleteClick=(id)=>{
      axios.delete("http://localhost:8080/todoModel/deleteTask/" + id).then(
        (response)=>{
          alert("Task has been deleted");
        }
      )
    }
    
   

    React.useEffect(()=>{
      fetch("http://localhost:8080/todoModel/findTasks")
      .then(res=>res.json())
      .then((result)=>{
        setTasks(result);
      }
    )
    },[])

  return (
    <Container>
        <Paper elevation={3} style={paperStyle}>
            <h1>Add task</h1>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1},
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="set description" variant="outlined" fullWidth 
      value={description}
      onChange={(e)=>setDescription(e.target.value)}
      />
      <TextField id="outlined-basic" label="set date" variant="outlined" fullWidth 
      value={date}
      onChange={(e)=>setDate(e.target.value)}
      />
      <Button color="secondary" onClick={handleClick}>Submit</Button>
    </Box>
    </Paper>

    <h1>Tasks:</h1>
    <Paper elevation={3} style={paperStyle}>
      {tasks.map(task=>(
        <Paper elevation={6} style={{margin:"10px",padding:"15px",textAlign:"left"}} key={task.id}>
          Id:{task.id}<br/>
          Description:{task.description}<br/>
          Date:{task.date}
          <Button color="secondary" onClick={()=>{handleDeleteClick(task.id)}}>Delete</Button>
          </Paper>
        
        ))
      }
    </Paper>
    </Container>
    
  );
}
