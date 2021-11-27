import DOMPurify from 'dompurify';
import StarIcon from '../../img/star.png';
import FilledStarIcon from '../../img/star-filled.png';
import './style.css';

function Ratings(nota) {
    let stars = '';
    let rest = 5 - nota;

    for (let i = 1; i <= nota; i++) {
        stars += `<img style="height: 15px" src=${StarIcon} alt="" />`;
    }

    for(let i = 1; i <= rest; i++) {
        stars += `<img style="height: 15px" src=${FilledStarIcon} alt="" />`;
    }

    return stars;
}

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