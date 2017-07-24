import React, { Component } from 'react';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import { Link } from 'react-router-dom';

const styles = {
	card: {
		maxWidth: '345px',
		margin: '1em'
	},
}

class JournalCard extends Component {
	constructor(props) {
    super(props);
    this.handleJournalClick = this.handleJournalClick.bind(this);
	}
	
	handleJournalClick(journal) {
		this.props.onJournalClick(journal);
	}

	render() {
		const journal = this.props.journal;
		return (
			<Link to={'/journal/'+journal._id} style={{ textDecoration: 'none'}}>
				<Card style={styles.card} onClick={() => this.handleJournalClick(journal)}>
					<CardMedia>
						<img src={journal.img_url} alt="Journal Background" />
					</CardMedia>
					<CardContent>
						<Typography type="headline" component="h2">
							{journal.name}
          </Typography>
					</CardContent>
				</Card>
			</Link>
		);
	}
}

export default JournalCard;