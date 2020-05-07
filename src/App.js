import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom'
import './App.css'

import Summary from './pages/summary/Summary'
import Home from './pages/home/Home'
import Detailed from './pages/detailed/Detailed'
import Header from './Header'
import list from './MenuItems'

import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Toolbar from '@material-ui/core/Toolbar'
import Icon from '@material-ui/core/Icon'

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    marginLeft: drawerWidth,
    padding: theme.spacing(3),
  },
}))

function App() {
  const classes = useStyles()

  const links = list

  return (
    <div>
      <CssBaseline />
      <Header />
      <Router>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <Toolbar />
          <div className={classes.drawerContainer}>
            <List>
              {links.map((link, index) => (
                <ListItem
                  button
                  key={link.title}
                  component={Link}
                  to={link.path}
                >
                  <ListItemIcon>
                    <Icon>{link.icon}</Icon>
                  </ListItemIcon>
                  <ListItemText primary={link.title} />
                </ListItem>
              ))}
            </List>
          </div>
        </Drawer>

        <main className={classes.content}>
          <Toolbar />
          <Container>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/summary">
                <Summary />
              </Route>
              <Route path="/detailed">
                <Detailed />
              </Route>
              <Route path="*">
                <Redirect to="/" />
              </Route>
            </Switch>
          </Container>
        </main>
      </Router>
    </div>
  )
}

export default App
