import React, { Component } from 'react';
import JournalCard from "./JournalCard";

const styles = {
  container: {
    margin: 'auto', 
    padding: '1em', 
    maxWidth: '900px'
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
    const journals = this.props.journals.map((journal) =>
      <JournalCard 
        key={journal._id} 
        journal={journal} 
        onJournalClick={this.handleJournalClick}>
      </JournalCard>
    );

    return(
      <div style={styles.container}>
        {journals}
      </div>
    );
  }
}

export default Home;