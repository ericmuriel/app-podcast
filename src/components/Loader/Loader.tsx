import React, { useContext } from "react";
import "./Loader.scss";
import { useLoader } from "../../context/LoaderContext";

const Loader = () => {
  const { isLoading } = useLoader();
  if (!isLoading) return null;

  return (
    <div className="loader-indicator" role="alert" aria-busy="true">
      <div className="spinner" role="status" aria-live="polite"></div>
    </div>
  );
};

export default Loader;
