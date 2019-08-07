import React, { Component } from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withTracker } from 'meteor/react-meteor-data';
import { changeCurrentGroup } from '../../actions/homeActions';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import { NavLink } from 'react-router-dom';

const BootstrapInput = withStyles(theme => ({
  root: {
    'label + &': {
      marginBottom: theme.spacing(3)
    }
  },
  input: {
    'line-height': '1.2em',
    borderRadius: 4,
    position: 'relative',
    backgroundColor: 'grey',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      backgroundColor: 'grey',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)'
    }
  }
}))(InputBase);

class GroupButton extends Component {
  setDefaultGroup() {
    const { currentGroupId, myGroups, changeCurrentGroup } = this.props;
    //set currentGroup to the first group if it is not initialized but the user has groups
    if (!currentGroupId && myGroups[0]) {
      changeCurrentGroup(myGroups[0]._id);
    }
  }

  handleChangeGroup = e => {
    const { currentGroupId, changeCurrentGroup, myGroups } = this.props;
    let newGroupId = e.target.value;
    if (newGroupId != currentGroupId) {
      changeCurrentGroup(newGroupId);
    }
  };

  navigateToGroups() {}

  render() {
    this.setDefaultGroup();
    if (!this.props.currentGroupId) {
      return (
        <div>
          <NavLink
            className="feed_button btn btn-secondary btn-lg"
            to="/groups"
          >
            Join a group
          </NavLink>
        </div>
      );
    }
    return (
      <form autoComplete="off">
        <FormControl>
          <InputLabel style={{ color: 'white' }}>Group</InputLabel>
          <NativeSelect
            onChange={this.handleChangeGroup}
            input={<BootstrapInput />}
          >
            {this.props.myGroups
              .sort(function(a, b) {
                return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
              })
              .map(g => (
                <option key={g._id} value={g._id}>
                  {g.name}
                </option>
              ))}
          </NativeSelect>
        </FormControl>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return { currentGroupId: state.currentGroupId };
}

export default compose(
  connect(
    mapStateToProps,
    { changeCurrentGroup }
  ),
  withTracker(props => {
    const myGroupsReady = Meteor.subscribe('myGroups').ready();
    return {
      myGroups: myGroupsReady ? Groups.find().fetch() : []
    };
  })
)(GroupButton);
