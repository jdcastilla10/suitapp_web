import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import mockVoters from '../data/mockVoters.json';
import SearchBar from '../components/Searchbar';
import { CardList } from '../components/CardList';

export const ConsultaReportes = () => {
    const [user, setUser] = useState('');
    const [voters, setVoters] = useState([]);
    const [filteredVoters, setFilteredVoters] = useState([]);
    const [searchTerm] = useState('');
    const [filter, setFilter] = useState([]);
    console.log('filter ',filter);
    const [idCandidato, setIdCandidato] = useState('');

    useEffect(() => {
        const resp = localStorage.getItem('user');
        const candidato = localStorage.getItem('idCandidato');
        setIdCandidato(candidato);
        
        if (resp) {
            const parsedUser = JSON.parse(resp);
            setUser(parsedUser);
        }
        setVoters(mockVoters);
    }, []);

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            const lowercasedSearchTerm = searchTerm.toLowerCase();
            if (lowercasedSearchTerm.trim() === '') {
                setFilteredVoters([]);
            } else {
                const filtered = voters.filter(voter =>
                    voter.lider.toLowerCase().includes(lowercasedSearchTerm)
                );
                setFilteredVoters(filtered);
            }
        }
    };

    return (
        <>
            <Navbar onLogout={null} user={user} />
            <div className="container mx-auto mt-8">
                <div className="flex justify-center mb-4">
                    {
                    <SearchBar candidato={idCandidato} filter={setFilter} consulta='lider'/>}
                    {filter?.length > 0 && (
                        <div className="results-container">
                            {filter.map((item) => (
                            <CardList
                                key={item.codlid}
                                lastName={item.apelid}
                                name={item.nomlid}
                            />
                            ))}
                        </div>
                    )}
                </div>
                <table className="min-w-full overflow-hidden bg-white rounded-lg shadow-md">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="px-4 py-2">Cédula</th>
                            <th className="px-4 py-2">Nombre</th>
                            <th className="px-4 py-2">Apellido</th>
                            <th className="px-4 py-2">Líder</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredVoters.length > 0 ? (
                            filteredVoters.map((voter) => (
                                <tr key={voter.id}>
                                    <td className="border px-4 py-2">{voter.cedula}</td>
                                    <td className="border px-4 py-2">{voter.nombre}</td>
                                    <td className="border px-4 py-2">{voter.apellido}</td>
                                    <td className="border px-4 py-2">{voter.lider}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center py-4">No se encontraron votantes para el líder especificado.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    )
}
