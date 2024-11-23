import React, { useState } from 'react'

function SignUpUser() {

    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [passwordAgain, setPasswordAgain] = useState("");
    const [gender, setGender] = useState("N");


    const [errorUserName, setErrorUserName] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [errorPasswordAgain, setErrorPasswordAgain] = useState("");
    const [announce, setAnnounce] = useState("");


    const handleSubmit = async(e: React.FormEvent)=>{
        setErrorUserName("");
        setErrorEmail("");
        setErrorPassword("");
        setErrorPasswordAgain("");

        e.preventDefault();
        try {
            const url = 'http://localhost:8080/account/signup';

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-type' : 'application/json',
                },
                body: JSON.stringify({
                    userName: userName,
                    email: email,
                    password: password,
                    firstName: firstName,
                    lastName:lastName,
                    gender:gender,
                    phoneNumber: phoneNumber,

                })
            });
            if (response.ok) {
                setAnnounce("successfull");
            } else {
                console.log(response.json());
                setAnnounce("error");
            }
        } catch (error) {
            setAnnounce("error");
        }
    }

    const checkUserNameExsited = async (userName: string)=> {
        const url = `http://localhost:8080/user/search/existsByUsername?username=${userName}`;
        
        try {
            const response = await fetch(url);
            const data = await response.text();
            if(data == "true") {
                setErrorUserName("user name excited")
                return true;
            }
            return false;
        } catch (error) {
            console.error("error check user name", error);
            return false;
        }
    }

    const handleUserName =  (e:React.ChangeEvent<HTMLInputElement>) => {
        setUserName(e.target.value);
        setErrorUserName("");
        return checkUserNameExsited(e.target.value);
    }

    const checkEmailExsited = async (email: string)=> {
        const url = `http://localhost:8080/user/search/existsByEmail?email=${email}`;
        
        try {
            const response = await fetch(url);
            const data = await response.text();
            if(data == "true") {
                setErrorEmail("email excited")
                return true;
            }
            return false;
        } catch (error) {
            console.error("error check user name", error);
            return false;
        }
    }

    const handleEmail =  (e:React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setErrorEmail("");
        return checkEmailExsited(e.target.value);
    }



    const handlePassword =  (e:React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        setErrorPassword("");
        
    }

    const checkPasswordAgain = (passwordAgain: string)=> {
       if (passwordAgain !== password) {
        setErrorPasswordAgain("password not suitable")
       } else {
        setErrorPasswordAgain("");
        return false;
       }
    }

    const handlePasswordAgain =  (e:React.ChangeEvent<HTMLInputElement>) => {
        setPasswordAgain(e.target.value);
        setErrorPasswordAgain("");
        return checkPasswordAgain(e.target.value);
    }

  return (
    <div className='container'>
      <h1 className='mt-5 text-center'>Sign up</h1>
      <div className='md-3 col-md-6 col-12 mx-auto'>
        <form onSubmit={handleSubmit} className='form'>
            <div className='mb-3'>
                <label htmlFor='userName' className='form-lable'>user name</label>
                <input type="text" id='userName' className='form-control' value={userName} onChange={handleUserName} />
                <div style={{color:"red"}}>{errorUserName}</div>
            </div>
            <div className='mb-3'>
                <label htmlFor='email' className='form-lable'>Email</label>
                <input type="text" id='email' className='form-control' value={email} onChange={handleEmail} />
                <div style={{color:"red"}}>{errorEmail}</div>
            </div>
            <div className='mb-3'>
                <label htmlFor='password' className='form-lable'>Password</label>
                <input type="text" id='password' className='form-control' value={password} onChange={handlePassword} />
                <div style={{color:"red"}}>{errorPassword}</div>
            </div>
            <div className='mb-3'>
                <label htmlFor='passwordAgain' className='form-lable'>Password Again</label>
                <input type="text" id='passwordAgain' className='form-control' value={passwordAgain} onChange={handlePasswordAgain} />
                <div style={{color:"red"}}>{errorPasswordAgain}</div>
            </div>
            <div className='mb-3'>
                <label htmlFor='firstName' className='form-lable'>first name</label>
                <input type="text" id='firstName' className='form-control' value={firstName} 
                onChange={(e) => setFirstName(e.target.value)} />
            </div>
            <div className='mb-3'>
                <label htmlFor='lastName' className='form-lable'>last name</label>
                <input type="text" id='lastName' className='form-control' value={lastName} 
                onChange={(e) => setLastName(e.target.value)} />
            </div>
            <div className='mb-3'>
                <label htmlFor='gender' className='form-lable'>Gender</label>
                <input type="text" id='gender' className='form-control' value={gender} 
                onChange={(e) => setGender(e.target.value)} />
            </div>
            <div className='mb-3'>
                <label htmlFor='phoneNumber' className='form-lable'>phone number</label>
                <input type="text" id='phoneNumber' className='form-control' value={phoneNumber} 
                onChange={(e) => setPhoneNumber(e.target.value)} />
            </div>
            <div className='text-center'>
                <button type='submit' className='btn btn-primary'> Sign up</button>
                <div style={{color:"green"}}>{announce}</div>
            </div>
        </form>
      </div>
    </div>
  )
}

export default SignUpUser

