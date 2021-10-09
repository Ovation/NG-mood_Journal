import React, { useState, createContext } from "react"
import { useEffect } from "react/cjs/react.development"

export const EntryContext = createContext()


export const EntryProvider = (props) => {
    const [entries, setEntries] = useState([])
    const [searchTerms,setSearchTerms]=useState("")

    const getEntries = () => {
        return fetch(`http://localhost:8088/entries`)
        .then(res => res.json())
        .then(setEntries)
    }
    

    const addEntry = entry => {
        return fetch(`http://localhost:8088/entries`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(entry)
        })
    }
  
    const getEntryById = (id) => {
        return fetch(`http://localhost:8088/entries/${id}`)
        .then(result => result.json())
    }

    const EditEntry = entry => {
        return fetch(`http://localhost:8088/entries/${entry.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(entry)

        })
    }
    const DeleteEntry = entryId => {
        return fetch(`http://localhost:8088/entries/${entryId}`, {
            method: "DELETE"
            })
            .then(getEntries)
        
    }


    return (
        <EntryContext.Provider value={{
            entries, getEntries, addEntry, getEntryById,searchTerms, setSearchTerms,EditEntry,DeleteEntry
        }}>
            {props.children}
        </EntryContext.Provider>
    )
}