export const obfuscateEmail =(email:string)=>{

    const regexExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;
    if(regexExp.test(email)){
        const atIndex = email.indexOf('@');
        const obfuscatedPart = email.substring(0, atIndex);
        const obfuscatedEmail = obfuscatedPart + '@\*\*\*.org';
        return obfuscatedEmail;
    } else{
        return email;
    } 

 
  }


  export const formatDate = (timestamp:number) => {

    
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.getMonth() + 1; 
    const year = date.getFullYear();
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    return `${day} ${months[month]} ${year}`;
  };
  

  export const inputFormartedDate=(timestamp:number)=> {

    if(timestamp){
        var date = new Date(timestamp).toISOString().slice(0, 10);
        return date;

    }
    else return ""
  
   
  }

  export const convertDateToTimeStamp=(date:any)=>{
  var dateObj = new Date(date);

  var timestamp = dateObj.getTime();

  return timestamp;
  }