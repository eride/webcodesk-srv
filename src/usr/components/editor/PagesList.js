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
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import green from '@material-ui/core/colors/green';

const PagesListItem = withStyles(theme => ({
  root: {
    alignItems: 'flex-start',
    position: 'relative'
  },
  dense: {
    paddingTop: '0px',
    paddingBottom: '0px',
    '&:hover': {
      backgroundColor: '#eceff1',
    },
    userSelect: 'none',
    borderRadius: '4px',
  }
}))(ListItem);

const PagesListItemText = withStyles({
  root: {
    padding: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }
})(ListItemText);

const styles = theme => ({
  root: {
    padding: '10px',
    minWidth: '200px',
  },
  testItemText: {
    // fontWeight: 700,
    color: green['700'],
  },
});

class PagesList extends React.Component {
  static propTypes = {
    pages: PropTypes.array,
    selectedPage: PropTypes.object,
    onChangeSelected: PropTypes.func,
  };

  static defaultProps = {
    pages: [],
    selectedPage: {},
    onChangeSelected: () => {
      console.info('PagesList.onChangeSelected is not set');
    }
  };

  handleListItemClick = (index) => (event) => {
    const { pages, onChangeSelected } = this.props;
    onChangeSelected(pages[index]);
  };

  render () {
    const { classes, selectedPage, pages } = this.props;
    const list = [];
    if (pages && pages.length > 0) {
      pages.forEach((page, index) => {
        let itemTextClassNames = '';
        if (page.isTest) {
          itemTextClassNames = classes.testItemText;
        }
        list.push(
          <PagesListItem
            key={`pageItem_${page.pagePath}`}
            button={true}
            selected={selectedPage.pagePath === page.pagePath}
            onClick={this.handleListItemClick(index)}
          >
            <PagesListItemText primary={<span className={itemTextClassNames}>{`/${page.pagePath}`}</span>} />
          </PagesListItem>
        );
      });
    }
    return (
      <div className={classes.root}>
        <List component="nav" disablePadding={true} dense={true}>
          {list}
        </List>
      </div>
    );
  }
}

export default withStyles(styles)(PagesList);
