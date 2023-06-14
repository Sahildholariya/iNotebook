import {React, useState } from 'react';
import { useNavigate  } from 'react-router-dom';

const Signup = (props) => {
    const [credentials, setCredentials] = useState({name:"",email:"", password:"",cpassword: ""})
    let history = useNavigate ();
  
    const host = "http://localhost:5000"
    let authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQyZDZmYjVmYTkxNjk5YThkODU1OTQxIn0sImlhdCI6MTY4MDg2NTIwN30.FNsqcsWG9SiUFNraJt37wF94GLae7uZnZg0VAVL4QJs"
  
     const hendlSubmit = async (e) =>{
         e.preventDefault();
        const  {name,email,password} = credentials;
          const response = await fetch(`${host}/api/auth/createuser`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              }, body: JSON.stringify({name,email,password})
            });
            const json = await response.json() 
            console.log(json)
            if(json.success){
              //save 
              localStorage.setItem('token',json.authtoken)
              props.showAlert("Account Created Successfully","success")
              history("/");
            }else{
                props.showAlert("Invalid credentials","danger")
            }
      }
      const onChange = (e)=>{
          setCredentials({...credentials, [e.target.name]: e.target.value})
      }
      
  return (
    <div className='container mt-3'>
     <h1 className='text-center'>Create an account to use iNotebook</h1>
     <form  onSubmit={hendlSubmit} >
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control"  onChange={onChange} id="name" name='name' aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control"  onChange={onChange} id="email" name='email' aria-describedby="emailHelp" />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control"  onChange={onChange} name="password" id="password" minLength={5} required/>
            </div>
            <div className="mb-3">
                <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                <input type="password" className="form-control" onChange={onChange} name="cpassword" id="cpassword" minLength={5} required
                />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
  )
}

export default Signup
