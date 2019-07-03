import React from 'react';
import { connect } from 'react-redux';
import { upVote, downVote, upComplete, downComplete } from '../../actions';

class Vote extends React.Component {

    render() {
        if (this.props.voteState == 1) {
            return (
                <div className="votes">
                    <div onClick={() => this.props.upComplete(this.props.id)} className="voteButton" >
                    <div className="glyphicon glyphicon-thumbs-up" style={{color:'#1db954'}}><span className="tooltiptext">Undo Upvote</span></div>
                        </div>
                    <span className="voteCount">{this.props.upAmount} likes</span>
                </div>
            )
        }
        if (this.props.voteState == 2) {
            return (
                <div className="votes">
                    <div onClick={() => this.props.downComplete(this.props.id)} className="voteButton">
                    <div className="glyphicon glyphicon-thumbs-down" style={{color:'#1db954'}}><span className="tooltiptext">Undo Downvote</span></div>
                        </div>
                    <span className="voteCount">{this.props.downAmount} dislikes</span>
                </div>
            )
        }
        else {
            return (
                <div className="votes">
                    <div onClick={() => this.props.upVote(this.props.id)} className="voteButton">
                        <div className="glyphicon glyphicon-thumbs-up white"><span className="tooltiptext">Upvote</span></div></div>
                <span className="voteCount">{this.props.upAmount}</span>
                <div onClick={() => this.props.downVote(this.props.id)} className="voteButton">
                    <div className="glyphicon glyphicon-thumbs-down white"><span className="tooltiptext">Downvote</span></div></div>
                <span className="voteCount">{this.props.downAmount}</span>
                    
                </div>)
        }
    }
}



export default connect(null, { upVote, downVote, upComplete, downComplete })(Vote);