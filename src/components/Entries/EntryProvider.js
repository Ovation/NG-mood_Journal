import React, { useState, createContext } from "react"

export const EntryContext = createContext()


export const EntryProvider = (props) => {
    const [entries, setEntries] = useState([])


    const getEntries = () => {
        return fetch(`http://localhost:8088/entries`)
        .then(res => res.json())
        .then(setEntries)
    }
    const getPublicEntries = (props) => {
        return fetch(`http://localhost:8088/entries/?isPublic=true`)
        .then(result => result.json())
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

    const updateEntry = entry => {
        return fetch(`http://localhost:8088/entries/${entry.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(entry)
        })
    }

    const deleteEntry = entryId => {
        return fetch(`http://localhost:8088/entries/${entryId}`, {
            method: "DELETE"
        }).then(getEntries)
    }

    return (
        <EntryContext.Provider value={{
            entries, getEntries, addEntry, getEntryById, updateEntry, deleteEntry
        }}>
            {props.children}
        </EntryContext.Provider>
    )
}