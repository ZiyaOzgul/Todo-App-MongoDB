import Body from "./components/Body";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="flex flex-col items-center justify-center  h-auto w-1/3">
        <Header />
        <Body />
        <Footer />
      </div>
    </div>
  );
}

export default App;
