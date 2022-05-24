import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Header } from './views/Header';
import Login from './views/auth/Login';
import Register from './views/auth/Register';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from './state/authSlice';
import { TaskBank } from './views/TaskBank';
import { Profile } from './views/Profile';
import { TaskListBank } from './views/TaskListBank';
import { EditTaskList } from './views/EditTaskList';
import { Home } from './views/Home';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const user = useSelector(selectCurrentUser);

  const renderPage = (pageName) => {
    switch (pageName) {
      case 'home':
        return <Home setCurrentPage={setCurrentPage} />;
      case 'taskBank':
        return <TaskBank />
      case 'myTaskLists':
        return user ? <TaskListBank setCurrentPage={setCurrentPage} /> : <Login setCurrentPage={setCurrentPage} />;
      case 'profile':
        return user ? <Profile setCurrentPage={setCurrentPage} /> : <Login setCurrentPage={setCurrentPage} />;
      case 'editTaskList':
        return user ? <EditTaskList setCurrentPage={setCurrentPage} /> : <Login setCurrentPage={setCurrentPage} />;
      case 'login':
        return user ? <Home setCurrentPage={setCurrentPage} /> : <Login setCurrentPage={setCurrentPage} />;
      case 'register':
        return user ? <Home setCurrentPage={setCurrentPage} /> : <Register setCurrentPage={setCurrentPage} />;
      default:
        return <Home setCurrentPage={setCurrentPage} />;
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
