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

const styles = theme => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridTemplateRows: 'min-content',
    gridGap: '8px',
    alignItems: 'flex-start'
  }
});

class Grid1ColumnVerticalRows extends React.Component {
  render () {
    const {classes, children} = this.props;
    return (
      <div className={classes.root}>
        {children}
      </div>
    );
  }
}

export default withStyles(styles)(Grid1ColumnVerticalRows);
