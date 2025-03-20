import React from "react";

const ScheduledUpdateNotice = () => {
  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-gradient-to-r from-yellow-200 to-yellow-50 p-6">
      <div className="w-full max-w-2xl bg-white border-l-8 border-yellow-600 text-yellow-900 p-12 rounded-xl shadow-2xl text-center">
        <h2 className="font-extrabold text-3xl mb-6 text-yellow-700">🚧 Scheduled Update 🚧</h2>
        <p className="text-xl leading-relaxed">
          Dear Sir,
          <br />
          There is a scheduled update for the portal till evening.
          <br />
          <strong>Please revisit us after 4:30 p.m.</strong>
        </p>
      </div>
    </div>
  );
};

export default ScheduledUpdateNotice;