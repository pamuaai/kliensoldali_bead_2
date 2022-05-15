import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Header } from './views/Header';
import Login from './views/auth/Login';
import Register from './views/auth/Register';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from './state/authSlice';

function App() {
  const [currentPage, setCurrentPage] = useState('a');
  const user = useSelector(selectCurrentUser);

  const renderPage = (pageName) => {
    switch (pageName) {
      case 'home':
        return <div>home</div>
      case 'login':
        if (!user) {
          return <Login setCurrentPage={setCurrentPage} />
        }
        return <div>home</div>
      case 'register':
        return <Register setCurrentPage={setCurrentPage} />
      case 'a':
        return <div>a</div>
      case 'b':
        return <div>b</div>
      default:
        return <div>default</div>
    }
  }

  return (
    <div className='App'>
      <Header setCurrentPage={setCurrentPage} loggedInUser={user} />
      {renderPage(currentPage)}
    </div>
  );
}

export default App;
