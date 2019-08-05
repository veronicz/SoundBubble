import React from 'react';
import { Meteor } from 'meteor/meteor';
import { addGroupMember } from '../../actions/groupActions';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { withTracker } from 'meteor/react-meteor-data';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      showResult: false,
      foundUsers: []
    };
  }

  onInputChange(event) {
    this.searchUser(event.target.value);
  }

  searchUser(userName) {
    const foundUsers = this.props.allUsers.filter(user =>
      user.profile.display_name.toLowerCase().includes(userName.toLowerCase())
    );
    this.setState({ foundUsers: foundUsers });
  }

  onInput(event) {
    if (event.target.value !== '') {
      this.setState({ showResult: true });
    } else {
      this.setState({ showResult: false });
    }
  }

  render() {
    const { groupId, existUsers, closeSearch, addGroupMember } = this.props;

    let detail = null;
    if (this.state.showResult) {
      if (this.state.foundUsers.length === 0) {
        detail = <span>No User Found</span>;
      } else {
        detail = this.state.foundUsers.map(user => {
          let userImage =
            (user.profile.images[0] && user.profile.images[0].url) ||
            'https://www.loginradius.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png';

          if (existUsers.includes(user.profile.id)) {
            return (
              <li className="foundUser" key={user.profile.id}>
                <div className="search-photo-username">
                  <img className="search-photo" src={userImage} />
                  <div className="search-display-name">
                    {user.profile.display_name}
                  </div>

                  <div className="add-member-container">
                    <button
                      className="addMember"
                      style={{
                        backgroundColor: 'silver',
                        color: 'white',
                        borderRadius: '15px',
                        fontFamily: 'monospace'
                      }}
                      disabled
                    >
                      In Group
                    </button>
                  </div>
                </div>
              </li>
            );
          } else {
            return (
              <li className="foundUser" key={user.profile.id}>
                <div className="search-photo-username">
                  <img className="search-photo" src={userImage} />
                  <div className="search-display-name">
                    {user.profile.display_name}
                  </div>

                  <div className="add-member-container">
                    <button
                      className="addMember"
                      onClick={() => addGroupMember(groupId, user.profile.id)}
                      style={{
                        backgroundColor: 'black',
                        color: 'white',
                        borderRadius: '15px',
                        fontFamily: 'monospace'
                      }}
                    >
                      Add User
                    </button>
                  </div>
                </div>
              </li>
            );
          }
        });
      }
    }
    return (
      <div className="searchBar-Container">
        <input
          className="searchBar"
          type="text"
          placeholder="Search by username.."
          onChange={this.onInputChange.bind(this)}
          onInput={this.onInput.bind(this)}
        />
        <button className="closeUserSearch" onClick={closeSearch}>
          Close
        </button>
        <ul className="detailContainer">{detail}</ul>
      </div>
    );
  }
}

export default compose(
  withTracker(props => {
    const allUsersReady = Meteor.subscribe('allUsers').ready();
    return {
      allUsers: allUsersReady ? Meteor.users.find().fetch() : []
    };
  }),
  connect(
    null,
    { addGroupMember }
  )
)(Search);
