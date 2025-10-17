import TopNav from "./topNav";

export default function Editor(props) {
    const {text, setText} = props;
    return (

        <section className="notes-container">
           <TopNav {...props}/>
           
            <textarea value={text} onChange={setText} placeholder="hey what's up..." />
        </section>

    )

}