import {deleteMovie} from './../utils/apiCall'
import './Film.css'

export function Film({_id, title, director, year, score, image, onEdit, onDelete}) {
  let filmScore = parseInt(score)
  const updateFilm = () => {
    // Load form of new film with actual data. Button Update or cancel
  }
  const runEdit = () => {
    onEdit(_id)
  }
  const runDelete = () => {
    new Promise((resolve)=>{resolve(deleteMovie(_id))})
    .then((response)=>{
      if (response)
        onDelete(_id)
      })
  }
  return (
    <div className='film' onClick={updateFilm} id={_id}>
      {/* TODO: create in API the way to send images to frontend */}
      {/* <img className='preview'></img> */} 
      <p className='title'>{title}</p>
        <p className='year'>{year}</p>
        <p className='director'>{director}</p>
        <span className='score'>
          {
            Array(5).fill(0).map((_,index)=>{
              return(<Star fill={index+1<=filmScore}></Star>)
            })
          }
        </span>
        <span className="material-symbols-outlined edit" onClick={runEdit}> edit </span>
        <span style={{width:"80%"}}></span>
        <span className="material-symbols-outlined delete" onClick={runDelete}> delete </span>
    </div>
  )
}

export function AddFilm () {
  const addFilm = () => {
    // Load form of new film with actual data. Button Update or cancel
  }
  return(
    <div className='film' onClick={addFilm}>
      <img className='preview'></img>
      <p className='title'> Add new film </p>
    </div>
  )
}

export function Star({fill=false}) {
  return(
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
      <path className="" fill={fill ? 'currentColor' : ''} stroke="currentColor" d="M12,17.3l6.2,3.7l-1.6-7L22,9.2l-7.2-0.6L12,2L9.2,8.6L2,9.2L7.5,14l-1.6,7L12,17.3z"></path>
    </svg>
  )
}