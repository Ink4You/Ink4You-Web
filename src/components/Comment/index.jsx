import DOMPurify from 'dompurify';
import { Ratings } from '../../utils/Adapter';
import './style.css';

function Comment(props) {
    return (
        <div className="comment-card">
            <div className="card-row">
                <div className="card-column">
                    <img className="user-photo" src={props.userPhoto} alt="" />
                </div>
                <div className="card-column">
                    <p>{props.userName}</p>
                    <p>{props.commentDate}</p>
                </div>
                <div className="card-column">
                    <p>Avaliação</p>
                    <div className="ratings-stars" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(Ratings(props.ratting))}}></div>
                </div>
            </div>
            <p className="comment-text">{props.comment}</p>
        </div>

    );
}

export default Comment;