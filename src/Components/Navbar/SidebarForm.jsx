import React from "react";
export default function SideForms({ open, closeModal, toggleModal, navbarData }) {
  const { sidebar } = open;
  return (
    <div>
      {sidebar && (
        <div>
          <div className="fixed inset-0 bg-black/60 z-40" onClick={() => closeModal("sidebar")} />
          <aside className="fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-lg z-50 overflow-y-auto">
            <div className="border-b p-4 flex justify-between">
              <h2 className="text-2xl font-semibold">Hey !</h2>
              <button className="text-3xl" 
                onClick={() => closeModal("sidebar")}><i className="bi bi-x cursor-pointer" /></button>
            </div>
            <div className="border-b p-3 flex">
              <i className="bi bi-gift text-white text-xl w-10 h-10 rounded-full bg-red-500 flex items-center justify-center mr-3"/>
              <p className="text-sm font-medium flex-1">Unlock special offers & benefits</p>
              <button className="bg-red-500 text-white text-sm p-2 rounded cursor-pointer"
                onClick={() => { closeModal("sidebar"); toggleModal("signin"); }}>Login / Register</button>
            </div>
            <ul className="text-sm divide-y">
              {navbarData.Sidebar_Options.map((item) => (
                <li key={item.title} className={`p-3 ${item.muted ? "text-gray-400" : ""}`}>
                  <div className="flex items-center justify-between cursor-pointer">
                    <span>{item.title}</span>
                    <span>{">"}</span>
                  </div>
                  <span className="text-xs mt-1 block text-gray-500">{item.sub}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      )}
    </div>
  );
}