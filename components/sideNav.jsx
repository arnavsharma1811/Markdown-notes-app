'use client'
import { useEffect, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
export default function SideNav(props){
    const notes = ['hello', 'world','hello', 'world','hello', 'world','hello', 'world','hello', 'world']
    const {showNav, setShowNav} = props;
    const {logout} = useAuth();  
    const ref = useRef(null);
     useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowNav(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


return(
    <section ref = {ref} className={"nav " + (showNav ? ' ' : ' hidden-nav ')}>
        <h1 className="text-gradient">Scribo</h1>
        <h6>Easy Breezy Notesss</h6>
        <div className="full-line"></div>
        <button>
            <h6>New Note</h6>
            <i className="fa-regular fa-square-plus"></i>
        </button>
        <div className="notes-list">
            { notes.length == 0 ? 
            <p>You have 0 Notes</p>
            :        notes.map((note , idx)=>{
                return (
                    <button key = {idx}
                    className = "card-button-secondary list-btn">
                    <p>{note}</p>
                    <small>DATETIME</small>
                   <div
                   className="delete-btn"><i className="fa-solid fa-trash"></i></div> 
                    </button>
                )
            })}
        </div>
         <div className="full-line"></div>
         <button onClick={logout}>
            <h6>Logout</h6>
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
         </button>

    </section>
)
}