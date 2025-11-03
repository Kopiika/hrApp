import './App.css'
import Person from "./components/Person"
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  

  return (
    <>
    <div className='wrapper'>
      <Header/>
      <div className='main'>
        <div className='persones-container'>
            <Person name="Maria Virtanen" title ="CEO" salary="120000 €" phone="+358 40 123 4567" email="maria.virtanen@hrapp.fi" animal="Cat"/>
            <Person name="Hanna Laine" title ="Senior Software Engineer" salary="78000 €" phone="+358 50 234 5678" email="hanna.laine@hrapp.fi" animal="Dog"/>
            <Person name="Laura Nieminen" title ="HR Manager" salary="55000 €" phone="+358 44 345 6789" email="laura.nieminen@hrapp.fi" animal="Rabbit"/>
            <Person name="Emmi Koskinen" title ="UI/UX Designer" salary="48000 €" phone="+358 45 456 7890" email="emmi.koskinen@hrapp.fi" animal="Parrot"/>
            <Person name="Sofia Päivinen" title ="Project Manager" salary="68000 €" phone="+358 40 567 8901" email="sofia.paivinen@hrapp.fi" animal="Hamster"/>

        </div>
      </div>
      <Footer/>
    </div>
      
       
    </>
  )
}

export default App