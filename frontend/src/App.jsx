import UserForm from "./components/UserForm";
import TaskForm from "./components/TaskForm.jsx";

function App() {
    return (
      <div style={{ padding: '20px' }}>
          <h1>TaskFlow App</h1>
          <h2>Crear Usuario</h2>
          <UserForm />
          <hr/>
          <h2>Crear Tarea</h2>
          <TaskForm />
      </div>
    );
}

export default App;
