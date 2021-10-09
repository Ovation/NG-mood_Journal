import "./EntryForm.css" 
import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router";
import { EntryContext } from "../EntryProvider"


export const EntryForm = () => {
    const { getEntries, addEntry,EditEntry,getEntryById } = useContext(EntryContext)
    const {entryId}=useParams()
    const [isLoading, setIsLoading] = useState(true);
    const [entry, setEntry] = useState({
        title: "",
        subject: "",
        body: "",
        mood:"",
        dateTime: "",
        isPublic: false
    });

    const history = useHistory();

    useEffect(() => {
        getEntries()
    }, [])
    useEffect(() => {
         
          if(entryId) {
            getEntryById(parseInt(entryId))
            .then(entry => {
              setEntry(entry)
              setIsLoading(false)
            })
          } else {
            setIsLoading(false)
          }
    
      }, [])
    const HandleInput = (event) => {
        const newEntry = { ...entry }
        newEntry[event.target.id] = event.target.value
        setEntry(newEntry)
    }

    const saveEntry = () => {
              
              if (entryId) {

                  EditEntry({
                      id:entry.id,
                      title:entry.title,
                      subject:entry.subject,
                      body:entry.body,
                      mood:entry.mood,
                      dateTime:entry.dateTime,
                      isPublic:entry.isPublic,
                  }) .then(() => history.push(`/entries/edit/${entry.id}`))
                }
              
            const newEntry = {
                id: entry.id,
                title: entry.title,
                subject: entry.subject,
                body: entry.body,
                mood: entry.mood,
                dateTime: entry.dateTime,
                isPublic: entry.isPublic
            }
            addEntry(newEntry)
            .then(() => {history.push("/entries")})
            }
        

    
   



    return (
        <form className="EntryForm">
            <h2 className="FormTitle">New Journal Entry</h2>
            <fieldset>
                <div className="entry_form">
                    <label htmlFor="title">Title:</label>
                    <input type="text" id="title" className="form" placeholder="entry title" value={entry.title} onChange={HandleInput} />
                </div>
            </fieldset>
            <fieldset>
                <div className="entry_form">
                    <label htmlFor="subject">Subject:</label>
                    <input type="text" id="subject" className="form" placeholder="entry subject" value={entry.subject} onChange={HandleInput} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="body">Body:</label>
                    <input type="text" id="body" className="form" placeholder="your journal entry here" value={entry.body} onChange={HandleInput} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="mood">Mood:</label>
                    <input type="text" id="mood" className="form" placeholder="mood" value={entry.mood} onChange={HandleInput} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date:</label>
                    <input type="date" id="dateTime" className="form" placeholder="date" value={entry.dateTime} onChange={HandleInput} />
                </div>
                <div>
                <input type="checkbox" id="isPublic" name="publicStatus" checkedValue={entry.isPublic} value="true" onChange={HandleInput}>
             </input>
  <label htmlFor="public?">Make this entry public?</label>
   
                </div>
            </fieldset>
            
            <button className="btn btn-primary"
          disabled={isLoading}
          onClick={event => {
            event.preventDefault() // Prevent browser from submitting the form and refreshing the page
            saveEntry()
          }}>
        {entryId ? <>Save Entry</> : <>Add Entry</>}
        </button>
        <button onClick={() => history.push("/entries")}>
          Back
        </button>
        </form>
    )
    }