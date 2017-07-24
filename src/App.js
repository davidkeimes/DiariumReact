import React, { Component } from 'react';
import { Route, Switch, Redirect, Link } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';

import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

import Home from "./components/Home";
import JournalDetail from "./components/JournalDetail";
import EntryRender from "./components/EntryRender";
import EntryEditor from "./components/EntryEditor";
import NewItemButton from "./components/NewItemButton";
import CreateDialog from "./components/CreateDialog";

//temp
import * as JournalActions from "./actions/JournalActions";
import JournalStore from "./stores/JournalStore";
import * as EntryActions from "./actions/EntryActions";
import EntryStore from "./stores/EntryStore";

const styles = {
  container: {
    width: '100%',
    display: 'flex',
    alignItems: 'stretch'
  },
  paper: {
    width: '250px',
  },
  appBar: {
    width: 'calc(100% - 250px)',
    paddingLeft: '250px'
  },
  content: {
    transition: 'margin-left 450ms cubic-bezier(0.23, 1, 0.32, 1)',
    width: 'calc(100% - 250px)',
    paddingLeft: '250px',
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      journals: [],
      entries: [],
      activeJournal: null,
      activeEntry: null,
      dialogOpen: false,
      journalName: null,
      journalImgURL: null,
      entryName: null
    };

    // this. binding
    this.getJournals = this.getJournals.bind(this);
    this.getEntries = this.getEntries.bind(this);
    this.handleJournalClick = this.handleJournalClick.bind(this);
    this.initializeEntries = this.initializeEntries.bind(this);
    this.handleCreateJournalClick = this.handleCreateJournalClick.bind(this);
    this.handleCreateEntryClick = this.handleCreateEntryClick.bind(this);
    this.createJournal = this.createJournal.bind(this);
    this.createEntry = this.createEntry.bind(this);
  }

  componentWillMount() {
    // setting store listener
    JournalStore.on("change", this.getJournals);
    EntryStore.on("change", this.getEntries);
  }

  componentWillUnmount() {
    // removing store listener
    JournalStore.removeListener("change", this.getJournals);
    EntryStore.removeListener("change", this.getEntries);
  }

  componentDidMount() {
    // set initial state
    JournalActions.fetchJournals();
  }

  getJournals() {
    // set new state when the store data changes 
    this.setState({
      journals: JournalStore.getJournals(),
      activeJournal: JournalStore.getActiveJournal()
    });
  }

  createJournal() {
    JournalActions.createJournal(this.state.journalName, this.state.journalImgURL);
    this.setState({
      dialogOpen: false,
      journalName: null,
      journalImgURL: null
    });
  }

  handleJournalClick(journal) {
    this.setActiveJournal(journal);
    EntryActions.fetchEntries(journal._id);
  }

  setActiveJournal(journal) {
    JournalActions.setActiveJournal(journal);
  }

  getEntries() {
    // set new state when the store data changes 
    this.setState({
      entries: EntryStore.getEntries(),
      activeEntry: EntryStore.getActiveEntry()
    });
  }

  createEntry() {
    const aj = JournalStore.getActiveJournal();
    EntryActions.createEntry(this.state.entryName, '', aj._id);
    this.setState({
      entryDialogOpen: false,
      entryName: null,
    });
  }

  initializeEntries() {
    const jId = window.location.href.split('/').pop();
    const journal = this.state.journals.find(journal => journal._id = jId);
    //JournalActions.setActiveJournal(journal);
    //EntryActions.fetchEntries(journal._id);
  }

  handleCreateJournalClick() {
    this.setState({ dialogOpen: true });
  }

  handleCreateEntryClick() {
    this.setState({ entryDialogOpen: true });
  }

  handleRequestClose = () => {
    this.setState({ dialogOpen: false });
  };

  handleRequestEntryClose = () => {
    this.setState({ entryDialogOpen: false });
  }

  render() {
    return (
      <div>
        <Drawer open={true} docked={true}>
          <Paper style={styles.paper} elevation={0}>
            <Toolbar>
              Logo Here
            </Toolbar>
            <Divider />
            <Switch>
              <Route path='/home' render={() => (
                <div>
                  <NewItemButton 
                    itemName="Journal" 
                    onClick={this.handleCreateJournalClick}
                    padding="40px" 
                    open={this.state.dialogOpen} />
                  <Divider />
                </div>
              )} />
              <Route path='/journal' render={() => (
                <div>
                  <NewItemButton 
                    itemName="Entry" 
                    onClick={this.handleCreateEntryClick}
                    padding="40px" />
                  <Divider />
                </div>
              )} />
              <Route path='/entry' render={() => (
                <div>
                  <NewItemButton 
                    itemName="Entry" 
                    onClick={this.handleCreateEntryClick}
                    padding="50px" />
                  <Divider />
                  <JournalDetail entries={this.state.entries} onInitialize={this.initializeEntries}></JournalDetail>
                </div>
              )} />
              <Route path='/edit' render={() => (
                <div>
                  <NewItemButton 
                    itemName="Entry" 
                    onClick={this.handleCreateEntryClick}
                    padding="50px" />
                  <Divider />
                  <JournalDetail entries={this.state.entries} onInitialize={this.initializeEntries}></JournalDetail>
                </div>
              )} />
            </Switch>
          </Paper>
        </Drawer>
        <AppBar position="static" style={styles.appBar}>
          <Toolbar>
            <Typography type="title" color="inherit">
              <Link to="/home" style={{ textDecoration: 'none', color: 'white' }}>Diarium</Link>
            </Typography>
          </Toolbar>
        </AppBar>

        <div style={styles.content}>
          <Switch>
            <Route exact path='/home' render={() => (
              <Home journals={this.state.journals} onJournalClick={this.handleJournalClick}></Home>
            )} />
            <Route path='/journal' render={() => (
              <JournalDetail entries={this.state.entries} onInitialize={this.initializeEntries}></JournalDetail>
            )} />
            <Route path='/entry' render={() => (
              <EntryRender entry={EntryStore.getActiveEntry()}></EntryRender>
            )} />
            <Route path='/edit' render={() => (
              <EntryEditor entry={EntryStore.getActiveEntry()}></EntryEditor>
            )} />
            <Redirect from="/" exact to="/home" />
          </Switch>
          
          <Dialog open={this.state.dialogOpen} onRequestClose={this.handleRequestClose}>
            <DialogTitle>
              {"Create a new Journal"}
            </DialogTitle>
            <DialogContent>
              <TextField
                id="journalName"
                onChange={event => this.setState({ journalName: event.target.value })}
                label="Journal Name"
                margin="normal"
              />
              <TextField
                id="journalImg"
                onChange={event => this.setState({ journalImgURL: event.target.value })}
                label="Preview Image URL"
                margin="normal"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.createJournal} color="primary">
                Create
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog open={this.state.entryDialogOpen} onRequestClose={this.handleRequestEntryClose}>
            <DialogTitle>
              {"Create a new Entry"}
            </DialogTitle>
            <DialogContent>
              <TextField
                id="entryName"
                onChange={event => this.setState({ entryName: event.target.value })}
                label="Entry Name"
                margin="normal"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.createEntry} color="primary">
                Create
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    );
  }
}

export default App;
