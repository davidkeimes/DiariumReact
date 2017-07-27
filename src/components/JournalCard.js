import React, { Component } from 'react';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import { Link } from 'react-router-dom';
import * as JournalActions from "../actions/JournalActions";
import DeleteIcon from 'material-ui-icons/Delete';

const styles = {
  card: {
    maxWidth: '400px',
    margin: '1em'
  },
  cardImage: {
    width: '386px',
    height: '200px',
    overflow: 'hidden'
  }
}

class JournalCard extends Component {
  constructor(props) {
    super(props);
    this.handleJournalClick = this.handleJournalClick.bind(this);
  }

  handleJournalClick(journal) {
    this.props.onJournalClick(journal);
  }

  handleDeleteClick(e, journal) {
    e.preventDefault();
    JournalActions.deleteJournal(journal);
  }

  render() {
    const journal = this.props.journal;
    return (
      <Link to={'/journal/' + journal._id} style={{ textDecoration: 'none' }}>
        <Card style={styles.card} onClick={() => this.handleJournalClick(journal)}>
          <CardMedia>
            <img style={styles.cardImage} src={journal.img_url} alt="Journal Background" />
          </CardMedia>
          <CardContent>
            <Typography type="headline" component="h2">
              {journal.name}
            </Typography>
            <Typography style={{color:'#757575'}} type="subheading" component="h6">
              created at {journal.created_date}
              <DeleteIcon style={{marginLeft:'3em'}} 
                onClick={(e) => this.handleDeleteClick(e, journal)} />
            </Typography>
          </CardContent>
        </Card>
      </Link>
    );
  }
}

export default JournalCard;