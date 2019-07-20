import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hideMySong } from '../../actions/accountActions';

class HideSongButton extends Component {
  render() {
    const { hideMySong, song, show } = this.props;
    return (
      <div className="hide_song">
        <button
          className="hide_button"
          onClick={() => hideMySong(song._id, show ? 'hide' : 'show')}
        >
          {show ? 'Hide' : 'Show'}
        </button>
      </div>
    );
  }
}

export default connect(
  null,
  { hideMySong }
)(HideSongButton);
