import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import mockVoters from '../data/mockVoters.json';
import SearchBar from '../components/Searchbar';
import { CardList } from '../components/CardList';
import http from '../services/http';
import { Endpoint } from '../constants/API';

export const ConsultaReportes = () => {
    const [user, setUser] = useState('');
    const [voters, setVoters] = useState([]);
    const [filteredVoters, setFilteredVoters] = useState([]);
    const [searchTerm] = useState('');
    const [filter, setFilter] = useState([]);
    const [listVoter, setListVoter] = useState();
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

    const getVoterByLeader=async(codlid)=>{
        console.log({codlid})
        console.log({idCandidato})
        
        try {
        const resp = await http('get', Endpoint.getVoterByleader(idCandidato,codlid))
        console.log({resp})
        if (resp?.success && Array.isArray(resp.data)) {
          setListVoter(resp.data)
          setFilter([])
        } else {
          setListVoter([])
        }
      } catch (error) {
        console.log('Error buscando líderes', error)
        filter([])
      }finally {
      
  }
    }

    return (
        <>
            <Navbar onLogout={null} user={user} />
            <div className="container mx-auto mt-8">
                <div className="flex justify-center mb-4">
                    <div className="w-full min-h-screen p-4">
                    <div className="w-full p-3 space-y-3">
                        <div className="w-full max-w-md mx-auto">
                        <div className="text-left mb-2 mt-3 text-sm">
              <span className="text-neutral-800 font-bold">Consultar Lider</span>
            </div>
                            <SearchBar 
                                candidato={idCandidato} 
                                filter={setFilter} 
                                consulta='lider'
                            />
                        
                    
                        {filter?.length > 0 && (
                            <div className="results-container">
                                {filter.map((item) => (
                                <CardList
                                    key={item.codlid}
                                    lastName={item.apelid}
                                    name={item.nomlid}
                                    onClick={()=>getVoterByLeader(item.codlid)}
                                />
                                ))}
                            </div>
                        )}
                        </div>
                        {
                            listVoter && (!filter || filter.length === 0) &&(
                    <table className="min-w-full overflow-hidden bg-white rounded-lg shadow-md">
                        <thead className="bg-gray-800 text-white">
                            <tr>
                                <th className="px-4 py-2">Cédula</th>
                                <th className="px-4 py-2">Nombre</th>
                                <th className="px-4 py-2">Apellido</th>
                                <th className="px-4 py-2">Votó</th>
                                {/* <th className="px-4 py-2">Usuario</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {listVoter.length > 0 ? (
                                listVoter.map((voter) => (
                                    <tr key={voter.cedvot}>
                                        <td
                                            className={`border px-4 py-2 text-center font-semibold ${
                                                voter.ok === 'V'
                                                ? 'bg-blue-500 text-white'
                                                : 'bg-gray-100'
                                            }`}
                                            >{voter.cedvot}</td>
                                        <td
                                            className={`border px-4 py-2 text-center font-semibold ${
                                                voter.ok === 'V'
                                                ? 'bg-blue-500 text-white'
                                                : 'bg-gray-100'
                                            }`}
                                            >{voter.nomvot}</td>
                                        <td
                                            className={`border px-4 py-2 text-center font-semibold ${
                                                voter.ok === 'V'
                                                ? 'bg-blue-500 text-white'
                                                : 'bg-gray-100'
                                            }`}
                                            >{voter.apevot}</td>
                                        <td
                                            className={`border px-4 py-2 text-center font-semibold ${
                                                voter.ok === 'V'
                                                ? 'bg-blue-500 text-white'
                                                : 'bg-gray-100'
                                            }`}
                                            >{voter.ok}</td>
                                        {/* <td className="border px-4 py-2">{voter.codusu}</td> */}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center py-4">No se encontraron votantes para el líder especificado.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>)}
                  
                    </div>
                    </div>
                    
                </div>
                
            </div>
        </>
    )
}
