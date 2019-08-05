import React, { Component } from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { editComment, deleteComment } from '../../actions/homeActions';

class CommentDetail extends Component {
  state = { comment: this.props.comment.message };

  handleChange = e => {
    this.setState({
      comment: e.target.value
    });
  };

  handleEdit = action => {
    const { comment, songId, editComment, deleteComment, close } = this.props;
    if (this.state.comment !== '' && action === 'save') {
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
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Edit or delete your comment
        </DialogTitle>
        <DialogContent>
          <TextField
            InputProps={{
              classes: {
                input: this.props.classes.inputSize
              }
            }}
            inputProps={{
              maxLength: 200
            }}
            className={this.props.classes.textField}
            value={this.state.comment}
            onChange={this.handleChange}
            autoFocus
            multiline
            fullWidth
          />
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

export default compose(
  connect(
    null,
    { editComment, deleteComment }
  ),
  withStyles({
    textField: {
      width: 500
    },
    inputSize: {
      fontSize: 15
    }
  })
)(CommentDetail);
