import React from "react";

export const Dialog = ({ open, onOpenChange, children }) => {
  return open ? (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">{children}</div>
    </div>
  ) : null;
};

export const DialogTrigger = ({ asChild, children }) => {
  return React.cloneElement(children, {
    onClick: () => asChild?.onOpenChange(true),
  });
};

export const DialogContent = ({ children }) => {
  return <div className="p-4">{children}</div>;
};

export const DialogHeader = ({ children }) => {
  return <div className="border-b pb-2 mb-4">{children}</div>;
};

export const DialogTitle = ({ children }) => {
  return <h2 className="text-lg font-semibold">{children}</h2>;
};
