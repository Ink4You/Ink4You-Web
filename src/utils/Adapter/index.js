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