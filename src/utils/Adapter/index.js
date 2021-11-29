import StarIcon from '../../img/star.png';
import FilledStarIcon from '../../img/star-filled.png';

export function InstagramImagesResponseToJson(response) {
    let json = [];

    response.forEach(element => {
        json.push({
            id: element[0],
            image: element[1],
            image_byte: element[2]
        });
    });

    return json;
}

export function Ratings(nota) {

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
