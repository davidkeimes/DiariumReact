import React, { Component } from 'react';
import EntryStore from "../stores/EntryStore";
import * as EntryActions from "../actions/EntryActions";
import ReactQuill from 'react-quill'
import theme from 'react-quill/dist/quill.snow.css'
import Button from 'material-ui/Button';
import SaveIcon from 'material-ui-icons/Save';
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

class EntryEditor extends Component {
  constructor(props) {
    super(props);
    this.state = { text: this.props.entry.content }
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    if(this.props.entry._id === undefined){
      setTimeout(() =>  {this.props.onInitialize()}, 50);
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({text: nextProps.entry.content});
    console.log('new props')
  }

  handleChange(value) {
    this.setState({ text: value });
    //var updatedEntry = this.props.entry;
    //updatedEntry.content = value;
    //EntryActions.setActiveEntry(updatedEntry)
  }

  saveEntry() {
    var updatedEntry = this.props.entry;
    updatedEntry.content = this.state.text;
    EntryActions.saveEntry(updatedEntry);
  }

  render() {
    const modules = {
      toolbar: [
        [{ 'size': ['small', false, 'large', 'huge'] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'align': [] }],
        ['link', 'image', 'video', 'code-block']
      ]
    }

    return (
      <div style={styles.container}>
        <h2 style={{marginBottom:'0px'}}>{this.props.entry.name}</h2>
        <h6 style={{marginTop:'2px', color:'#757575'}}>{'created on ' + this.props.entry.created_date}</h6>
        <ReactQuill 
          theme="snow" 
          modules={modules} 
          value={this.state.text}
          onChange={this.handleChange}>
        </ReactQuill>
        <Link 
          key={'edit/'+this.props.entry._id} 
          to={"/entry/"+this.props.entry._id}  
          style={{ textDecoration: 'none'}}>
          <Button fab color="primary" style={styles.fab} onClick={() => this.saveEntry()}>
            <SaveIcon />
          </Button>
        </Link>
      </div>
    );
  }
}

export default EntryEditor;