import "./Entries.css"
import React, {useContext, useEffect} from "react"
import {EntryContext} from "./EntryProvider"
import {useHistory} from "react-router-dom"


export const EntryList = () => {

  const history = useHistory()
  const {entries, getEntries} = useContext(EntryContext)


  useEffect(() => {
    console.log("EntryList: useEffect - getEntries")
    getEntries()
  }, [])

  const entryTitleFilter=entries['Title']
  return (
    <>
    <h3>Entries</h3>
    <button onClick={() => history.push("/entries/newEntry")}>
      Create an Entry
    </button>
    <div className="Entries">
        <form>  
            <label> Filter By: </label>  
                  <select>  
                    <option value = "entries" id="allFilter"> All
                    </option>  
                    <option value = "entryTitleFilter" > Title
                    </option>  
                    <option value = "entrySubjectFilter"> Subject 
                    </option>  
                    <option value = "entryMoodFilter"> Mood 
                    </option>  
                    <option value = "entryDateFilter"> Date 
                    </option>  
                </select>  
        </form>
</div>
      {entries.map((entry) => {
   
        return (
          <div className="entries"  id={`entry--${entry.id}`}>
            
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
        )
      })}
  
    </>
  )
}