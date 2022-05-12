import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Header } from './components/Header';
import Login from './components/auth/Login';
import { defaultUsers } from './components/auth/auth.data';
import Register from './components/auth/Register';

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('a');
  const [users, setUsers] = useState(defaultUsers);

  const login = (user) => setLoggedInUser(user); // FUCKING HELL ERRE ADTAK EGY BACKENDET MIT BASZAKSZOM EZZEL
  const logout = () => setLoggedInUser(null); // FUCKING HELL ERRE ADTAK EGY BACKENDET MIT BASZAKSZOM EZZEL
  const register = (newUser) => setUsers([...users, newUser]); // FUCKING HELL ERRE ADTAK EGY BACKENDET MIT BASZAKSZOM EZZEL

  const renderPage = (pageName) => {
    switch (pageName) {
      case 'home':
        return <div>home</div>
      case 'login':
        return <Login login={login} setCurrentPage={setCurrentPage} userList={users} />
      case 'register':
        return <Register register={register} setCurrentPage={setCurrentPage} userList={users} />
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
      <Header setCurrentPage={setCurrentPage} loggedInUser={loggedInUser} logout={logout} />
      {renderPage(currentPage)}
    </div>
  );
}

export default App;
