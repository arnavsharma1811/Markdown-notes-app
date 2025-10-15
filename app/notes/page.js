'use client'
import { useAuth } from "@/context/AuthContext"
import SideNav from "@/components/sideNav";
import Editor from "@/components/Editor";
import MDX from "@/components/MDX";
import { useState } from "react";
export default function NotesPage() {

  const [isViewer, setIsViewer] = useState(true);
  const [text, setText] = useState('');
  const [showNav, setShowNav] = useState(false);
  const { currentUser, isLoadingUser } = useAuth()


  function handleToggleMenu() {
    setShowNav(!showNav);
  }

  function handleToggleViewer() {
    setIsViewer(!isViewer)
  }


  if (isLoadingUser) {
    return (
      <h6 className="text-gradient" >Loading...</h6>
    )
  }
  if (!currentUser) {
    window.location.href = '/'
  }
  return (
    <main id="notes">
      <SideNav showNav={showNav} setShowNav={setShowNav}
      />
      {!isViewer &&
        (<Editor setText={setText}
          text={text}
          isViewer={isViewer}
          handleToggleViewer={handleToggleViewer}
          handleToggleMenu={handleToggleMenu} />)}
      {isViewer &&
        (<MDX text={text}
          isViewer={isViewer}
          handleToggleViewer={handleToggleViewer}
          handleToggleMenu={handleToggleMenu} />)}

    </main>
  )
}