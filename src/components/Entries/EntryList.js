import "./Entries.css"
import React, { useContext, useEffect, useState } from "react"
import { EntryContext } from "./EntryProvider"
import { useHistory } from "react-router-dom"
import { LabelContext } from "./entryForm/Labelprovider"

export const EntryList = () => {

  const history = useHistory()
  const { entries, getEntries, searchTerms, setSearchTerms } = useContext(EntryContext)
  const { labels, getLabels } = useContext(LabelContext)
  const [filteredEntries, setFiltered] = useState([])
  const [selectedLabel, setSelectedLabel] = useState("")
  useEffect(() => { setSearchTerms("") }, [])
  useEffect(() => {
    if (searchTerms !== "") {
      // If the search field is not blank, display matching entries
      if (selectedLabel === '1') {
        const subset = entries.filter(entry => entry.title.toLowerCase().includes(searchTerms.toLowerCase()))
        setFiltered(subset)
      }
      else if (selectedLabel === '2') {
        const subset = entries.filter(entry => entry.subject.toLowerCase().includes(searchTerms.toLowerCase()))
        setFiltered(subset)
      }
      else if (selectedLabel === '3') {
        const subset = entries.filter(entry => entry.body.toLowerCase().includes(searchTerms.toLowerCase()))
        setFiltered(subset)
      }
      else if (selectedLabel === '4') {
        const subset = entries.filter(entry => entry.mood.toLowerCase().includes(searchTerms.toLowerCase()))
        setFiltered(subset)
      }
      else if (selectedLabel === '5') {
        const subset = entries.filter(entry => entry.dateTime.includes(searchTerms))
        setFiltered(subset)
      }
    }


    else {
      // If the search field is blank, display all entries
      setFiltered(entries)
    }
  }, [searchTerms, entries])


  useEffect(() => {
    console.log("EntryList: useEffect - getEntries")
    getEntries()
  }, [])
  useEffect(() => {
    console.log("EntryList: useEffect - getEntries")
    getLabels()
  }, [])

  const handleControlledInputChange = (event) => {
    debugger
    const selectedLabel = event.target.value
    setSelectedLabel(selectedLabel)
  }

  const entryTitleFilter = entries['Title']
  return (
    <>
      <h3 class="header_entries">Entries</h3>
      <button onClick={() => history.push("/entries/newEntry")}>
        Create an Entry
      </button>
      <div className="Entries">
        <form>
          <label> Filter By: </label>

          <select value={selectedLabel} name="label" className="form-control" onChange={handleControlledInputChange}>
            <option value="0" className="filter_drop_down">All</option>
            {labels.map(l => (
              <option key={l.id} value={l.id}>
                {l.label}
              </option>
            ))}
          </select>

        </form>
        <input type="text" onKeyUp={(event) => setSearchTerms(event.target.value)}></input>
      </div>
      {filteredEntries.map((entry) => {

        return (
          <div className="entries" id={`entry--${entry.id}`}>
            <div className="fullEntry">
            <div className="entryTitle">
              <b>Title: </b>{entry.title}
            </div>
            <div className="entrySubject">
              <b>Subject: </b>{entry.subject}
            </div>
            <div className="entryBody">
              <b>Body:</b>{entry.body}
            </div>
            <div className="entryMood">
              <b>mood:</b>{entry.mood}
            </div>
            <div className="entryDate">
              <b>Date created: </b>{entry.dateTime}
            </div>
            <div className="entryPublicStatus">
              <b>Public status: </b>{entry.isPublic}
              </div>
            </div>
          </div>
        )
      })}

    </>
  )
}