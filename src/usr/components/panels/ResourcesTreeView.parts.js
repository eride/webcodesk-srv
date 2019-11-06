import { withStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';

export const ResourceList = withStyles(theme => ({
  root: {
    width: '100%',
    // borderBottom: '1px solid #dddddd',
    boxSizing: 'border-box',
    overflow: 'hidden',
  },
}))(List);

export const ResourceListItem = withStyles(theme => ({
  root: {
    display: 'flex',
    width: '100%',
    // boxSizing: 'inherit',
    cursor: 'default',
    // '&:hover': {
      // backgroundColor: '#f7f7f7',
      // outline: '1px solid #f5f5f5'
    // },
    userSelect: 'none',
  },
  dense: {
    paddingTop: 0,
    paddingBottom: 0,
    // paddingLeft: '16px'
  },
  // todo: it does not work for selected item... try new version of MUI
  // selected: {
  //   // backgroundColor: 'rgba(0, 0, 0, 0.09)',
  //   backgroundColor: 'red',
  //   '&:hover': {
  //     backgroundColor: 'red',
  //   },
  // }
}))(ListItem);

export const ResourceListItemText = withStyles({
  root: {
    padding: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: 'flex',
    alignItems: 'center',
  }
})(ListItemText);

export const ResourceListItemErrorText = withStyles({
  root: {
    padding: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: 'flex',
    alignItems: 'center',
  },
  primary: {
    color: '#D50000',
  }
})(ListItemText);

export const ResourceListItemIcon = withStyles({
  root: {
    marginRight: 0,
    padding: 0,
    width: '20px',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center'
  }
})(ListItemIcon);

export const ResourceListItemExpandedIcon = withStyles({
  root: {
    marginRight: 0,
    padding: 0,
    width: '21px',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center'
  }
})(ListItemIcon);

export const ResourceListItemButton = withStyles({
  root: {
    padding: 0,
    fontSize: '1em',
  }
})(IconButton);

export const ResourceListSubheader = withStyles(theme => ({
  root: {
    cursor: 'pointer',
    lineHeight: 'normal',
    paddingTop: '3px',
    paddingBottom: '3px',
    backgroundColor: '#f5f5f5',
    '&:hover': {
      backgroundColor: '#dddddd',
      color: '#1e1e1e'
    },
  }
}))(ListSubheader);

export const ResourceSubheaderErrorBadge = withStyles(theme => ({
  colorSecondary: {
    width: '10px',
    height: '10px',
    top: '-3px',
    right: '-10px',
  }
}))(Badge);