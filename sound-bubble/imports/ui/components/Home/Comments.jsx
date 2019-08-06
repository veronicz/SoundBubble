import React from 'react';
import { connect } from 'react-redux';
import UserComment from './UserComment.jsx';
import { commentSong } from '../../actions/homeActions';

class Comments extends React.Component {
  // Comments inherit songId and groupId from Song
  constructor() {
    super();
    this.state = {
      commentForm: false,
      inputValue: ''
    };
  }

  addCommentForm() {
    this.setState({
      commentForm: true
    });
  }

  closeCommentForm() {
    this.setState({
      commentForm: false,
      inputValue: ''
    });
  }

  updateInputValue(evt) {
    this.setState({
      inputValue: evt.target.value
    });
  }

  onSubmit = () => {
    event.preventDefault();
    const { commentSong, songId } = this.props;
    let commentText = this.state.inputValue;
    if (commentText !== '') {
      commentSong(songId, commentText);
    }
    this.closeCommentForm();
  };

  render() {
    let commentForm = <div />;
    if (this.state.commentForm) {
      commentForm = (
        <div className="createComment-Container">
          <form onSubmit={this.onSubmit}>
            <input
              className="commentBar"
              type="text"
              placeholder="Add new comment..."
              maxLength="200"
              value={this.state.inputValue}
              onChange={evt => this.updateInputValue(evt)}
            />
            <button type="submit" className="closeCommentForm">
              Submit
            </button>
            <button
              type="button"
              className="closeCommentForm"
              onClick={() => this.closeCommentForm()}
            >
              Close
            </button>
          </form>
        </div>
      );
    }

    return (
      <div className="comments">
        {this.props.comments.map(comment => {
          return (
            <UserComment
              key={comment._id}
              comment={comment}
              songId={this.props.songId}
            />
          );
        })}

        <div className="user-comment-add">
          <div
            className="option_container"
            onClick={() => this.addCommentForm()}
          >
            <div className="add-comment-glyph glyphicon glyphicon-pencil white">
              <span className="tooltiptext">Add Comment</span>
            </div>
          </div>
        </div>
        {commentForm}
      </div>
    );
  }
}

export default connect(
  null,
  { commentSong }
)(Comments);
