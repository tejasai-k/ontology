import logo from './logo.svg';
import './App.css';
import NumberTheoryApp from './components/NumberTheoryApp';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <ToastContainer
      position="top-right"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      theme="light"
      />
      <div>

      <NumberTheoryApp/>
      </div>
    </div>
  );
}

export default App;
