import { useRef, useState } from "react";
import { Link } from "react-router-dom";

function Signup() {
  let firstNameInputRef = useRef();
  let lastNameInputRef = useRef();
  let ageInputRef = useRef();
  let emailInputRef = useRef();
  let passwordInputRef = useRef();
  let mobileNumberInputRef = useRef();
  let profilePicInputRef = useRef();

  let [profilePic, SetProfilePic] = useState(
    "https://pulse.brninfotech.com/media/auth/images/no-pic3.png"
  );

  let onSignupUsingJSON = async () => {
    let dataToSendJSO = {
      firstName: firstNameInputRef.current.value,
      lastName: lastNameInputRef.current.value,
      age: ageInputRef.current.value,
      email: emailInputRef.current.value,
      password: passwordInputRef.current.value,
      mobileNumber: mobileNumberInputRef.current.value,
    };
    let dataToSendJSON = JSON.stringify(dataToSendJSO);
    console.log(dataToSendJSO);
    console.log(dataToSendJSON);

    let myHeaders = new Headers();
    myHeaders.append("content-type", "application/json");

    let reqOptions = {
      method: "POST",
      body: dataToSendJSON,
      headers: myHeaders,
    };

    let JSONData = await fetch("http://localhost:4444/signup", reqOptions);
    let JSOData = await JSONData.json();
    console.log(JSOData);
  };

  let onSignupUsingURLE = async () => {
    let dataTosend = new URLSearchParams();
    dataTosend.append("firstName", firstNameInputRef.current.value);
    dataTosend.append("lastName", lastNameInputRef.current.value);
    dataTosend.append("age", ageInputRef.current.value);
    dataTosend.append("email", emailInputRef.current.value);
    dataTosend.append("password", passwordInputRef.current.value);
    dataTosend.append("mobileNumber", mobileNumberInputRef.current.value);

    let myHeaders = new Headers();
    myHeaders.append("content-type", "application/x-www-form-urlencoded");

    let reqOptions = {
      method: "POST",
      body: dataTosend,
      headers: myHeaders,
    };

    let JSONData = await fetch("http://localhost:4444/signup", reqOptions);
    let JSOData = await JSONData.json();
    console.log(JSOData);
    alert(JSOData.message);
  };

  let onSignupUsingFD = async () => {
    let dataTosend = new FormData();
    dataTosend.append("firstName", firstNameInputRef.current.value);
    dataTosend.append("lastName", lastNameInputRef.current.value);
    dataTosend.append("age", ageInputRef.current.value);
    dataTosend.append("email", emailInputRef.current.value);
    dataTosend.append("password", passwordInputRef.current.value);
    dataTosend.append("mobileNumber", mobileNumberInputRef.current.value);
    for (let i = 0; i <= profilePicInputRef.current.files.length; i++) {
      dataTosend.append("profilePic", profilePicInputRef.current.files[i]);
    }

    let reqOptions = {
      method: "POST",
      body: dataTosend,
    };

    let JSONData = await fetch("http://localhost:4444/signup", reqOptions);
    let JSOData = await JSONData.json();
    console.log(JSOData);
    alert(JSOData.message);
  };

  return (
    <div className="App">
      <h1>Signup</h1>
      <form>
        <div>
          <label>First Name</label>
          <input type="text" ref={firstNameInputRef}></input>
        </div>
        <div>
          <label>Last Name</label>
          <input type="text" ref={lastNameInputRef}></input>
        </div>
        <div>
          <label>Age</label>
          <input type="number" ref={ageInputRef}></input>
        </div>
        <div>
          <label>Email</label>
          <input type="email" ref={emailInputRef}></input>
        </div>
        <div>
          <label>Password</label>
          <input ref={passwordInputRef}></input>
        </div>
        <div>
          <label>Mobile Number</label>
          <input type="number" ref={mobileNumberInputRef}></input>
        </div>
        <div>
          <label>Profile Pic</label>
          <input
            type="file"
            // multiple
            ref={profilePicInputRef}
            onChange={(eo) => {
              let selectedPath = URL.createObjectURL(eo.target.files[0]);
              SetProfilePic(selectedPath);
            }}
          ></input>
        </div>
        <div>
          <img className="profilePic" src={profilePic} alt=""></img>
        </div>
        <div>
          <button
            type="button"
            onClick={() => {
              onSignupUsingJSON();
            }}
          >
            Sign Up(JSON)
          </button>
          <button
            type="button"
            onClick={() => {
              onSignupUsingURLE();
            }}
          >
            Sign Up(URLE)
          </button>
          <button
            type="button"
            onClick={() => {
              onSignupUsingFD();
            }}
          >
            Sign Up(FD)
          </button>
        </div>
      </form>
      <br></br>
      <br></br>
      <Link to={"/"}>Login</Link>
    </div>
  );
}

export default Signup;
