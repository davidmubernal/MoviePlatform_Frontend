
const URL = import.meta.env.VITE_API_URL
export const METHODS = {
  GET:'GET',
  POST:'POST',
  PUT:'PUT',
  DELETE:'DELETE'
}

export function getMovies(title=null, director=null, year=null, score=null) {
  let uri = '/movies/?'
  if (title) { uri+='title='+title.replace(' ', '+') }
  if (director) { uri+='&director='+director.replace(' ', '+') }
  if (year) { uri+='&year='+year }
  if (score) { uri+='&score='+score }
  const data = {
    method: METHODS.GET,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }
  return callApi(uri, data)
}

export function putMovie(id, movieJson=null) {
  if (!movieJson) {return}
  const data = {
    method: METHODS.PUT,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(movieJson)
  }
  return callApi("/movies/"+id, data, true)
}

export function postMovie(movieJson=null) {
  if (!movieJson) {return}
  const data = {
    method: METHODS.POST,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(movieJson)
  }
  return callApi("/movies/", data, true)
}

export function deleteMovie(id) {
  if(!id) { return }
  const data = {
    method: METHODS.DELETE,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }
  return callApi("/movies/"+id, data, true)
}

export async function callApi(url, data, boolean=false) {
  const response = await fetch(URL+url, data)
  if (response.status != 200) {
      console.error("Bad response")
  }
  if (boolean) {
    return response.body
  }
  const jResponse = await (response.json())
  return jResponse
}