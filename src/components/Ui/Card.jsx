// src/components/ui/card.jsx
import React from 'react';

export const Card = ({ children }) => {
  return (
    <div className="card" style={{border:"none"}}>
      {children}
    </div>
  );
};

export const CardContent = ({ children }) => {
  return <div className="card-content">{children}</div>;
};
