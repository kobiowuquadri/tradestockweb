module.exports.handleErrors = (err) => {
    let errors = {email:"", password:""}
    if(err.message === "incorrect password"){
        errors.password = "Kindly enter a correct password"
        return errors
    }
    if(err.message === "incorrect email"){
       errors.email = "Invalid email address"
       return errors
    }
    return errors
}

