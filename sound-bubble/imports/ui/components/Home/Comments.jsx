import React from 'react';
import '../../stylesheets/main.css';
import UserComment from './UserComment.jsx';

export default class Comments extends React.Component {
    // Comments inherit songId and groupId from Song
    constructor() {
        super();
        this.state = {
            commentForm: false
        };
    }

    addCommentForm() {
        this.setState({
            commentForm: true
        });
    }

    closeCommentForm() {
        this.setState({
            commentForm: false
        });
    }

    onInput(event) {
        this.closeCommentForm();
        let commentText = event.target.value;
        //SEND COMMENT TO BACKEND
    }

    fetchAndCreateUserComments(){
        // UserComment has props:
        // - userImage
        // - userName
        // - comment
        // - timeStamp
    }


    render() {
        let commentForm = <div />;
        if (this.state.commentForm) {
            commentForm = (<div className='createComment-Container'>
                <form onSubmit={this.onInput.bind(this)}>
                    <input className='commentBar' type="text" placeholder="Add new comment..." maxLength="200" />
                    <button type="submit" className="closeCommentForm">Submit</button>
                    <button className="closeCommentForm" onClick={() => this.closeCommentForm()}>Close</button>
                </form>
            </div>);
        }

        // SAMPLE DATA BELOW
        return (<div className="comments">

           <UserComment userImage="https://assets.entrepreneur.com/content/3x2/2000/20190502194704-ent19-june-editorsnote.jpeg" userName="Max Normal" comment="What a Great Song!" timeStamp="12:29 July 3, 2019"/>
           <UserComment userImage="https://pbs.twimg.com/profile_images/980145664712740864/aNWjR7MB_400x400.jpg" userName="Rick Ron" comment="12308109112#@!)*@!(#*!#! " timeStamp="10:04 July 4, 2019"/>
           <UserComment userImage="https://newsofmonth.com/wp-content/uploads/2018/11/gang-960x720.jpg" userName="hatguy" comment="SHORT COMMENT@@" timeStamp="19:23 July 6, 2019"/>
           <UserComment userImage="https://imgix.bustle.com/uploads/image/2017/6/14/d0b77633-b617-451a-8699-ccacaa09e20f-womanpointing.jpg?w=500&h=365&fit=crop&crop=faces&auto=format&q=70" userName="rockon" comment="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu" timeStamp="01:43 July 10, 2019"/>
           <UserComment userImage="https://www.rd.com/wp-content/uploads/2017/03/07-People-Share-the-Random-Act-of-Kindness-That-Changed-Their-Life-Masami-sati-380x254.jpg" userName="Shelby" comment="+++|}|}|+" timeStamp="10:15 July 20, 2019"/>
           <UserComment userImage="https://data.whicdn.com/images/323570381/superthumb.jpg?t=1544405955" userName="MissIndependent" comment="This song makes me feel independent" timeStamp="11:44 July 24, 2019"/>


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


        </div >);
    }
}
