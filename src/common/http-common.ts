import axios from "axios";

const USERS_URL = 'https://jsonplaceholder.typicode.com'
export const getAvatartUrl = (name: string) => `https://avatars.dicebear.com/api/avataaars/${name.toLowerCase()}.svg?mood[]=happy`

const headers = {
  "Content-type": "application/json"
}

export const users = axios.create({
  baseURL: USERS_URL,
  headers
});

// export const avatars = (name: string) => axios.create({
//   baseURL: getAvatartUrl(name),
//   headers
// });
