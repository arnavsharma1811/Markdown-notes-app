import Markdown from "markdown-to-jsx";
import TopNav from "./topNav";

export default function MDX(props) {
    const {text} = props;
    const md = `
  
      `
    return (
        <section className="mdx-container">
            <TopNav {...props} />
            <article>
                <Markdown>
                    {text.trim()}
                </Markdown>
            </article>
        </section>
    )
}