import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hideMySong } from '../../actions/accountActions';

class HideSongButton extends Component {
  render() {
    const { hideMySong, song, show } = this.props;

    let button;
    if (show){
      button = (<button
        className="hide_button"
        onClick={() => hideMySong(song._id, show ? 'hide' : 'show')}
      >
        Hide
      </button>);
    } else {
      button = (<button
        className="hide_button"
        style={{'background-color':'black', 'color':'white'}}
        onClick={() => hideMySong(song._id, show ? 'hide' : 'show')}
      >
        Show
      </button>);
    }

    return (
      <div className="hide_song">
        {button}
      </div>
    );
  }
}

export default connect(
  null,
  { hideMySong }
)(HideSongButton);
