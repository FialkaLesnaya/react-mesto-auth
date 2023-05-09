import React from "react";

export const currentUserObject = {
  name: "",
  about: "",
  avatar: "",
  email: "",
};

export const CurrentUserContext = React.createContext(currentUserObject);
