import React, { useState } from 'react';
import logo from '../assets/logo.png';

const Password = ({ email, handleChange, error, handleSubmit}) => {
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false); // State for password visibility

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        handleChange(e); // Ensure this updates the form data in the parent component
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(prevState => !prevState); // Toggle password visibility
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen bg-gray-50 p-4">
            <div className="max-w-sm">
                <div className="mb-6">
                    <img src={logo} alt="Xfinity" className="w-20" />
                </div>

                {/* Display Email Above Password */}
                <p className="text-gray-700 mb-6 text-sm font-bold">
                    {email}
                </p>

                <h1 className="text-2xl font-bold mb-4">Enter your password</h1>

                <div className="relative mb-4">
                  
                        <input
                            type={passwordVisible ? 'text' : 'password'} // Toggle input type based on visibility
                            name="password"
                            value={password}
                            onChange={handlePasswordChange}
                            placeholder="Password"
                            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-600"
                        />
                      {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
                   

                    <button
                        type="button"
                        className="absolute inset-y-0 right-4 flex items-center text-gray-500"
                        onClick={togglePasswordVisibility} // Toggle visibility on button click
                        aria-label={passwordVisible ? "Hide password" : "Show password"} // Improve accessibility
                    >
                        {/* Optionally add an icon for showing/hiding password */}
                        {passwordVisible ? 'Hide' : 'Show'}
                    </button>
                </div>

                <a href="#" className="text-purple-600 text-sm mb-4 block">
                    Forgot password?
                </a>

                <div className="flex items-center mb-4">
                    <input type="checkbox" id="keep-signed-in" className="mr-2" />
                    <label htmlFor="keep-signed-in" className="text-sm text-gray-700">
                        Keep me signed in
                    </label>
                </div>

                <p className="text-sm text-gray-500 mb-6">
                    By signing in, you agree to our{' '}
                    <a href="#" className="text-purple-600">
                        Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="#" className="text-purple-600">
                        Privacy Policy
                    </a>.
                </p>

                <button
                    type="button"
                    className="bg-purple-700 hover:bg-purple-800 rounded-md text-white py-4 px-6 font-bold mb-4"
                    onClick={handleSubmit} // Call handleNext here to move to the next step
                >
                    Log in
                </button>

                <p className="text-sm text-gray-700">
                    <a href="#" className="text-black hover:underline">
                        
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Password;
