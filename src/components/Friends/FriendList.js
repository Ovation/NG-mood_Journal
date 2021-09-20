import "./Friends.css"
import React, { useContext, useEffect, useState } from "react"
import { FriendContext } from "./FriendProvider"
import { useHistory } from "react-router-dom"

export const FriendPage = () => {

  const history = useHistory()
  const { Friends, getFriends } = useContext(FriendContext)
  /*const [filterTerm, setFilterTerm] = useState("") 
  const filteredEntries=entries.filter(entry => {

    return true
  
  })*/

  useEffect(() => {
    console.log("FriendList: useEffect - getFriends")
    getFriends()
  }, [])

  return (
    <>
      <h3>Friends</h3>
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

              </div>
            </>
          )
        })}
      </div>
    </>
  )

}