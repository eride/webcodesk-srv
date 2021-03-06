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
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  contentWrapper: {
    position: 'absolute',
    top: '32px',
    left: 0,
    right: 0,
    bottom: 0,
    padding: '5px',
    overflow: 'auto',
  },
  contentWrapperNoOverflow: {
    position: 'absolute',
    top: '32px',
    left: 0,
    right: 0,
    bottom: 0,
    padding: '5px',
    overflow: 'hidden',
  },
  coverContentWrapper: {
    position: 'absolute',
    top: '32px',
    left: 0,
    right: 0,
    bottom: 0,
    // boxShadow: '0 22px 22px -22px rgba(255, 255, 255, 0.8) inset, 0 -22px 22px -22px rgba(255, 255, 255, 0.8) inset',
    zIndex: 5,
  },
  titleBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#f5f5f5',
    padding: '5px',
    overflow: 'hidden',
  },
  titleText: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis'
  }
});

class PanelWithTitle extends React.Component {
  static propTypes = {
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    noOverflow: PropTypes.bool,
  };

  static defaultProps = {
    title: null,
    noOverflow: false,
  };

  // constructor (props, context) {
  //   super(props, context);
  // }

  render () {
    const { classes, title, noOverflow, children } = this.props;
    return (
      <div className={classes.root}>
        {title && (
          <div className={classes.titleBar}>
            <Typography variant="subtitle2" className={classes.titleText}>
              {title}
            </Typography>
          </div>
        )}
        <div className={noOverflow ? classes.contentWrapperNoOverflow : classes.contentWrapper}>
          {children}
        </div>
        {/*{noOverflow && (*/}
        {/*  <div className={classes.coverContentWrapper} />*/}
        {/*)}*/}
      </div>
    );
  }
}

export default withStyles(styles)(PanelWithTitle);
