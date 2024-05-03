export const loadPosts = async () => {
    let postsResponse = fetch('https://jsonplaceholder.typicode.com/posts');
    let photosResponse = fetch('https://jsonplaceholder.typicode.com/photos');

    let [posts, photos] = await Promise.all([postsResponse, photosResponse]);

    let postsJson = await posts.json();
    let photosJson = await photos.json();

    let postsAndPhotos = postsJson.map((post, index) =>{
      return {...post, cover: photosJson[index].url}
    });

    return postsAndPhotos;
};