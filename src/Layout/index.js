import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import DeckList from "../Home/DeckList";
import { Link } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import CreateDeck from "../Home/CreateDeck";
import Deck from "../Decks/Deck";
import Study from "../Home/Study";
import EditDeck from "../Decks/EditDeck";
import EditCard from "../Decks/EditCard";
import AddCard from "../Decks/AddCard";


function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/decks/new">
            <CreateDeck />
          </Route>
          <Route exact path="/">
            <DeckList />
          </Route>
          <Route exact path="/decks/:deckId">
            <Deck />
          </Route>
          <Route exact path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route exact path="/decks/:deckId/cards/new">
          <AddCard />
        </Route>
        <Route path="/decks/:deckId/cards/:cardId/edit" component={EditCard} />
         <Route exact path ="/decks/:deckId/edit">
          <EditDeck />
        </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;