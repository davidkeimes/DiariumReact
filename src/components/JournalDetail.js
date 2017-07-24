import React, { Component } from 'react';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';
import { Link } from 'react-router-dom';
import * as EntryActions from "../actions/EntryActions";

const styles = {
  container: {
    margin: 'auto', 
    padding: '1em', 
    maxWidth: '900px',
    width: '100%',
  }
} 

class JournalDetail extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //if there are no entries, try to initialize
    if(!this.props.entries.length > 0){
      this.props.onInitialize();
    }
  }

  handleEntryClick(entry) {
    EntryActions.setActiveEntry(entry);
  }

  render() {
    const entries = this.props.entries.map((entry, index) =>
      <Link key={entry._id+index+entry.name} to={"/entry/"+entry._id}  style={{ textDecoration: 'none'}}>
        <ListItem onClick={() => this.handleEntryClick(entry)}>
          <ListItemText primary={entry.name} />
        </ListItem>
      </Link>
    );

    return(
      <div style={styles.container}>
        <List>
          {entries}
        </List>
      </div>
    );
  }
}

export default JournalDetail;