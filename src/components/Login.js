import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    const [credentials, setCredentials] = useState({email: "", password: ""}) 
    const navigate = useNavigate();
    const handleSubmit = async(e)=>{
       e.preventDefault();
       const response = await fetch("http://localhost:8080/api/auth/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: credentials.email, password: credentials.password})
    });
    const json = await response.json()
    console.log(json);
    if (json.success){
        localStorage.setItem('token', json.authtoken); 
        navigate("/");
        props.showAlert("Login successfully","success");
    }
    else{
       props.showAlert("Invalid creadentilas","danger");
    }
 }
 const onChange = (e)=>{
    setCredentials({...credentials, [e.target.name]: e.target.value})
}
  return (
   <div className='container'>
    <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label className="form-label">Email address</label>
            <input type="email" className="form-control" id='email' name="email" onChange={onChange} value={credentials.email} />
        </div>
        <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" id='password' name="password" onChange={onChange} value={credentials.password}/>
        </div>
        <button type="submit" className="btn btn-primary" >Submit</button>
        </form>
   </div>
  )
}

export default Login
