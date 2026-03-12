import {useContext, useState} from "react";
import LoginForm from "./components/LoginForm.jsx";
import RegisterForm from "./components/RegisterForm.jsx";
import TaskList from "./components/TaskList.jsx";
import {AuthContext} from "./context/AuthContext.jsx";

function App() {

    const { user, logout } = useContext(AuthContext);

    const [showRegister, setShowRegister] = useState(false);

    // Si no hay usuario logueado
    if(!user){
        return showRegister ? (
            <div style={{ padding: '20px' }}>
                <h1>TaskFlow - Registro</h1>
                <RegisterForm
                    onSwitch={() => setShowRegister(false)}
                />
            </div>
        ) : (
            <div style={{ padding: '20px' }}>
                <h1>TaskFlow - Login</h1>
                <LoginForm
                    onSwitch={() => setShowRegister(true)}
                />
            </div>
        );
    }

    //Si hay usuario logueado
    return (
      <div style={{ padding: '20px' }}>
          <h2>Bienvenida {user.name}</h2>
          <button onClick={logout}>
              Cerrar sesión
          </button>

          <TaskList user={user}/>
      </div>
    );
}

export default App;
