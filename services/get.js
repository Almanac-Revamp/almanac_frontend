import axios from "axios";

// const endOfHost = window.location.origin.lastIndexOf(':') <= 5 ? window.location.origin.length : window.location.origin.lastIndexOf(':');
// const host = process.env.REACT_APP_BE_HOST === 'CLIENT' ? window.location.origin.slice(0, endOfHost) : process.env.REACT_APP_BE_HOST;
// const port = process.env.REACT_APP_BE_PORT === 'CLIENT' ? (endOfHost !== window.location.origin.length ? ":" + window.location.origin.slice(endOfHost + 1, window.location.origin.length) : "" ) : ":" + process.env.REACT_APP_BE_PORT;
const host = process.env.NEXT_PUBLIC_BE_HOST;
const port = ":" + process.env.NEXT_PUBLIC_BE_PORT;

export function getClasses() {
  return axios.get(`${host}${port}/classnames/getAll`);
}

export function getHeroes() {
  return axios.get(`${host}${port}/heroes/getAll`);
}

export function getThumbnail(picName) {
  return picName ? `${host}${port}/images/thumbnails/${picName}` : `${host}${port}/images/default.jpg`;
}

export function getIcon(picName) {
  return `${host}${port}/images/icons/${picName}`;
}

export function getHeroById(id) {
  return axios.get(`${host}${port}/heroes/get/${id}`);
}