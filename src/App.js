import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import Appbar from './Components/Appbar';
import TodoApp from './Components/TodoApp';

function App() {
  return (
    <div className="App">
      <Appbar/>
      <TodoApp/>
    </div>
  );
}

export default App;
