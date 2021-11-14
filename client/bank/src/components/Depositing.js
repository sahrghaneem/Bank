import React from "react";
import axios from "axios";

const Depositing = ({passportId,cash,credit}) => {
    
    const [user,setUser] = React.useState({
      
        passportId:'',
        cash:'',
        credit:''
    })

    const Deposit = () =>{
        axios.put('http://127.0.0.1:5000/Depositing/Deposit/'+user.passportId, user)
                .then((res) => {
                    alert("User added successfully")
                }).catch((err)=>{
                    alert("failed to update")
                })
    }

    const AddCridet = () =>{
        axios.put('http://127.0.0.1:5000/Depositing/AddCridet/'+user.passportId, user)
                .then((res) => {
                    alert("User added successfully")
                }).catch((err)=>{
                    alert("failed to update")
                })
    }

    const CashHandler = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
        console.log("state :", user)
    }

    const CridetHandler = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
        console.log("state :", user)
    }

    return(
        <div>
            passportID : <input className="inpt" value={user.passportId} onChange={CashHandler} type="number" name={'passportId'}  /><br/>
            cash : <input className="inpt" value={user.cash} type="number" onChange={CashHandler} name={'cash'} />
            <input className="btn" type={'button'} value={'Deposit'} onClick={Deposit}/><br/>
            credit : <input className="inpt" value={user.credit} type="number" onChange={CridetHandler} name={'credit'} /> 
            <input className="btn"  type={'button'} value={'AddCridet'} onClick={AddCridet}/>


        </div>
    )
}

export default Depositing;

