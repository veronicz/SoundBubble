import React from 'react';
import { connect } from 'react-redux';
import { vote } from '../../actions/homeActions';

class Vote extends React.Component {

    render() {
        if (this.props.voteState === 1) {
            return (
                <div className="votes">
                    <div onClick={() => this.props.vote(this.props.id, this.props.userId, 2)} className="voteButton" >
                    <div className="glyphicon glyphicon-thumbs-up" style={{color:'#1db954'}}><span className="tooltiptext">Undo Upvote</span></div>
                        </div>
                    <span className="voteCount">{this.props.upAmount} likes</span>
                </div>
            )
        }
        if (this.props.voteState === -1) {
            return (
                <div className="votes">
                    <div onClick={() => this.props.vote(this.props.id, this.props.userId, 4)} className="voteButton">
                    <div className="glyphicon glyphicon-thumbs-down" style={{color:'#1db954'}}><span className="tooltiptext">Undo Downvote</span></div>
                        </div>
                    <span className="voteCount">{this.props.downAmount} dislikes</span>
                </div>
            )
        }
        else {
            return (
                <div className="votes">
                    <div onClick={() => this.props.vote(this.props.id, this.props.userId, 1)} className="voteButton">
                        <div className="glyphicon glyphicon-thumbs-up white"><span className="tooltiptext">Upvote</span></div></div>
                <span className="voteCount">{this.props.upAmount}</span>
                <div onClick={() => this.props.vote(this.props.id, this.props.userId, 3)} className="voteButton">
                    <div className="glyphicon glyphicon-thumbs-down white"><span className="tooltiptext">Downvote</span></div></div>
                <span className="voteCount">{this.props.downAmount}</span>
                    
                </div>)
        }
    }
}



export default connect(null, { vote })(Vote);