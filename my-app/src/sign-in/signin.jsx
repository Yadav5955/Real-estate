import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {AiOutlineEye,AiOutlineEyeInvisible} from "react-icons/ai"
import "./signin.css"


const Signin = () => {

    const[visibility,setVisibility]=useState(false);

    const toggleBtn=()=>{
        setVisibility(prevVisibility=>!prevVisibility)
    }
   
    let navigate = useNavigate()

    const naviSignup = () => {
        navigate("/signup")
    }
    const [signindata, setSignindata] = useState({ email:"", password:"" })

    const handleLogin = () => {
        if(signindata.email.length){
        axios({
           
            url: "https://real-estate-backend-3jtv.onrender.com/login",
            method: "POST",
            headers: {
                

            },
            data: signindata
        }).then((data) => {       
            console.log(data.data)
            if(data.data.token.length>0){
                localStorage.setItem("authorization", data.data.token);
                 localStorage.setItem('userid',signindata.email)
                 alert(`${signindata.email} signed in sucessfully`)
                navigate("/listproperty")
            }
        }).catch((err) => {
            alert(err.response.data)
            if(err.response.data==="email not exist please signup"){
                navigate("/signup")
            }
        
        })

    }else{
        alert("email cann't be empty")
    }

    }

    return (
        <div className="logincontainer">
            <div className="logbox">
            <h1 className="logologin">Logo</h1>
            <p  className="paragraph2">Enter your credentials to access your account </p>
            {/* <form > */}
                <div>
                <input className="logininput1" placeholder="Email ID" type="text" onChange={(e) => { setSignindata({ ...signindata, email: e.target.value }) }} />
                </div>
                <div className="input-wrapper">
                <input  className="logininput2"placeholder="Password" type={visibility?"text":"password"} onChange={(e) => { setSignindata({ ...signindata, password: e.target.value }) }} />
                <button className="btn" onClick={toggleBtn}>{
                visibility?<AiOutlineEye/>:<AiOutlineEyeInvisible/>
                }</button>
                </div>
                <button className="signin" onClick={handleLogin}>Sign In</button>
                <p className="account" onClick={naviSignup}>Sign up</p>
                </div>
                
             {/* </form> */}
             <div className="signin-setup">
             <span >Don't have an account?</span>
             <p className="blue" onClick={naviSignup}>Sign up</p>
             </div>
           
        </div>
    )
}

export default Signin