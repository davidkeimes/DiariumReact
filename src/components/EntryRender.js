import React, { Component } from 'react';
import EntryStore from "../stores/EntryStore";
import * as EntryActions from "../actions/EntryActions";
import ReactQuill from 'react-quill'
import theme from 'react-quill/dist/quill.snow.css'
import Button from 'material-ui/Button';
import ModeEditIcon from 'material-ui-icons/ModeEdit';
import { Link } from 'react-router-dom';

const styles = {
  container: {
    margin: 'auto',
    padding: '1em',
    maxWidth: '900px'
  },
  fab: {
    position: 'fixed',
    right: '115px',
    top: '100px',
    zIndex: '1000'
  }
}

class EntryRender extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const markup = {
      __html: this.props.entry.content
    }
    return (
      <div style={styles.container}>
        <div className="ql-container ql-snow">
          <div id="entryContent" className="ql-editor" dangerouslySetInnerHTML={markup}>
          </div>
        </div>
        <Link to={"/edit/"+this.props.entry._id}>
          <Button fab color="primary" style={styles.fab}>
            <ModeEditIcon />
          </Button>
        </Link>
      </div>
    );
  }
}

export default EntryRender;