import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
}))

function Header() {
  const classes = useStyles()

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Typography style={appNameStyle} variant="h6">
          Covid19 Stats
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Header

const appNameStyle = {
  flexGrow: 1,
}
