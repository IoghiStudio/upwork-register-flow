const BASE_URL = 'http://localhost:3002/api/';
const SIGNUP = 'signup';

export const GET = (path: string) => {
  return fetch(`${BASE_URL}${path}`)
    .then (resp => resp.json())
    .catch(error => console.log(error))
}

export const POST = (path: string, data: {}) => {
  return fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  })
} 
