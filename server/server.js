const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const showUser=require('./usersContoller')
const fs = require('fs');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());


app.get('/',async function (req, res) {
    const data= await showUser.showAllUser()
    console.log(data);
    res.status(200).json({data})
})

app.post('/', async(req, res) => {
    const data=await showUser.showAllUser()
    if(data.find((user)=> { return req.body.passportId ===user.passportId })){
        console.log("we will return now with 404")
        return res.status(404).send('user exist')
    }

   let arr= await showUser.addNewUser( req.body.name,req.body.country,req.body.passportId,req.body.username)
   console.log("whaa",arr)
    return res.status(209).json(arr)
})

app.put('/Depositing/:passportId', async(req,res) => {
    const{passportId}=req.params
    const data=await showUser.showAllUser()
    let updateduser = data.find(user => passportId === user.passportId)
    if(updateduser){
        updateduser.cash+=parseInt(req.body.cash); 
    const filterData=data.filter(d=>d.passportId!==passportId)
    filterData.push(updateduser)
    fs.writeFile('./USERS.json', JSON.stringify(filterData),(err) => {
        if (err) {
            console.log(err);
        }
    })
    return res.status(200).json(updateduser)
}
    })

app.put('/Depositing/Deposit/:passportId', async(req,res) => {
        const{passportId}=req.params
        const data=await showUser.showAllUser()
        let updateduser = data.find(user => passportId === user.passportId)
        if(updateduser){
            updateduser.cash+=parseInt(req.body.cash); 
        const filterData=data.filter(d=>d.passportId!==passportId)
        filterData.push(updateduser)
        fs.writeFile('./USERS.json', JSON.stringify(filterData),(err) => {
            if (err) {
                console.log(err);
            }
        })
        return res.status(209).json(updateduser)
    }
        })


    app.put('/Depositing/AddCridet/:passportId', async(req,res) => {
            const{passportId}=req.params
            const data=await showUser.showAllUser()
            let updateduser = data.find(user => passportId === user.passportId)
            if(updateduser){
                updateduser.credit=parseInt(req.body.credit); 
            const filterData=data.filter(d=>d.passportId!==passportId)
            filterData.push(updateduser)
            fs.writeFile('./USERS.json', JSON.stringify(filterData),(err) => {
                if (err) {
                    console.log(err);
                }
            })
            return res.status(200).json(updateduser)
        }
            })
app.listen(5000)