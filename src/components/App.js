import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import { useEffect, useState } from "react";
import { Api } from "utils/Api";
import {
  CurrentUserContext,
  currentUserObject,
} from "contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeleteCardOpen, setIsDeleteCardOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [deletedCard, setDeletedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState(currentUserObject);
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleDeleteCardClick = (card) => {
    setDeletedCard(card);
    setIsDeleteCardOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeleteCardOpen(false);
    setSelectedCard(null);
    setDeletedCard(null);
  };

  useEffect(() => {
    Api.getCurrentUser()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.log(`Ошибка загрузки данных ${err}`);
      });
  }, []);

  useEffect(() => {
    Api.loadCards()
      .then((userCards) => {
        setCards(userCards);
      })
      .catch((err) => {
        console.log(`Ошибка загрузки изначальных данных ${err}`);
      });
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    Api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(`Ошибка загрузки данных ${err}`);
      });
  }

  function handleCardDeleteSubmit() {
    Api.deleteCard(deletedCard._id)
      .then(() => {
        setCards(
          cards.filter((item) => {
            return item._id !== deletedCard._id;
          })
        );
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка загрузки данных ${err}`);
      });
  }

  function handleUpdateUser({ name, about }) {
    Api.editProfile(name, about)
      .then((user) => {
        setCurrentUser({ name: name, about: about, avatar: user.avatar });
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка загрузки данных ${err}`);
      });
  }

  function handleUpdateAvatar({ avatar }) {
    Api.updateAvatar(avatar)
      .then((user) => {
        setCurrentUser({
          name: user.name,
          about: user.about,
          avatar: user.avatar,
        });
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка загрузки данных ${err}`);
      });
  }

  function handleAddPlaceSubmit({ name, link }) {
    Api.editCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка загрузки данных ${err}`);
      });
  }

  const pageComponent = (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__content">
          <Header></Header>

          <Main
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onDeleteCardClick={handleDeleteCardClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
          ></Main>

          <Footer></Footer>

          <ImagePopup onClose={closeAllPopups} card={selectedCard}></ImagePopup>

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />

          <DeleteCardPopup
            isOpen={isDeleteCardOpen}
            onClose={closeAllPopups}
            onCardDelete={handleCardDeleteSubmit}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );

  return (
    <Routes>
      <Route
        path="/sign-in"
        element={<div className="loginContainer">LOGIN COMPONENT</div>}
      />
      <Route
        path="/sign-up"
        element={<div className="registerContainer">REGISTER COMPONENT</div>}
      />

      <Route
        path="/"
        element={loggedIn ? pageComponent : <Navigate to="/sign-in" replace />}
      />
    </Routes>
  );
}

export default App;
