import "./Friends.css"
import React, { useContext, useEffect, useState } from "react"
import { FriendContext, FriendProvider } from "./FriendProvider"
import { useHistory } from "react-router-dom"
import { EntryContext } from "../Entries/EntryProvider"

export const FriendPage = () => {

  const history = useHistory()
  const { Friends, getFriends,DeleteFriend} = useContext(FriendContext)
  const {entries, getEntries,DeleteEntry} =useContext(EntryContext)
  const[publicEntries,setPublicEntries]=useState([])
  const [friend,setFriend]=useState([])
  useEffect(() => {
    getFriends()
  }, [])

  useEffect(() => {
    getEntries()
  }, [])

useEffect(()=> {
 const publicEntries= entries.filter(entry =>entry.isPublic==="true")
 setPublicEntries(publicEntries)
},[entries])

const removeFriend = id => () => {
  DeleteFriend(id)
    .then(() => {
      history.push("/friends")
    })}

    const removeEntry = id => () => {
      DeleteEntry(id)
        .then(() => {
          history.push("/entries")
        })}
  
  return (
    <>
      <h3 className="header_friends">Friends and The Posts They Can See</h3>
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
                  <button onClick={removeFriend(friend.id)}>Unfollow</button>
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
           <>
           <div className="entries">
            <div><b>title:</b>{entry.title} </div>
            <div><b>subject:</b>{entry.subject} </div>
            <div><b>body:</b>{entry.body} </div>
            <div><b>mood:</b>{entry.mood} </div>
            <div><b>date:</b>{entry.dateTime} </div>
            <div><b>public status:</b>{entry.isPublic} </div>
            <button onClick={() => {
                    history.push(`/entries/edit/${entry.id}`);
                  }}>Edit</button>
            <button onClick={removeEntry()}>Delete</button>
            </div>
            </>
          )
          
        })}
      </div>
    </>
  )


}