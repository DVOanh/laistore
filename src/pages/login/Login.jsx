import { useState } from "react";
import "./Login.css";
import { useNavigate, useLocation } from 'react-router-dom';

function Login() {
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault(); // chặn reload

        console.log({
            email,
            password,
        });

        fetch('http://localhost:3000/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
            .then(res => {
                if (!res.ok) throw new Error('Loi ko nhan duoc data');
                return res.json();
            })
            .then((data) => {
                if (data.token) {
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("user", JSON.stringify(data.user));
                    if (data.user.role === "admin") {
                        navigate('/admin/dashboard', { replace: true });
                        window.location.reload();
                    }
                    else if (data.user.role === 'user') {
                        navigate(from, { replace: true });
                        window.location.reload();
                    }
                    else {
                        alert('Role ko hop le');
                    }

                }
                else {
                    alert("DDawnf nhap that bai")
                }

            })
            .catch(err => {
                alert(err.message);
            });

        // sau này gọi API ở đây
        // fetch('/api/login', {...})
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Đăng nhập</h2>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit">Đăng nhập</button>
            </form>
        </div>
    );
}

export default Login;
