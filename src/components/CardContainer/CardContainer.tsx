import React from "react";
import "./CardContainer.scss";

export interface AuxProps {
  children: React.ReactNode;
  className?: string;
}

const CardContainer: React.FC<AuxProps> = ({ children, className }) => {
  return (
    <div className={`card-container ${className || ""}`}>
      {children}
    </div>
  );
};

export default CardContainer;
