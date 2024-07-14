import { useState } from 'react'
import './Filter.css'

export const FilterType = {
  Date: "date",
  Score: "score",
  Text: "text"
}
export function Filter({_id, name, filterType, currentText = "", callback=null}) {
  const [value, setValue] = useState(currentText)
  const onTextChange = (value) => {
    setValue(value)
    if (callback) {
      callback(value)
    }
  }
  const getFilterType = (id, type) => {
    switch (type) {
      case FilterType.Score:
        return <input id={id} type="number" min="1" max="5" step="1" value={value} onChange={e => onTextChange(e.target.value)}/>
      case FilterType.Date:
        return <input id={id} type="number" min="1895" step="1" value={value} onChange={e => onTextChange(e.target.value)}/>
      case FilterType.Text:
        return <input id={id} type="text" value={value} onChange={e => onTextChange(e.target.value)}/>
    }
  }
  let doc = 
    <div className="filter">
      <fieldset>
        <legend>{name}</legend>
        {
          getFilterType(_id+"_input", filterType)
        }
      </fieldset>
    </div>
  return doc
}