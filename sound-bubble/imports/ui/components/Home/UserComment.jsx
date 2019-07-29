import React from 'react';
import '../../stylesheets/main.css';

export default class UserComment extends React.Component {
    // Comments inherit songId and groupId from Song

    render() {
        return (
            <div className="user-comment">
                <img className="user-comment-image" src={this.props.userImage} />
                <div className="text-timestamp-container">
                    <p className="comment-username">
                        <strong>{this.props.userName}</strong> commented:<br />
                    </p>

                    <p className="comment-text">
                        <br /> {this.props.comment}
</p>
                    <div className="comment-timestamp-container">
                        <p className="comment-timestamp">
                            {this.props.timeStamp}
</p>
                    </div>
                </div>
            </div>
            );
    }
}
