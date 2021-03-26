import React, { useState, useEffect } from 'react';
import {
  Button,
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  FormControl,
  InputLabel,
  Input,
  Snackbar,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const App = () => {
  const classes = useStyles();

  const [task, setTask] = useState({
    title: '',
    description: '',
    _id: '',
  });

  const [taskList, setTaskList] = useState([]);
  const [snackBar, setSnackBar] = useState(false);

  const handleInputChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSnackBar = (message) => {
    setSnackBar(true);
    return message;
  };

  const handleCloseSnackbar = (e, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackBar(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (task.id) {
      await fetch(`/api/tasks/${task.id}`, {
        method: 'PUT',
        body: JSON.stringify(task),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setTask({ title: '', description: '', _id: '' });
          fetchTask();
        });
      console.log('Updating task');
    } else {
      await fetch('http://localhost:5000/api/tasks', {
        method: 'POST',
        body: JSON.stringify(task),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => {
          handleSnackBar();
        })
        .catch((err) => console.log(err));

      console.log('Adding task');
    }

    fetchTask();
  };

  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: 'DELETE',
      body: JSON.stringify(task),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((res) => {
        res.json();
      })
      .then((data) => {
        console.log(data);
      });
    fetchTask();
  };

  const editTask = async (id) => {
    await fetch(`http://localhost:5000/api/tasks/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTask({
          title: data.title,
          description: data.description,
          id: data._id,
        });
        console.log(data);
      });
  };

  const fetchTask = async () => {
    await fetch('http://localhost:5000/api/tasks', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTaskList(data);
      });
  };

  useEffect(() => {
    fetchTask();
  }, [task]);

  return (
    <Box className="App">
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              MERN TODO
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <Card>
              <form onSubmit={handleSubmit}>
                <CardContent>
                  <FormControl fullWidth={true} required={true}>
                    <InputLabel htmlFor="title">Title</InputLabel>
                    <Input
                      id="title"
                      name="title"
                      onChange={handleInputChange}
                      value={task.title}
                    />
                  </FormControl>
                </CardContent>
                <CardContent>
                  <FormControl fullWidth={true} required={true}>
                    <InputLabel htmlFor="description">Description</InputLabel>
                    <Input
                      id="description"
                      name="description"
                      onChange={handleInputChange}
                      value={task.description}
                    />
                  </FormControl>
                </CardContent>
                <CardContent>
                  <Button type="submit" variant="contained" color="primary">
                    Primary
                  </Button>
                </CardContent>
              </form>
            </Card>
          </Grid>
          <Grid item xs={7}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {taskList.map((task) => {
                    return (
                      <TableRow key={task._id}>
                        <TableCell>{task.title}</TableCell>
                        <TableCell>{task.description}</TableCell>
                        <TableCell>
                          <Button
                            color="primary"
                            onClick={() => editTask(task._id)}
                          >
                            edit
                          </Button>
                          <Button
                            color="secondary"
                            onClick={() => deleteTask(task._id)}
                          >
                            delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Container>
      <Snackbar
        open={snackBar}
        onClose={handleCloseSnackbar}
        message="Task added"
        autoHideDuration={6000}
      />
    </Box>
  );
};

export default App;
