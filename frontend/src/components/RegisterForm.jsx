import { useState } from "react";
import { register } from "../services/authService.js";

function RegisterForm({ onSwitch}) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try{
            await register(name, email, password);
            onSwitch(); // vuelve al login
        } catch (error) {
            setError("Error al crear la cuenta. Inténtalo de nuevo.");
        } finally {
            setLoading(false);
        }
    };

    const inputStyle = {
        background: "var(--bg-primary)",
        border: "1px solid var(--border)",
        color: "var(--text-primary)",
    };

    return (
       <div className='w-full max-w-md animate-fadeUp'>
           {/* Logo */}
           <div className='text-center mb-8'>
               <div
                   className='w-14 h-14 rounded-2xl flex items-center justify-center text-white text-xl font-bold mx-auto mb-4'
                   style={{
                       background: 'linear-gradient(135deg, var(--accent), #5b4dd4',
                       boxShadow: '0 8px 32px var(--accent-glow)',
                   }}
               >
                   TF
               </div>
               <h1
                   className='text-3xl font-bold mb-1'
                   style={{ fontFamily: "'Syne', sans-serif", color: "var(--text-primary)" }}
               >
                   Crear cuenta
               </h1>
               <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                   Únete y empieza a organizar tu día
               </p>
           </div>

           {/* Card */}
           <div
               className='rounded-2xl p-8'
               style={{
                   background: 'var(--bg-card)',
                   border: '1px solid var(--border)',
                   boxShadow: '0 24px 64px rgba(0,0,0,0.4)',
               }}
           >
               {error && (
                   <div
                       className='mb-5 px-4 py-3 rounded-lg text-sm'
                       style={{
                           background: 'rgba(248,113,113,0.1)',
                           border: '1px solid rgba(248,113,113,0.3)',
                           color: 'var(--danger)',
                       }}
                   >
                       {error}
                   </div>
               )}

               <form onSubmit={handleSubmit} className='space-y-4'>
                   {[
                       {label: 'Nombre', type: 'text', value: name, setter: setName, placeholder: 'Tu nombre'},
                       {label: 'Email', type: 'email', value: email, setter: setEmail, placeholder: 'tu@email.com'},
                       {label: 'Contraseña', type: 'password', value: password, setter: setPassword, placeholder: '••••••••'},
                   ].map(({ label, type, value, setter, placeholder}) =>  (
                       <div key={label}>
                           <label
                               className='block text-sm font-medium mb-2'
                               style={{ color: 'var(--text-muted)' }}
                           >
                               {label}
                           </label>
                           <input
                               type={type}
                               placeholder={placeholder}
                               value={value}
                               onChange={(e) => setter(e.target.value)}
                               required
                               className='w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200'
                               style={inputStyle}
                               onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
                               onBlur={e => (e.target.style.borderColor = 'var(--border)')}
                           />
                       </div>
                   ))}

                   <button
                       type='submit'
                       disabled={loading}
                       className='w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200 mt-2'
                       style={{
                           background: loading
                               ? 'rgba(124,109,240,0.5)'
                               : 'linear-gradient(135deg, var(--accent), #5b4dd4)',
                           color: 'white',
                           border: 'none',
                           cursor: loading ? 'not-allowed' : 'pointer',
                           boxShadow: loading ? 'none' : '0 4px 20px var(--accent-glow)',
                       }}
                       onMouseEnter={e => {
                           if (!loading) e.currentTarget.style.transform = 'translateY(-1px)';
                       }}
                       onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
                   >
                       {loading ? 'Creando cuenta...' : 'Registrarse'}
                   </button>
               </form>

               <p className='text-center mt-6 text-sm' style={{ color: 'var(--text-muted)'}}>
                   ¿Ya tienes cuenta?{" "}
                   <button
                       type='button'
                       onClick={onSwitch}
                       style={{
                           background: 'none',
                           border: 'none',
                           color: 'var(--accent-light)',
                           cursor: 'pointer',
                           padding: 0,
                           fontWeight: 600,
                       }}
                       onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
                       onMouseLeave={e => (e.currentTarget.style.color = 'var(--accent-light)')}
                   >
                       Inicia sesión
                   </button>
               </p>
           </div>
       </div>
    );
}

export default RegisterForm;