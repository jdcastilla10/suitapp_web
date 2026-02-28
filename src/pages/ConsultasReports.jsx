import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import http from '../services/http';
import { Endpoint } from '../constants/API';

export const ConsultaReportes = () => {
    const [user, setUser] = useState('');
    const [voters, setVoters] = useState([]);
    const [filteredVoters, setFilteredVoters] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const resp = localStorage.getItem('user');
        if (resp) {
            const parsedUser = JSON.parse(resp);
            setUser(parsedUser);
        }
    }, []);

    useEffect(() => {
        if (user) {
            const fetchVoters = async () => {
                setLoading(true);
                try {
                    const response = await http('get', Endpoint.getVoterByCandidate(user.usuario));
                    if (response?.success && Array.isArray(response.data)) {
                        setVoters(response.data);
                        setFilteredVoters(response.data);
                    } else {
                        setVoters([]);
                        setFilteredVoters([]);
                    }
                } catch (error) {
                    console.error('Error fetching voters:', error);
                    setVoters([]);
                    setFilteredVoters([]);
                }
                setLoading(false);
            };
            fetchVoters();
        }
    }, [user]);

    useEffect(() => {
        const lowercasedSearchTerm = searchTerm.toLowerCase();
        const filtered = voters.filter(voter =>
            voter.nomvot.toLowerCase().includes(lowercasedSearchTerm) ||
            voter.apevot.toLowerCase().includes(lowercasedSearchTerm) ||
            voter.cedvot.toString().includes(lowercasedSearchTerm)
        );
        setFilteredVoters(filtered);
    }, [searchTerm, voters]);

    return (
        <>
            <Navbar onLogout={null} user={user} />
            <div className="container mx-auto mt-8">
                <div className="flex justify-center mb-4">
                    <input
                        type="text"
                        className="p-2 border border-gray-300 rounded-md w-1/2"
                        placeholder="Buscar por nombre, apellido o cédula..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                {loading ? (
                    <p className="text-center">Cargando...</p>
                ) : (
                    <table className="min-w-full overflow-hidden bg-white rounded-lg shadow-md">
                        <thead className="bg-gray-800 text-white">
                            <tr>
                                <th className="px-4 py-2">Cédula</th>
                                <th className="px-4 py-2">Nombres</th>
                                <th className="px-4 py-2">Votó</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredVoters.length > 0 ? (
                                filteredVoters.map((voter) => (
                                    <tr key={voter.cedvot}>
                                        <td className="border px-4 py-2">{voter.cedvot}</td>
                                        <td className="border px-4 py-2">{voter.nomvot} {voter.apevot}</td>
                                        <td className="border px-4 py-2">{voter.ok ? 'Sí' : 'No'}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center py-4">No se encontraron votantes.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    )
}
