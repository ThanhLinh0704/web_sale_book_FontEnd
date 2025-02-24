import React, { useState } from "react";

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

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 8;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrorUserName("");
    setErrorEmail("");
    setErrorPassword("");
    setErrorPasswordAgain("");

    if (!userName) {
      setErrorUserName("Username is required");
      return;
    }

    if (!validateEmail(email)) {
      setErrorEmail("Invalid email format");
      return;
    }

    if (!validatePassword(password)) {
      setErrorPassword("Password must be at least 8 characters");
      return;
    }

    if (password !== passwordAgain) {
      setErrorPasswordAgain("Passwords do not match");
      return;
    }

    try {
      const checkUserExists = await checkUserNameExisted(userName);
      if (checkUserExists) return;

      const checkEmailExists = await checkEmailExisted(email);
      if (checkEmailExists) return;

      const url = "http://localhost:8080/account/signup";

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName,
          email,
          password,
          firstName,
          lastName,
          gender,
          phoneNumber,
        }),
      });

      if (response.ok) {
        setAnnounce("Sign up successful!");
      } else {
        setAnnounce("Sign up failed. Try again.");
      }
    } catch (error) {
      console.error("Error during sign up:", error);
      setAnnounce("Sign up error. Please try later.");
    }
  };

  const checkUserNameExisted = async (userName: string) => {
    const url = `http://localhost:8080/user/search/existsByUsername?username=${userName}`;

    try {
      const response = await fetch(url);
      const data = await response.text();
      if (data === "true") {
        setErrorUserName("Username already exists");
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error checking username", error);
      return false;
    }
  };

  const checkEmailExisted = async (email: string) => {
    const url = `http://localhost:8080/user/search/existsByEmail?email=${email}`;

    try {
      const response = await fetch(url);
      const data = await response.text();
      if (data === "true") {
        setErrorEmail("Email already exists");
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error checking email", error);
      return false;
    }
  };

  return (
    <div className="container">
      <h1 className="mt-5 text-center">Sign up</h1>
      <div className="md-3 col-md-6 col-12 mx-auto">
        <form onSubmit={handleSubmit} className="form">
          <div className="mb-3">
            <label htmlFor="userName">Username</label>
            <input
              type="text"
              id="userName"
              className="form-control"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <div style={{ color: "red" }}>{errorUserName}</div>
          </div>

          <div className="mb-3">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div style={{ color: "red" }}>{errorEmail}</div>
          </div>

          <div className="mb-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div style={{ color: "red" }}>{errorPassword}</div>
          </div>

          <div className="mb-3">
            <label htmlFor="passwordAgain">Confirm Password</label>
            <input
              type="password"
              id="passwordAgain"
              className="form-control"
              value={passwordAgain}
              onChange={(e) => setPasswordAgain(e.target.value)}
            />
            <div style={{ color: "red" }}>{errorPasswordAgain}</div>
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-primary">
              Sign up
            </button>
            <div style={{ color: "green" }}>{announce}</div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUpUser;
