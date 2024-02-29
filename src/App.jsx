import { Link, Outlet, useNavigation } from "react-router-dom";
import "./App.css";

function App() {
  const navigation = useNavigation();

  return (
    <>
      <header>
        <h1>
          <Link to={"/author/posts"} className="title">
            Blog API
          </Link>
        </h1>
      </header>
      <main>
        {navigation.state === "loading" ? (
          <h3 className="loadingIndicator">Loading...</h3>
        ) : (
          <Outlet />
        )}
      </main>
      <footer>
        <p>&copy; 2024 VMadhuranga</p>
      </footer>
    </>
  );
}

export default App;
