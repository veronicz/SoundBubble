import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ContentEditable from 'react-contenteditable';
import { editComment, deleteComment } from '../../actions/homeActions';

class CommentDetail extends Component {
  state = { comment: this.props.comment.message };

  handleChange = e => {
    let newComment = e.target.value;
    if (newComment.length <= 200) {
      this.setState({
        comment: newComment
      });
    } else {
      this.setState({
        comment: this.state.comment
      });
    }
  };

  handleEdit = action => {
    const { comment, songId, editComment, deleteComment, close } = this.props;
    if (action === 'save') {
      editComment(songId, comment._id, this.state.comment);
    } else if (action === 'delete') {
      deleteComment(songId, comment._id);
    }
    close();
  };

  render() {
    return (
      <Dialog
        open={true}
        onClose={this.props.close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Edit or delete your comment
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <ContentEditable
              html={this.state.comment}
              onChange={this.handleChange}
              tagName="span"
              className="editable-comment"
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.handleEdit('save')} color="primary">
            Save
          </Button>
          <Button onClick={() => this.handleEdit('delete')} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default connect(
  null,
  { editComment, deleteComment }
)(CommentDetail);
