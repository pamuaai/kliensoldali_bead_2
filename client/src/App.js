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

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const user = useSelector(selectCurrentUser);

  const renderPage = (pageName) => {
    switch (pageName) {
      case 'home':
        return <div>home</div>
      case 'taskBank':
        return <TaskBank />
      case 'myTaskLists':
        return <TaskListBank setCurrentPage={setCurrentPage} />
      case 'profile':
        return <Profile setCurrentPage={setCurrentPage} />
      case 'editTaskList':
        return <EditTaskList setCurrentPage={setCurrentPage} />
      case 'login':
        if (!user) {
          return <Login setCurrentPage={setCurrentPage} />
        }
        return <div>home</div>
      case 'register':
        return <Register setCurrentPage={setCurrentPage} />
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
