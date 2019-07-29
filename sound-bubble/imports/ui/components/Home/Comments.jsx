import React from 'react';
import '../../stylesheets/main.css';

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

    render() {
        let commentForm = <div />;
        if (this.state.commentForm) {
            commentForm = (<div className='createComment-Container'>
                <form onSubmit={this.onInput.bind(this)}>
                <input className='commentBar' type="text" placeholder="Add new comment..." maxLength="200"/>
                <button type="submit" className="closeCommentForm">Submit</button>
                <button className="closeCommentForm" onClick={() => this.closeCommentForm()}>Close</button>
                </form>
            </div>);
        }


        return (<div className="comments">


            <div className="user-comment">
                <img className="user-comment-image" src="https://assets.entrepreneur.com/content/3x2/2000/20190502194704-ent19-june-editorsnote.jpeg" />
                <div className="text-timestamp-container">

                    <p className="comment-text">
                        I Love this song!!!!!! gangsta!
      </p>
                    <div className="comment-timestamp-container">
                        <p className="comment-timestamp">
                            13:10 July 7, 2019
      </p>
                    </div>
                </div>
            </div>
            <div className="user-comment">
             <div className="tooltip">
              <img className="user-comment-image" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Pierre-Person.jpg/220px-Pierre-Person.jpg" />  
              <span className="tooltip_comment_text">John Doe</span>
              </div>
                
                <div className="text-timestamp-container">

                    <p className="comment-text">
                        I Love this song!!!!!! gangsta!
      </p>
                    <div className="comment-timestamp-container">
                        <p className="comment-timestamp">
                            13:10 July 7, 2019
      </p>
                    </div>
                </div>
            </div>
            <div className="user-comment">
                <img className="user-comment-image" src="https://cdn.psychologytoday.com/sites/default/files/styles/article-inline-half-caption/public/field_blog_entry_images/2018-09/shutterstock_648907024.jpg?itok=0hb44OrI" />
                <div className="text-timestamp-container">

                    <p className="comment-text">
                        I am a really long comment!!!!!!! !!!!!!!! !!!!!!   !!!!!!!!  !!!!!!! !!!!!!!!!!! WOWOWW!!! THIS SING ASDKJNASKJDNAKSJDNbafhjsbjsbfakjhfbsksj asdkjnas asdfkjndfkjna askdjfnask akjsndfkaj askdfjnadfk akfjdnasdfas A
      </p>
                    <div className="comment-timestamp-container">
                        <p className="comment-timestamp">
                            13:10 July 7, 2019
      </p>
                    </div>
                </div>
            </div>


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

        </div>);
    }
}
