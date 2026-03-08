import React, { useState } from "react";
import Header from "./Header";
import SearchSuggestions from "./SearchSuggestions";
import {navbarData} from "./NavbarData"
import SideForm from "./SidebarForm";
import SigninForm from "./SigninForm";
export default function NavbarController() {
  const [open, setOpen] = useState({
    sidebar: false, signin: false, search: false
  });
  const toggleModal = (modal) => {
    setOpen((prev) => ({ ...prev, [modal]: !prev[modal] }));
  };
  const closeModal = (modal) => {
    setOpen((prev) => ({ ...prev, [modal]: false }));
  };
  return (
    <div>
      <Header toggleModal={toggleModal} navbarData={navbarData} />
      <SideForm open={open} closeModal={closeModal} toggleModal={toggleModal} navbarData={navbarData}/>
      <SigninForm open={open} closeModal={closeModal} toggleModal={toggleModal} navbarData={navbarData}/>
      {open.search && ( <SearchSuggestions onClose={() => closeModal("search")} />
      )}
    </div>
  );
}