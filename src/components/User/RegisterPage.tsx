import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate

const RegisterPage: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        surName: '',
        email: '',
        username: '',
        password: '',
        age: '',
        address: '',
        city: '',
        postalCode: '',
        region: '',
        country: '',
        phone: '',
    });
    const [message, setMessage] = useState<string | null>(null);
    const [isError, setIsError] = useState<boolean>(false);
    const navigate = useNavigate(); // Initialize useNavigate

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null); // Clear previous messages
        setIsError(false);

        try {
            // UPDATE THIS: Use the correct URL for your API
            const response = await axios.post('http://localhost:5000/api/Auth/register', formData);

            if (response.status === 200) {
                setMessage(response.data || 'Registration successful!');
                // Redirect to the Product List page after successful registration
                // Adding a small delay to show the success message
                setTimeout(() => {
                    navigate('/products');
                }, 1500);
            }
        } catch (error: any) {
            setIsError(true);
            if (axios.isAxiosError(error) && error.response) {
                setMessage(error.response.data || 'Registration failed. Please check your input.');
            } else if (error.request) {
                setMessage('No response from server. Please check your network connection.');
            } else {
                setMessage('An unexpected error occurred. Please try again later.');
            }
            console.error('Registration error:', error);
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                {/* Basic Information */}
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="name" style={{ display: 'block', marginBottom: '5px' }}>Name:</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box', border: '1px solid #ddd', borderRadius: '4px' }} />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="surName" style={{ display: 'block', marginBottom: '5px' }}>Surname:</label>
                    <input type="text" id="surName" name="surName" value={formData.surName} onChange={handleChange} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box', border: '1px solid #ddd', borderRadius: '4px' }} />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box', border: '1px solid #ddd', borderRadius: '4px' }} />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="username" style={{ display: 'block', marginBottom: '5px' }}>Username:</label>
                    <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box', border: '1px solid #ddd', borderRadius: '4px' }} />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>Password:</label>
                    <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box', border: '1px solid #ddd', borderRadius: '4px' }} />
                </div>

                {/* Optional Fields from your DTO */}
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="age" style={{ display: 'block', marginBottom: '5px' }}>Age:</label>
                    <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} style={{ width: '100%', padding: '8px', boxSizing: 'border-box', border: '1px solid #ddd', borderRadius: '4px' }} />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="address" style={{ display: 'block', marginBottom: '5px' }}>Address:</label>
                    <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} style={{ width: '100%', padding: '8px', boxSizing: 'border-box', border: '1px solid #ddd', borderRadius: '4px' }} />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="city" style={{ display: 'block', marginBottom: '5px' }}>City:</label>
                    <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} style={{ width: '100%', padding: '8px', boxSizing: 'border-box', border: '1px solid #ddd', borderRadius: '4px' }} />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="postalCode" style={{ display: 'block', marginBottom: '5px' }}>Postal Code:</label>
                    <input type="text" id="postalCode" name="postalCode" value={formData.postalCode} onChange={handleChange} style={{ width: '100%', padding: '8px', boxSizing: 'border-box', border: '1px solid #ddd', borderRadius: '4px' }} />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="region" style={{ display: 'block', marginBottom: '5px' }}>Region:</label>
                    <input type="text" id="region" name="region" value={formData.region} onChange={handleChange} style={{ width: '100%', padding: '8px', boxSizing: 'border-box', border: '1px solid #ddd', borderRadius: '4px' }} />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="country" style={{ display: 'block', marginBottom: '5px' }}>Country:</label>
                    <input type="text" id="country" name="country" value={formData.country} onChange={handleChange} style={{ width: '100%', padding: '8px', boxSizing: 'border-box', border: '1px solid #ddd', borderRadius: '4px' }} />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="phone" style={{ display: 'block', marginBottom: '5px' }}>Phone:</label>
                    <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} style={{ width: '100%', padding: '8px', boxSizing: 'border-box', border: '1px solid #ddd', borderRadius: '4px' }} />
                </div>

                <button
                    type="submit"
                    style={{ width: '100%', padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                    Register
                </button>
            </form>
            {message && (
                <p style={{ marginTop: '15px', color: isError ? 'red' : 'green', textAlign: 'center' }}>
                    {message}
                </p>
            )}
            <p style={{ marginTop: '20px', textAlign: 'center' }}>
                Already have an account?{' '}
                {/* Use Link component for proper React Router navigation */}
                <Link to="/login" style={{ color: '#007bff', textDecoration: 'none' }}>Login here</Link>
            </p>
        </div>
    );
};

export default RegisterPage;
