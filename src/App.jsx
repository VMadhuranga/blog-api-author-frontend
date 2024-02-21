import "./App.css";

function App() {
  return (
    <>
      <header>
        <h1>Blog API</h1>
      </header>
      <main>
        <section>
          <h2>Login author</h2>
          <form>
            <div>
              <label htmlFor="user_name">User name: </label>
              <input type="text" name="user_name" id="user_name" />
            </div>
            <div>
              <label htmlFor="password">Password: </label>
              <input type="text" name="password" id="password" />
            </div>
          </form>
        </section>
      </main>
      <footer>
        <p>&copy; 2024 VMadhuranga</p>
      </footer>
    </>
  );
}

export default App;
