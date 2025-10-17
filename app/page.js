import Login from "@/components/Login";


export default function Home() {


  return (
    <main id="hero">
      <div className="hero-img">
        <img alt="hero-img" src="loginimg.jpg" />
      </div>
      <div className="hero-login">
        <Login />
      </div>
    </main>
  );
}