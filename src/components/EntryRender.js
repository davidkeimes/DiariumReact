import React, { Component } from 'react';
import ReactQuill from 'react-quill'
import theme from 'react-quill/dist/quill.snow.css'
import Button from 'material-ui/Button';
import ModeEditIcon from 'material-ui-icons/ModeEdit';
import { Link } from 'react-router-dom';

const styles = {
  container: {
    margin: 'auto',
    marginTop: '2em',
    padding: '1em',
    maxWidth: '816px',
    backgroundColor: 'white'
  },
  fab: {
    position: 'absolute',
    right: '150px',
    top: '75px',
    zIndex: '1000'
  }
}

class EntryRender extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if(this.props.entry._id === undefined){
      setTimeout(() =>  {this.props.onInitialize()}, 50);
    }
  }

  render() {
    const markup = {
      __html: this.props.entry.content
    }
    return (
      <div style={styles.container}>
        <h2 style={{marginBottom:'0px'}}>{this.props.entry.name}</h2>
        <h6 style={{marginTop:'2px', color:'#757575'}}>{'created on ' + this.props.entry.created_date}</h6>
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