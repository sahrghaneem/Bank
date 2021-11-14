import React from "react";
import axios from "axios";

const AddNewUser  = ({name,country,id,username,passportId}) => {
    const [users, setUsers] = React.useState([]);
    const [user, setUser] = React.useState({
        name: '',
        country: '',
        username:'',
        passportId:'',
    })

    const addUser = () => {
            if(user.name && user.country && user.username && user.passportId) {
            axios.post('http://127.0.0.1:5000/', user)
                .then((res) => {
                    if (res.status === 209) {
                        alert("User added successfully")
                        let list = [...users, res.data.user];
                        setUsers(list);
                        let emptyTxt=document.querySelectorAll(".inpt")
                       emptyTxt.forEach(e =>
                           e.value=""
                       )
                    }
                    else
                    {
                        alert("SumTingWong")
                    }
                    
                }).catch((err) => {
                    alert("passport id already exists in our database")
            })
        }
        else{
            alert("Please fill all the inputs")
        }
        
    }

    const AddHandler = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
        console.log("state :", user)
    }

    return(
        <div>
        <div>
            name : <input className="inpt" value={user.name} type="text" name={'name'} onChange={AddHandler} /> <br/>
            country : <input className="inpt" value={user.country} type="text" name={'country'} onChange={AddHandler} /><br/>
            username : <input className="inpt" value={user.username} type="text" name={'username'} onChange={AddHandler}  /><br/>
            passportID : <input className="inpt" value={user.passportId} type="text" name={'passportId'} onChange={AddHandler} /><br/>
            <input className="btn"  type={'button'} value={'add'} onClick={addUser}/>
        </div>
        </div>
    )
}

export default AddNewUser; 