import { useEffect, useState } from 'react'
import './App.css'
import { Film } from './components/Film'
import { Filter, FilterType } from './components/Filter'
import { FilmForm } from './components/FilmForm'
import { getMovies } from './utils/apiCall'

function App() {
  // #region states
  // #region films data
  const [films, setFilms] = useState([])
  // #endregion

  // #region filters
  const [filtersValues, setFilterValues] = useState({"title":"", "director":"", "year":"", "score":""})

  const callbackFilter = () => {
    const dict = {
      "title" : document.getElementById('filters_title_input').value,
      "director" : document.getElementById('filters_director_input').value,
      "year" : document.getElementById('filters_year_input').value,
      "score" : document.getElementById('filters_score_input').value
    }
    setFilterValues(dict)
  }

  // #endregion

  // #region popUp
  const[editPopUp, setEditPopUp] = useState(false)

  const callbackEdit = (id) => {
    let film = true
    if (typeof(id) === 'string')
      film = films.filter((film) => film.id == id)[0]
    setEditPopUp(film)
  }
  const callbackDelete = (id) => {
    let element = document.getElementById(id)
    element.parentElement.removeChild(element)
  }

  // #endregion
  // #endregion 
  useEffect(()=>{
    new Promise( (resolved) =>
      {
        var movies = getMovies(filtersValues.title, filtersValues.director, filtersValues.year, filtersValues.score)
        resolved(movies)
      })
      .then((movies) => {
        movies = movies.map((data) => {return(data)})
        setFilms(movies)
      })
  }, [filtersValues])
  return (
    <>
      <section className='filters'>
        <Filter _id="filters_title" name="Title" filterType={FilterType.Text} callback={callbackFilter}></Filter>
        <Filter _id="filters_director" name="Director" filterType={FilterType.Text} callback={callbackFilter}></Filter>
        <Filter _id="filters_year" name="Year" filterType={FilterType.Date} callback={callbackFilter}></Filter>
        <Filter _id="filters_score" name="Score" filterType={FilterType.Score} callback={callbackFilter}></Filter>
      </section>
      <section className='new-film'>
        <button onClick={callbackEdit}> New Film</button>
      </section>
      {editPopUp ? <FilmForm _id={editPopUp.id} title={editPopUp.title} director={editPopUp.director} year={editPopUp.year} score={editPopUp.score} onClose={callbackEdit}></FilmForm> : <></>}
      <div className='film-container'>
        {
          films.map((data)=>{return(<Film key={data.id} _id={data.id} title={data.title} director={data.director} year={data.year} score={data.score} onEdit={callbackEdit} onDelete={callbackDelete}></Film>)})
        }
      </div>
    </>
  )
}

export default App
