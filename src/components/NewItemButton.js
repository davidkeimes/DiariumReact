import React, { Component } from 'react';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import CreateDialog from './CreateDialog';

class NewItemButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{ width: '100%' }}>
        <Button 
          color="primary" 
          style={{ width: '100%', margin: 'auto', paddingRight: this.props.padding }}
          onClick={this.props.onClick}>
          <AddIcon /> {this.props.itemName}
        </Button>
      </div>
    );
  }
}

export default NewItemButton;