import axios from "axios";

// const endOfHost = window.location.origin.lastIndexOf(':') <= 5 ? window.location.origin.length : window.location.origin.lastIndexOf(':');
// const host = process.env.REACT_APP_BE_HOST === 'CLIENT' ? window.location.origin.slice(0, endOfHost) : process.env.REACT_APP_BE_HOST;
// const port = process.env.REACT_APP_BE_PORT === 'CLIENT' ? (endOfHost !== window.location.origin.length ? ":" + window.location.origin.slice(endOfHost + 1, window.location.origin.length) : "" ) : ":" + process.env.REACT_APP_BE_PORT;
const host = process.env.NEXT_PUBLIC_BE_HOST;
const port = ":" + process.env.NEXT_PUBLIC_BE_PORT;

export function upload(hero, image) {
  const form = new FormData();
  if(image){
    const namedImage = new File([image], hero.name + '.' + image.name.slice(image.name.lastIndexOf(".") + 1, image.length), {type: image.type});
    hero.thumbName = namedImage.name;
  }
  form.append('thumbnail', image ? namedImage : null);
  form.append('hero', JSON.stringify(hero));
  return axios.post(`${host}${port}/heroes/upload`, form, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}