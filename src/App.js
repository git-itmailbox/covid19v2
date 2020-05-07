import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom'

import Container from '@material-ui/core/Container'

import './App.css'
import Summary from './pages/summary/Summary'
import Home from './pages/home/Home'
import Detailed from './pages/detailed/Detailed'
import Header from './Header'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Drawer from '@material-ui/core/Drawer'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import Toolbar from '@material-ui/core/Toolbar'
import { Button } from '@material-ui/core'

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
    padding: theme.spacing(3),
  },
}))

function App() {
  const classes = useStyles()
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
              {['Home', 'Summary', 'Detailed', 'Drafts'].map((text, index) => (
                <ListItem button key={text} component={Link} to={`/${text}`}>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
            <Divider />
            <List>
              {['Trash'].map((text, index) => (
                <ListItem button key={text}>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
          </div>
        </Drawer>

        <main className={classes.content}>
          <Toolbar />
          <Container maxWidth="md">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/summary">
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
