import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import React, { useState } from "react";
import auth from "../../firebase/firebase.config";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Register = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const terms = e.target.terms.checked;

    setError("");
    setSuccess("");

    if (password.length < 6) {
      setError("Password must be 6 character or longer");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setError("Password must be 1 character capital letter");
      return;
    } else if (!terms) {
      setError("Please Accept Our Terms and Conditions");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        //update profile
        updateProfile(result.user, {
          displayName: name,
          photoURL: "https://i.ibb.co/hf583h7/towsif.jpg",
        })
        .then(()=>{
          console.log("profile updated successfull")
        })
        .catch(error=>{
          setError(error.message)
        })

        //email verification
        sendEmailVerification(result.user).then(() => {
          alert("Please check your email to verify your account");
        });
        setSuccess("User Created Successfully");
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
      });
  };

  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Register now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <form onSubmit={handleRegister}>
            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <div className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Your Name"
                    name="name"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="email"
                    name="email"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="password"
                      name="password"
                      className="input input-bordered"
                      required
                    />
                    <span
                      className="absolute right-5 top-4"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <FaRegEyeSlash></FaRegEyeSlash>
                      ) : (
                        <FaRegEye></FaRegEye>
                      )}
                    </span>
                  </div>

                  <div className="my-4">
                    <input
                      className="mr-2"
                      type="checkbox"
                      name="terms"
                      id="terms"
                    />
                    <label htmlFor="terms">Accept our terms & condition</label>
                  </div>
                </div>
                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-500">{success}</p>}
                <div className="form-control mt-6">
                  <button className="btn btn-primary">Register</button>
                </div>
                <p className="flex my-2">
                  Already have an account? Please{" "}
                  <Link
                    className="p-2 rounded bg-blue-400 text-white"
                    to="/login"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
