import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

export default class CreateDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    }
  }

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <Button onClick={() => this.setState({ open: true })}>Open alert dialog</Button>
        
      </div>
    );
  }
}