import Home from './pages/Home/Home';
import CustomForm from './components/CustomForm/CustomForm';
import './App.css';

function App() {
 

  return (
    <div className="App">
      <Home />
      <CustomForm>
        <CustomForm.Email 
          value={"jessi@gmail.com"} 
          onChange={() => console.log("hello")}
        />
      </CustomForm>
    </div>
  );
}

export default App;
