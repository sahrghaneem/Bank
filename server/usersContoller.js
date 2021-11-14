const fs = require('fs');
const uniqid = require('uniqid'); 


const showAllUser = () => {
    return new Promise(((resolve, reject) => {
        if (!fs.existsSync('./USERS.json')) {
            fs.writeFileSync('./USERS.json', '[]')
        }
    else{
       fs.readFile('./USERS.json', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(data.toString()))
            }
        });
    }
    }))

}

const addNewUser = async (name, country,passportId,username) => {
    const file = await showAllUser()
    const user = file.find(user => user.passportId === passportId);
    if (user) {
        return false;
    } else {
        let AllUsers = file;
      let newuser={
     id:uniqid(),
    name: name,
            country: country,
            passportId:passportId,
            username:username,
            cash:0,
            credit:0
        };
        AllUsers.push(newuser)
        fs.writeFile('./USERS.json', JSON.stringify(AllUsers), (err) => {
            if (err) {
                console.log(err);
            }
        });
        return newuser
    }
}

// const updateCash = async (passportId,cash) =>{
//     const file = await showAllUser()
//     const user = file.find(e => e.passportId === passportId);

//     if (user){
//         user.cash+=parseInt(cash);
//     }
//     else{
//         alert("passport id does not exist")
//     }
// }

module.exports = {
    showAllUser,
    addNewUser,
}

