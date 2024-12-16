import React, { useContext } from "react";
import "./Loader.scss";
import { useLoader } from "../../context/LoaderContext";

const Loader = () => {
  const { isLoading } = useLoader();
  if (!isLoading) return null;

  return (
    <div className="loader-indicator">
      <div className="spinner"></div>
    </div>
  );
};

export default Loader;
