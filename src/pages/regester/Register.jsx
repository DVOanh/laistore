import { useState } from 'react';
import './register.css';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    async function register(e) {
        e.preventDefault();
        const response = await fetch('backend-production-f0ff.up.railway.app/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password,
                confirmPassword: confirmPassword
            })

        });

        const data = await response.json();
        if (!response.ok) {
            alert(data.message);
            return;
        }

        alert(data.message);
        console.log(data);
        navigate('/');
    }
    return (
        <form className='formdangky' onSubmit={register}>
            <input type="text" placeholder="Nhap username"
                value={username} onChange={(e) => { setUsername(e.target.value) }} className='username'/>
            <input type="password" placeholder="Nhap password" value={password} onChange={(e) => { setPassword(e.target.value) }} className='password'/>
            <input type="password" placeholder="Nhap lai password" value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value) }} className='confirmPassword'/>
            <input type="text" placeholder="Nhap email" value={email} onChange={(e) => { setEmail(e.target.value) }} required className='email'/>
            <button type="submit" className='btndangky'>Đăng ký</button>
        </form>
    )
}

export default Register;