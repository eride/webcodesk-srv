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
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import DialogContentText from '@material-ui/core/DialogContentText';

class DeletePageDialog extends React.Component {
  static propTypes = {
    isOpen: PropTypes.bool,
    resourceName: PropTypes.string,
    resource: PropTypes.object,
    onClose: PropTypes.func,
    onSubmit: PropTypes.func,
  };

  static defaultProps = {
    isOpen: false,
    resourceName: '',
    resource: null,
    onClose: () => {
      console.info('DeletePageDialog.onClose is not set');
    },
    onSubmit: () => {
      console.info('DeletePageDialog.onSubmit is not set');
    },
  };

  shouldComponentUpdate (nextProps, nextState, nextContext) {
    const { isOpen, resource } = this.props;
    return isOpen !== nextProps.isOpen || resource !== nextProps.resource;
  }

  handleClose = () => {
    this.props.onClose(false);
  };

  handleSubmit = () => {
    const { onSubmit, resource } = this.props;
    onSubmit(resource);
  };

  render () {
    const { isOpen, resource, resourceName } = this.props;
    if (!isOpen) {
      return null;
    }
    return (
      <Dialog
        aria-labelledby="DeletePageDialog-dialog-title"
        onClose={this.handleClose}
        open={isOpen}
        maxWidth="xs"
        fullWidth={true}
      >
        <DialogTitle id="DeletePageDialog-dialog-title">Delete "{resourceName || resource.displayName}"</DialogTitle>
        <DialogContent>
          <DialogContentText>
            The selected page is going to be deleted.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="secondary">
            Cancel
          </Button>
          <Button type="submit" onClick={this.handleSubmit} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default DeletePageDialog;
