import React from 'react';
import {connect} from 'react-redux';

class Vote extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            upAmount: 0,
            downAmount:0,
            voteState:0,
        }
    }

    upVote(){
        this.setState({upAmount: this.state.upAmount + 1});
        this.setState({voteState:1});
    }

    downVote(){
        this.setState({downAmount: this.state.downAmount + 1});
        this.setState({voteState:2});
    }

    upComplete(){
        if(this.state.upAmount >= 0){
            this.setState({upAmount: this.state.upAmount - 1});
        }
        this.setState({voteState:0})
    }

    downComplete(){
        if(this.state.downAmount >= 0){
            this.setState({downAmount: this.state.downAmount - 1});
        }
        this.setState({voteState:0})
    }

    render(){
        if(this.state.voteState == 1){
            return(
                <div className="votes">
                    <img onClick={this.upComplete.bind(this)} className="thumbsUp" src="https://upload.wikimedia.org/wikipedia/commons/f/f8/Symbol_thumbs_up_white.svg"/>
                    <span>{this.state.upAmount} likes</span>
                </div>
            )
        }
        if(this.state.voteState == 2){
            return(
            <div className="votes">
                <img onClick={this.downComplete.bind(this)} className="thumbsDown" src="https://upload.wikimedia.org/wikipedia/commons/f/f8/Symbol_thumbs_up_white.svg"/>
                <span>{this.state.downAmount} dislikes</span>
            </div>
            )
        }
        else{
            return(
            <div className="votes">
                <img onClick={this.upVote.bind(this)} className="thumbsUp" src="https://upload.wikimedia.org/wikipedia/commons/f/f8/Symbol_thumbs_up_white.svg"/>
                <span>{this.state.upAmount}</span>
                <img onClick={this.downVote.bind(this)} className="thumbsDown" src="https://upload.wikimedia.org/wikipedia/commons/f/f8/Symbol_thumbs_up_white.svg"/>
                <span>{this.state.downAmount}</span>
            </div>
            )
        }
    }
}


export default Vote;