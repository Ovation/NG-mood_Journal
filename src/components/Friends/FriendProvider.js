import React, { useState, createContext } from "react"

export const FriendContext = createContext()


export const FriendProvider = (props) => {
    const [Friends, setFriends] = useState([])

    const getFriends = () => {
        return fetch(`http://localhost:8088/friends`)
        .then(res => res.json())
        .then(setFriends)
    }

    const addFriend = friend => {
        return fetch(`http://localhost:8088/friends`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(friend)
        })
    }

    const getFriendById = (id) => {
        return fetch(`http://localhost:8088/friends/${id}`)
        .then(res => res.json())
    }

    const updateFriend = friend => {
        return fetch(`http://localhost:8088/friends/${friend.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(friend)
        })
    }

    const deleteFriend = Friend => {
        return fetch(`http://localhost:8088/friends/${Friend.id}`, {
            method: "DELETE"
        }).then(getFriends)
    }

    return (
        <FriendContext.Provider value={{
            Friends, getFriends, addFriend, getFriendById, updateFriend, deleteFriend
        }}>
            {props.children}
        </FriendContext.Provider>
    )
}