import axios from "axios";

// const endOfHost = window.location.origin.lastIndexOf(':') <= 5 ? window.location.origin.length : window.location.origin.lastIndexOf(':');
// const host = process.env.REACT_APP_BE_HOST === 'CLIENT' ? window.location.origin.slice(0, endOfHost) : process.env.REACT_APP_BE_HOST;
// const port = process.env.REACT_APP_BE_PORT === 'CLIENT' ? (endOfHost !== window.location.origin.length ? ":" + window.location.origin.slice(endOfHost + 1, window.location.origin.length) : "" ) : ":" + process.env.REACT_APP_BE_PORT;
const host = process.env.NEXT_PUBLIC_BE_HOST;
const port = ":" + process.env.NEXT_PUBLIC_BE_PORT;

export function edit(hero, id) {
  return axios.put(`${host}${port}/heroes/edit/${id}`, hero);
}