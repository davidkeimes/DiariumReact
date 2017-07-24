import React, { Component } from 'react';
import EntryStore from "../stores/EntryStore";
import * as EntryActions from "../actions/EntryActions";
import ReactQuill from 'react-quill'
import theme from 'react-quill/dist/quill.snow.css'

const styles = {
  container: {
    margin: 'auto',
    padding: '1em',
    maxWidth: '900px'
  }
}

class EntryEditor extends Component {
  constructor(props) {
    super(props);
    this.state = { text: this.props.entry.content }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(value) {
    this.setState({ text: value })
    var updatedEntry = this.props.entry;
    updatedEntry.content = value;
    EntryActions.setActiveEntry(updatedEntry)
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
        <ReactQuill 
          theme="snow" 
          modules={modules} 
          value={this.state.text}
          onChange={this.handleChange}>
        </ReactQuill>
      </div>
    );
  }
}

export default EntryEditor;