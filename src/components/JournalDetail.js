import React, { Component } from 'react';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { Link } from 'react-router-dom';
import * as EntryActions from "../actions/EntryActions";
import DeleteIcon from 'material-ui-icons/Delete';

const styles = {
  container: {
    margin: 'auto', 
    marginTop: '2em',
    maxWidth: '816px',
    width: '100%',
    backgroundColor: 'white',
  }
} 

class JournalDetail extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if(this.props.entries.length === 0 && this.props.big){
      setTimeout(() =>  {this.props.onInitialize()}, 50);
    }
  }

  handleEntryClick(entry) {
    EntryActions.setActiveEntry(entry);
  }

  handleDeleteClick(e, entry) {
    e.preventDefault();
    EntryActions.deleteEntry(entry);
  }

  render() {
    let entries = null;
    if(this.props.big) {
      entries = this.props.entries.map((entry, index) =>
        <Link key={entry._id+index+entry.name} to={"/entry/"+entry._id}  style={{ textDecoration: 'none'}}>
          <ListItem onClick={() => this.handleEntryClick(entry)}>
            <ListItemText primary={entry.name} secondary={'Entry #' + index + ' from the ' + entry.created_date}/>
            <ListItemIcon><DeleteIcon onClick={(e) => this.handleDeleteClick(e, entry)}/></ListItemIcon>
          </ListItem>
          <Divider />
        </Link>
      );
    } else {
      entries = this.props.entries.map((entry, index) =>
        <Link key={entry._id+index+entry.name} to={"/entry/"+entry._id}  style={{ textDecoration: 'none'}}>
          <ListItem onClick={() => this.handleEntryClick(entry)}>
            <ListItemText primary={entry.name} />
          </ListItem>
          <Divider />
        </Link>
      );
    }
    
    let list = null;
    if(this.props.big) {
      list = (
        <div style={styles.container}>
          <List style={{paddingBottom:'0px', marginBottom:'2em'}}>
            {entries}
          </List>
        </div>
      );
    } else {
      list = (
        <List style={{paddingTop:'0px', paddingBottom:'0px', marginBottom:'2em'}}>
            {entries}
        </List>
      );
    }
    return(
      <div>
        {list}
      </div>
    );
  }
}

export default JournalDetail;