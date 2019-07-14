import React from 'react';
import { Meteor } from 'meteor/meteor';
import {addGroupMember} from '../../actions/groupActions';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { withTracker } from 'meteor/react-meteor-data';

class Search extends React.Component {

    constructor(){
        super();
        this.state = {
            showResult: false,
            foundUsers:[]
        };
    }

    onInputChange(event){
      this.searchUser(event.target.value);
    }

    searchUser(userName){
      const foundUsers = this.props.allUsers.filter(user => user.profile.display_name.toLowerCase().includes(userName.toLowerCase()));
      console.log(foundUsers);
      this.setState({foundUsers: foundUsers})
    }

    onInput(event){
      if (event.target.value !== ''){
        this.setState({showResult: true})
      }else{
        this.setState({showResult:false})
      }
    }

    render() {
      const {groupId, existUsers, closeSearch, addGroupMember} = this.props;
      let detail = null;
      if(this.state.showResult){
        if(this.state.foundUsers.length === 0){
          detail = <span>No User Found</span>
        }else{
          detail = this.state.foundUsers.map(user => {
            if(existUsers.includes(user.profile.id)){
              return (<li className='foundUser' key={user.profile.id}>{user.profile.display_name}
                        <button className='addMember' disabled>+</button>
                      </li>)
            }else{
              return(<li className='foundUser' key={user.profile.id}>{user.profile.display_name}
                      <button className='addMember' onClick={()=>addGroupMember(groupId,user.profile.id)}>+</button>
                    </li>)
            }
          })
        }}
      return(
        <div className='searchBar-Container'>
          <input className='searchBar' type="text" placeholder="Search.." onChange={this.onInputChange.bind(this)} onInput={this.onInput.bind(this)}/>
          <button className="closeUserSearch" onClick={closeSearch}>Close</button>
          <ul className='detailContainer'>{detail}</ul>
        </div>
      )
    }
}

export default compose(
  withTracker(props => {
    const allUsersReady = Meteor.subscribe('allUsers').ready();
    return {
      allUsers: allUsersReady ? Meteor.users.find().fetch() : []
    }
  }),
  connect(null,{addGroupMember})
)(Search);