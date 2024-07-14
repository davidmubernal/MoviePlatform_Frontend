import { Filter, FilterType } from "./Filter";
import './FilmForm.css'
import { useEffect, useState } from "react";
import { callApi, METHODS, postMovie, putMovie } from "../utils/apiCall";


export function FilmForm({_id=null, title=null, director=null, year=null, score=null, preview=null, onClose}) {
  const [newTitle, setNewTitle] = useState(title)
  const [newDirector, setNewDirector] = useState(director)
  const [newYear, setNewYear] = useState(year)
  const [newScore, setNewScore] = useState(score)
  
  const onTitleChange = (value) => {setNewTitle(value)}
  const onDirectorChange = (value) => {setNewDirector(value)}
  const onYearChange = (value) => {setNewYear(value)}
  const onScoreChange = (value) => {setNewScore(value)}

  const save = () => {
    if (!(newTitle && newDirector && newYear && newScore)) {return}
    if (newYear<1895) {return}
    if (newScore<1 || newScore >5) {return}
    const json = {
      "title": newTitle,
      "director": newDirector,
      "year": newYear,
      "score": newScore
    }
    new Promise((resolve) => {
      var response = _id ? putMovie(_id, json) : postMovie(json)
      resolve(response)
    }).then((response) => {
        if (response)
          onClose(false)
      })
  }
  const close = () => {
    onClose(false)
  }
  return(
    <div className="back-form">
      <form>
        <span>{title ? "Edit film data" : "New film"}</span>
        <Filter _id={_id+"_title"} name="Title" filterType={FilterType.Text} currentText={title} callback={onTitleChange}/>
        <Filter _id={_id+"_director"} name="Director" filterType={FilterType.Text} currentText={director} callback={onDirectorChange}/>
        <Filter _id={_id+"_year"} name="Year" filterType={FilterType.Date} currentText={year} callback={onYearChange}/>
        <Filter _id={_id+"_score"} name="Score" filterType={FilterType.Score} currentText={score} callback={onScoreChange}/>
        <div className="button-container">
          <button onClick={close}> Cancel</button>
          <button onClick={save}> Save</button>
        </div>
      </form>
    </div>
  )
}