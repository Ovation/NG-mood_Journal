import React from "react"
import { Route } from "react-router-dom"
import { EntryForm } from "./components/Entries/entryForm/EntryForm"
import { FriendPage } from "./components/Friends/FriendList"
import { FriendForm } from "./components/Friends/FriendForm"
import { EntryProvider } from "./components/Entries/EntryProvider"
import { EntryList } from "./components/Entries/EntryList"
import { WelcomePage } from "./components/Welcome"
import { FriendProvider } from "./components/Friends/FriendProvider"
export const ApplicationViews = () => {
  return (
    <>
      <EntryProvider>
        <FriendProvider>
          <Route exact path="/">
            <WelcomePage />
          </Route>
          <Route exact path="/Entries">
            <EntryList />
          </Route>
          <Route exact path="/entries/newEntry">
            <EntryForm />
          </Route>
          <Route exact path="/Friends">
            <FriendPage />
          </Route>
          <Route exact path="/friends/newFriend">
            <FriendForm />
          </Route>
        </FriendProvider>
      </EntryProvider>
    </>
  )
}
