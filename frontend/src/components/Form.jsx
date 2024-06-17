import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants"; 
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"

function Form({ route, method }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const name = method === 'login' ? "Login To Your Account" : "Register Your Account";
    const buttonText = method === 'login' ? "Login" : "Register";

    const handelSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const res = await api.post(route, { username, password });
            if (method === 'login') {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                console.log("working")
                navigate('/');
            } else {
                console.log("not working")
                navigate('/login');

            }
        } catch (error) {
            alert(error)
        } finally {
            setLoading(false);
        }
    }

    return <form onSubmit={handelSubmit} className="form-control">
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="container col-md-6">
                    <h1 className="text-center">{name}</h1>
                    
                    <div className="mb-3">
                        <input className="form-control" type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username"/>
                    </div>
                    <div className="mb-3">
                        <input className="form-control" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                    </div>
                    
                    <div className="text-center">
                        <button className="btn btn-primary" type="submit">{buttonText}</button>
                    </div>
                </div>
            </div>
            
        </form>
}

export default Form