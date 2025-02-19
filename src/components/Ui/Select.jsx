import React from "react";

export const Select = ({ children, className }) => {
  return <select className={`border p-2 rounded ${className}`}>{children}</select>;
};

export const SelectTrigger = ({ children, onClick, className }) => {
  return (
    <button onClick={onClick} className={`border p-2 rounded ${className}`}>
      {children}
    </button>
  );
};

export const SelectValue = ({ value }) => {
  return <span>{value}</span>;
};

export const SelectContent = ({ children, className }) => {
  return <div className={`absolute bg-white shadow-lg ${className}`}>{children}</div>;
};

export const SelectItem = ({ value, onClick, children, className }) => {
  return (
    <div
      onClick={() => onClick(value)}
      className={`cursor-pointer p-2 hover:bg-gray-200 ${className}`}
    >
      {children}
    </div>
  );
};
