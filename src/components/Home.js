import React, { Component } from 'react';
import JournalCard from "./JournalCard";
import Grid from 'material-ui/Grid';

const styles = {
  container: {
    margin: 'auto', 
    padding: '1em', 
    maxWidth: '900px',
    flexGrow: 1,
  },
  card: {
    width: '400px',
  }
}

class Home extends Component {
  constructor(props) {
    super(props);
    this.handleJournalClick = this.handleJournalClick.bind(this);
  }

  handleJournalClick(journal) {
    this.props.onJournalClick(journal);
  }

  render() {
    const journals = this.props.journals.map((journal, index) =>
      <Grid item xs={12} sm={6} key={journal._id + index + journal.name} >
        <JournalCard 
          style={styles.card}
          journal={journal} 
          onJournalClick={this.handleJournalClick}>
        </JournalCard>
      </Grid>
    );

    return(
      <Grid container style={styles.container}>
        {journals}
      </Grid>
    );
  }
}

export default Home;