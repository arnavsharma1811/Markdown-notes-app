'use client'
import { useAuth } from "@/context/AuthContext"
import SideNav from "@/components/sideNav";
import Editor from "@/components/Editor";
import MDX from "@/components/MDX";
import { useState } from "react";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
export default function NotesPage() {

  const [isViewer, setIsViewer] = useState(true);
  //const [text, setText] = useState('');
  const [showNav, setShowNav] = useState(false);
  const { currentUser, isLoadingUser } = useAuth()
  const [note, setNote] = useState({
    content: ' '
  })
  const [noteIds, setNoteIds] = useState([])
  const [savingNote, setSavingNote] = useState(false)

  function handleToggleMenu() {
    setShowNav(!showNav);
  }

  function handleToggleViewer() {
    setIsViewer(!isViewer)
  }

  function handleCreateNote() {
    setNote({ content: '' })
  }

  function handleEditNote(e) {
    setNote({ ...note, content: e.target.value })
  }

  async function handleSaveNote() {
    if (!note?.content) { return }
    setSavingNote(true);
    try {
      if (note.id) {
        const NotesRef = doc(db, 'users', currentUser.uid, 'notes', note.id)
        await setDoc(NotesRef, {
          content: note.content,
          updatedAt: serverTimestamp()
        }, { merge: true })
      }
      else {
        const newId = String(note.content).slice(0, 15) + '__' + Date.now()
        const NotesRef = doc(db, 'users', currentUser.uid, 'notes', newId)
        const newDocInfo = await setDoc(NotesRef, {
          content: note.content,
          createdAt: serverTimestamp()
        })
        setNote({ ...note, id: newId })
      }
    }
    catch (err) { return console.log(err.message) }
    finally {
      setSavingNote(false);
    }

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
        (<Editor setText={handleEditNote}
          handleSaveNote={handleSaveNote}
          savingNote={savingNote}
          text={note.content}
          isViewer={isViewer}
          handleToggleViewer={handleToggleViewer}
          handleToggleMenu={handleToggleMenu} />)}
      {isViewer &&
        (<MDX text={note.content}
          handleSaveNote={handleSaveNote}
          savingNote={savingNote}
          isViewer={isViewer}
          handleToggleViewer={handleToggleViewer}
          handleToggleMenu={handleToggleMenu} />)}

    </main>
  )
}