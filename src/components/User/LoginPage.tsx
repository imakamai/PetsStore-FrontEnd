import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [message, setMessage] = useState<string | null>(null);
    const [isError, setIsError] = useState<boolean>(false);
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null); // Clear previous messages
        setIsError(false);

        try {
            // UPDATE THIS: Use the correct URL for your API
            const response = await axios.post('http://localhost:5000/api/Auth/login', {
                username,
                password,
            });

            if (response.status === 200) {
                setMessage(response.data.Message || 'Login successful!');
                // Store user data (e.g., in local storage)
                localStorage.setItem('user', JSON.stringify(response.data));

                // Redirect the user to the Product List page
                navigate('/products'); // Redirects to /products after successful login
            }
        } catch (error: any) {
            setIsError(true);
            if (axios.isAxiosError(error) && error.response) {
                setMessage(error.response.data.Message || error.response.data || 'Login failed. Please try again.');
            } else if (error.request) {
                setMessage('No response from server. Please check your network connection.');
            } else {
                setMessage('An unexpected error occurred. Please try again later.');
            }
            console.error('Login error:', error);
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="username" style={{ display: 'block', marginBottom: '5px' }}>Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box', border: '1px solid #ddd', borderRadius: '4px' }}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box', border: '1px solid #ddd', borderRadius: '4px' }}
                    />
                </div>
                <button
                    type="submit"
                    style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                    Login
                </button>
            </form>
            {message && (
                <p style={{ marginTop: '15px', color: isError ? 'red' : 'green', textAlign: 'center' }}>
                    {message}
                </p>
            )}
            <p style={{ marginTop: '20px', textAlign: 'center' }}>
                Don't have an account?{' '}
                {/* Use Link component for proper React Router navigation */}
                <Link to="/register" style={{ color: '#007bff', textDecoration: 'none' }}>Register here</Link>
            </p>
        </div>
    );
};

export default LoginPage;




// import React, { useState } from 'react';
// import axios from 'axios';
//
// const LoginPage: React.FC = () => {
//     const [username, setUsername] = useState<string>('');
//     const [password, setPassword] = useState<string>('');
//     const [message, setMessage] = useState<string | null>(null);
//     const [isError, setIsError] = useState<boolean>(false);
//
//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setMessage(null); // Clear previous messages
//         setIsError(false);
//
//         try {
//             const response = await axios.post('https://your-api-url.com/api/Auth/login', {
//                 username,
//                 password,
//             });
//
//             // Assuming successful login returns a 200 status and data
//             if (response.status === 200) {
//                 setMessage(response.data.Message || 'Login successful!');
//                 // Here you would typically store the user data (e.g., in context, Redux, or local storage)
//                 // For example: localStorage.setItem('user', JSON.stringify(response.data));
//                 // Then redirect the user
//                 console.log('User data:', response.data);
//             }
//         } catch (error: any) {
//             setIsError(true);
//             if (error.response) {
//                 // The request was made and the server responded with a status code
//                 // that falls out of the range of 2xx
//                 setMessage(error.response.data || 'Login failed. Please try again.');
//             } else if (error.request) {
//                 // The request was made but no response was received
//                 setMessage('No response from server. Please check your network connection.');
//             } else {
//                 // Something happened in setting up the request that triggered an Error
//                 setMessage('An unexpected error occurred. Please try again later.');
//             }
//             console.error('Login error:', error);
//         }
//     };
//
//     return (
//         <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
//             <h2>Login</h2>
//             <form onSubmit={handleSubmit}>
//                 <div style={{ marginBottom: '15px' }}>
//                     <label htmlFor="username" style={{ display: 'block', marginBottom: '5px' }}>Username:</label>
//                     <input
//                         type="text"
//                         id="username"
//                         value={username}
//                         onChange={(e) => setUsername(e.target.value)}
//                         required
//                         style={{ width: '100%', padding: '8px', boxSizing: 'border-box', border: '1px solid #ddd', borderRadius: '4px' }}
//                     />
//                 </div>
//                 <div style={{ marginBottom: '15px' }}>
//                     <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>Password:</label>
//                     <input
//                         type="password"
//                         id="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                         style={{ width: '100%', padding: '8px', boxSizing: 'border-box', border: '1px solid #ddd', borderRadius: '4px' }}
//                     />
//                 </div>
//                 <button
//                     type="submit"
//                     style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
//                 >
//                     Login
//                 </button>
//             </form>
//             {message && (
//                 <p style={{ marginTop: '15px', color: isError ? 'red' : 'green', textAlign: 'center' }}>
//                     {message}
//                 </p>
//             )}
//             <p style={{ marginTop: '20px', textAlign: 'center' }}>
//                 Don't have an account? <a href="/src/components/User/RegisterPage">Register here</a>
//             </p>
//         </div>
//     );
// };
//
// export default LoginPage;