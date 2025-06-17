import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


interface UserInfo {
    message: string;
    username: string;
    fullName: string;
    email: string;
    isAdmin: boolean;

}

const DashboardPage: React.FC = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<UserInfo | null>(null);


    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error("Greška pri parsiranju korisničkih podataka iz localStorage:", e);
                localStorage.removeItem('user');
                navigate('/login');
            }
        } else {
            navigate('/login');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    if (!user) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-100 text-gray-700">
                Učitavanje korisničkih podataka...
            </div>
        );
    }
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 font-inter">
            <div className="bg-white p-8 rounded-lg shadow-xl text-center max-w-md w-full">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Dobrodošli, {user.fullName}!</h2>
                <p className="text-lg text-gray-600 mb-2">
                    Korisničko ime: <span className="font-semibold text-blue-600">{user.username}</span>
                </p>
                <p className="text-lg text-gray-600 mb-2">
                    Email: <span className="font-semibold text-blue-600">{user.email}</span>
                </p>
                <p className="text-lg text-gray-600 mb-6">
                    Uloga: <span className="font-semibold text-purple-600">{user.isAdmin ? 'Administrator' : 'Korisnik'}</span>
                </p>
                <button
                    onClick={handleLogout}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
                >
                    Odjavi se
                </button>
            </div>
        </div>
    );
};

export default DashboardPage;
