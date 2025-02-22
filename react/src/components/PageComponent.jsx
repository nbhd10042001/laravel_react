import React from "react";

export default function PageComponent({ title, buttons = "", children }) {
  return (
    <>
      <header className="bg-white shadow">
        <div className="flex justify-between items-center mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-indigo-800">
            {title}
          </h1>
          {buttons}
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 bg-gray-100">
          {children}
        </div>
      </main>
    </>
  );
}
