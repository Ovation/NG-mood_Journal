import React from "react"
import { Route } from "react-router-dom"
import { EntryForm} from "./components/Entries/entryForm/EntryForm"
import { FriendPage } from "./components/Friends/FriendList"
import { FriendForm } from "./components/Friends/FriendForm"
import { EntryProvider } from "./components/Entries/EntryProvider"
import {EntryList} from "./components/Entries/EntryList"
import { WelcomePage } from "./components/Welcome"
import { FriendProvider } from "./components/Friends/FriendProvider"
export const ApplicationViews = () => {
  return (
    <>

      <Route exact path="/">
       <WelcomePage/>
      </Route>
      <Route exact path="/Entries">
       <EntryProvider>

       <EntryList />

       </ EntryProvider>
      </Route>
      <Route exact path="/entries/newEntry">
        <EntryProvider>
          <EntryForm />
        </EntryProvider>
      </Route>
      <Route exact path="/Friends">
        <FriendProvider>
        <FriendPage />
        </FriendProvider>
      </Route>
      <Route exact path="/friends/newFriend">
        <FriendProvider>
        <FriendForm />
        </FriendProvider>
      </Route>
        </>
  )
}
