import TopNav from "./topNav";

export default function Editor(props) {
    const {text, setText} = props;
    return (

        <section className="notes-container">
           <TopNav {...props}/>
           
            <textarea value={text} onChange={(e) => { setText(e.target.value) }} placeholder="hey what's up..." />
        </section>

    )

}