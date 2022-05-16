import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Header } from './views/Header';
import Login from './views/auth/Login';
import Register from './views/auth/Register';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from './state/authSlice';
import { TaskBank } from './views/TaskBank';

function App() {
  const [currentPage, setCurrentPage] = useState('taskBank');
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
      case 'myTaskLists':
        return <div>Feladatsoraim</div>
      case 'taskBank':
        return <TaskBank />
      case 'profile':
        return <div>Profil</div>
      default:
        return <div>default</div>
    }
  }

  return (
    <div className='App'>
      <Header setCurrentPage={setCurrentPage} />
      {renderPage(currentPage)}
    </div>
  );
}

export default App;
