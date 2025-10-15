export default function TopNav(props){
    const {isViewer , handleToggleViewer, handleToggleMenu} = props;
    return (
        <>
         <div className="notes-btn">
                <button onClick={handleToggleMenu} className="card-button-primary menu">
                    <i className="fa-solid fa-bars"></i>
                </button>
                <button className="card-button-secondary">
                    <h6>Save</h6>
                    <i className="fa-solid fa-floppy-disk"></i>
                </button>
                <button onClick={handleToggleViewer} className="card-button-secondary">
                    {isViewer ? <>
                        <h6>Viewer</h6>
                        <i className="fa-solid fa-check-double"></i>
                    </> :
                        <>
                            <h6>Edit</h6>
                            <i className="fa-solid fa-pen-to-square"></i>
                        </>}
                </button>
            </div>
             <div className="fullLine"></div>
             </>
    )
}