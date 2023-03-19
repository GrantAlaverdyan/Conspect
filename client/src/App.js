import logo from './logo.svg';
import './App.css';
import SaveQuestions from './components/SaveQuestion';
import EditQuestion from './components/EditQuestion';

function App() {
  return (
    <div className="App">
      <SaveQuestions />
      <EditQuestion />
    </div>
  );
}

export default App;
