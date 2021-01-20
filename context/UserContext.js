import { createContext } from "react";

export default createContext({
  userData: {
    token: null,
    user: {},
  },
});
