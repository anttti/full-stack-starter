import { Link } from "react-router-dom";

export const About = () => {
  return (
    <>
      <main>
        <h2>About page</h2>
        <p>You can do this, I believe in you.</p>
      </main>
      <nav>
        <Link to="/">Home</Link>
      </nav>
    </>
  );
};
