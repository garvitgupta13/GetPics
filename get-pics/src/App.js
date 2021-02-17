import "./App.css";
import NavBar from "./components/navBar";
import SearchBar from "./components/search";
import Footer from "./components/footer";

function App() {
  return (
    <div className="container">
      <NavBar />
      <SearchBar />
      <Footer />
    </div>
  );
}

export default App;
