import Footer from './components/footer';
import Header from './components/header';
import Routes from './routes/index.js';
import './App.css';
function App() {
  return (
    <div className="App">
      <Header />
      <Routes />
      <Footer />      
    </div>
  );
}

export default App;
