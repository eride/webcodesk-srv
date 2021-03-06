/*
 *    Copyright 2019 Alex (Oleksandr) Pustovalov
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';

const LoadingProgress = withStyles(theme => ({
  root: {
    borderRadius: '4px',
    height: '6px'
  }
}))(LinearProgress);

const styles = theme => ({
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    zIndex: 10
  },
  progress: {
    width: '30%',
    padding: '1em',
    marginTop: '20%'
  }
});

class LoadingPopover extends React.Component {
  render () {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.progress}>
          <Typography variant="overline" align="center">Loading...</Typography>
          <div>
            <LoadingProgress />
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(LoadingPopover);
