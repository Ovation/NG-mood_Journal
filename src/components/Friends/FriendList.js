import "./Friends.css"
import React, { useContext, useEffect, useState } from "react"
import { FriendContext, FriendProvider } from "./FriendProvider"
import { useHistory } from "react-router-dom"
import { EntryContext } from "../Entries/EntryProvider"

export const FriendPage = () => {

  const history = useHistory()
  const { Friends, getFriends } = useContext(FriendContext)
  const {entries, getEntries} =useContext(EntryContext)
  const[publicEntries,setPublicEntries]=useState([])
  useEffect(() => {
    getFriends()
  }, [])

  useEffect(() => {
    getEntries()
  }, [])

useEffect(()=> {
 const publicEntries= entries.filter(entry =>entry.isPublic==="on")
 setPublicEntries(publicEntries)
},[entries])
  
  return (
    <>
      <h3 className="header_friends">Friends</h3>
      <div className="friends_window">
        <button onClick={() => history.push("/friends/newFriend")}>
          Add a friend

        </button>
        {Friends.map((friend) => {

          return (
            <>
              <div className="friends_list" id={`friend--${friend.id}`}>
                <div className="username">
                  username: {friend.username}
                </div>
                <div>
                </div>
              </div>
            </>
          )
        })}
      </div>
      <div>
        {publicEntries.map(entry=>{
          return (
           <><div className="entries">
            <div><b>title:</b>{entry.title} </div>
            <div><b>subject:</b>{entry.subject} </div>
            <div><b>body:</b>{entry.body} </div>
            <div><b>mood:</b>{entry.mood} </div>
            <div><b>date:</b>{entry.dateTime} </div>
            <div><b>public status:</b>{entry.isPublic} </div>
            </div>
            </>
          )
          
        })}
      </div>
    </>
  )


}