import React, { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router";
import { EntryContext } from "../EntryProvider"


export const EntryForm = () => {
    const {  getEntries, addEntry } = useContext(EntryContext)
    
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

    const HandleInput = (event) => {
        const newEntry = { ...entry }
        newEntry[event.target.id] = event.target.value
        setEntry(newEntry)
    }

    const saveEntry = (event) => {
              event.preventDefault()
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
                <input type="checkbox" id="isPublic" name="publicStatus" checkedValue={entry.isPublic} onChange={HandleInput}>
             </input>
  <label htmlFor="public?">Make this entry public?</label>
   
                </div>
            </fieldset>
            <button className="save-btn" onClick={saveEntry}>
                Save Entry
            </button>
        </form>
    )
    }