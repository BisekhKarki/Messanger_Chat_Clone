import { useContext } from "react";
import { Context } from "./ContextProvider";

const ContextHook = () => {
  const contextValue = useContext(Context);

  if (!contextValue) {
    throw new Error("Context Values should be provided");
  }

  return contextValue;
};

export default ContextHook;
