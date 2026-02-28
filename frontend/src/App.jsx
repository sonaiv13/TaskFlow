import {useEffect, useState} from "react";
import {getCurrentUser, logout} from "./services/authService.js";
import LoginForm from "./components/LoginForm.jsx";

function App() {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = getCurrentUser();
        if(storedUser) {
            setUser(storedUser);
        }
    }, []);

    const handleLogout = () => {
        logout();
        setUser(null);
    };

    return (
      <div style={{ padding: '20px' }}>
          {!user ? (
              <LoginForm onLogin={setUser}/>
          ) : (
              <div>
                  <h2>Bienvenida {user.name}</h2>
                  <button onClick={handleLogout}>Cerrar sesión</button>
              </div>
          )}
      </div>
    );
}

export default App;
