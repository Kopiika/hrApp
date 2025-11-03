import './App.css'
import PersonList from "./components/PersonList"
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  

  return (
    <>
    <div className='wrapper'>
      <Header/>
      <div className='main'>
        <PersonList/>
      </div>
      <Footer/>
    </div>
    </>
  )
}

export default App