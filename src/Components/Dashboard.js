import React,{useState, useEffect, useContext} from "react"; 
import axios from "axios";
import UserContext from "../Context/UserContext";
import {useNavigate} from "react-router-dom";



const Dashboard = () => {
    const [message, setMessage] = useState("")
    const [name, setName] = useState("")
    const {token,setToken} = useContext(UserContext);

    const navigate = useNavigate();

    useEffect(()=>{
       token && getJoke();
    },[token])

    useEffect(()=>{
      if(!token){
       let jsonToken =   localStorage.getItem("token")
       console.log(jsonToken)
       if(!jsonToken){
              navigate("/login")
       }
      else{
          setToken(JSON.parse(jsonToken))
        }

      }
    },[])


   async function getJoke(){
         try{
             const response = await axios.get("https://instagram-express-app.vercel.app/api/auth/zuku",{
                 headers:{
                    authorization : `Bearer ${token}`
                 }
             })
             setMessage(response.data.data.message)
             setName(response.data.data.user.name)
         }
        catch(err){
                console.log(err)
        }
    }

   async function logout(){
         try{
            const response = await axios.delete("https://instagram-express-app.vercel.app/api/auth/logout",{
                headers:{
                    authorization : `Bearer ${token}`
                 }
            })
            setToken("")
            setName("")
            setMessage("")
            alert("Logout Successful")
            navigate("/login")

         }
         catch(err){
             console.log(err)
         }
    }

    return(
        <div>
            <div className="logout">
                <button onClick={logout}>Logout</button>
            </div>
            <h1>Welcome {name}</h1>
            {
                message && <p>{message}</p>
            }
            
        </div>
    )
}

export default Dashboard;


//logout