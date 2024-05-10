 const validateUsername = (username) => {
  const regex=/^([A-Za-z][A-Za-z0-9]{6,})$/;
  if(regex.test(username))
  {
    return true;
  }
  else{
    return false;
  }
  
  };
  const validateMobileNo = (mobileNo) => {
     let reg=/^([0-9]{10})$/;
    if(reg.test(mobileNo)){
      return true;
    }else{
      return false;
    }
  };

  const validateEmail = (emailId) => {
    if(emailId.includes('@') && emailId.includes('.com')){
       return true;
    }else{
      return false;
    }
   
  };
  
  const validateRole = (role) => {
    const rol=role.toLowerCase();
    if(rol==='admin' || rol === 'user'){
      return true;
    }else{
      return false;
    }
  };
  
  const validateGender = (gender) => {
    return true;
  };
  
  const validatePassword = (password) => {
    const regex=/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;
    if(regex.test(password)){
      return true;
    }else{
      return false;
    }
  };
  
  module.exports = {
    validateUsername,
    validateMobileNo,
    validateEmail,
    validateRole,
    validateGender,
    validatePassword,
  };
  