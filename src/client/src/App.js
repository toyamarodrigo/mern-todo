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
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import './App.css';

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
  });
  const [snackBar, setSnackBar] = useState(false);
  const handleInputChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSnackBar = (e) => {
    setSnackBar(true);
  };

  const handleCloseSnackbar = (e, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackBar(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(task);

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
  };

  useEffect(() => {

    

  }, [input])

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
                  <Button variant="contained" color="secondary">
                    Secondary
                  </Button>
                </CardContent>
              </form>
            </Card>
          </Grid>
          <Grid item xs={7}>
            texto
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
