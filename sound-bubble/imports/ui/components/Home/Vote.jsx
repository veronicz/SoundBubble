import React from 'react';
import {connect} from 'react-redux';
import {upVote, downVote, upComplete, downComplete} from '../../actions';

class Vote extends React.Component {

    render(){
        if(this.props.voteState == 1){
            return(
                <div className="votes">
                    <img onClick={()=>this.props.upComplete(this.props.id)} className="thumbsUp" src="https://upload.wikimedia.org/wikipedia/commons/f/f8/Symbol_thumbs_up_white.svg"/>
                    <span className="voteCount">{this.props.upAmount} likes</span>
                </div>
            )
        }
        if(this.props.voteState == 2){
            return(
            <div className="votes">
                <img onClick={()=>this.props.downComplete(this.props.id)} className="thumbsDown" src="https://upload.wikimedia.org/wikipedia/commons/f/f8/Symbol_thumbs_up_white.svg"/>
                <span className="voteCount">{this.props.downAmount} dislikes</span>
            </div>
            )
        }
        else{
            return(
            <div className="votes">
                <img onClick={()=>this.props.upVote(this.props.id)} className="thumbsUp" src="https://upload.wikimedia.org/wikipedia/commons/f/f8/Symbol_thumbs_up_white.svg"/>
                <span className="voteCount">{this.props.upAmount}</span>
                <img onClick={()=>this.props.downVote(this.props.id)} className="thumbsDown" src="https://upload.wikimedia.org/wikipedia/commons/f/f8/Symbol_thumbs_up_white.svg"/>
                <span className="voteCount">{this.props.downAmount}</span>
            </div>
            )
        }
    }
}



export default connect(null,{upVote,downVote,upComplete,downComplete}) (Vote);