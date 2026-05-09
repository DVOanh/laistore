import { useState } from 'react';
import './register.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    async function register(e) {
        e.preventDefault();
        const response = await fetch('https://backend-viv4.onrender.com/user', {
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
        <div style={{ height: "calc(100vh - 80px)" }}>
            <form className='formdangky' onSubmit={register} autoComplete='off'>
                <label htmlFor="">Username</label>
                <input type="text" placeholder="Nhap username"
                    value={username} onChange={(e) => { setUsername(e.target.value) }} className='username' autoComplete='off' />
                
                <label htmlFor="">Email</label>
                <input type="text" placeholder="Nhap email" value={email} onChange={(e) => { setEmail(e.target.value) }} required className='email' />
                
                <label htmlFor="">Password</label>
                <input type="password" placeholder="Nhap password" value={password} onChange={(e) => { setPassword(e.target.value) }} className='password' autoComplete='new-password' />
                
                <label htmlFor="">Nhập lại password</label>
                <input type="password" placeholder="Nhap lai password" value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value) }} className='confirmPassword' />

                <button type="submit" className='btndangky'>Đăng ký</button>
                <div className="cotk">
                    <p>Bạn đã có tài khoản?
                    </p>
                    <Link to={'/login'}>Đăng nhập</Link>
                </div>
            </form>

        </div>

    )
}

export default Register;