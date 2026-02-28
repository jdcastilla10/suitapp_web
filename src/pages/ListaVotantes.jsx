import { useEffect, useState } from 'react';

import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/Searchbar';
import { useLocation } from "react-router-dom";
import { CardVotante } from '../components/CardVotante';


export const ListaVotantes = () => {
  const location = useLocation();
const item = location.state;
console.log({item})
  const [error, setError] = useState(false);
  const navigate= useNavigate()
  const [user, setUser] = useState('');
  const [idCandidato, setIdCandidato] = useState('');
  const [filter, setFilter] = useState([]);


  useEffect(() => {
    const resp = localStorage.getItem('user');
    const candidato = localStorage.getItem('idCandidato');
    setIdCandidato(candidato)
    if (resp) {
      setUser(JSON.parse(resp));
    }
  }, []);

  return (
      <>
        <Navbar error={setError} user={user} />
        <div className="flex flex-col items-center  min-h-screen p-4 ">
          <div className=" grid grid-cols-1 p-3  w-full sm:w-96  mb-2 mr-2 space-y-3 ">
            <div className="text-left mb-2 mt-3 text-sm">
              <span className="text-neutral-800 font-bold">Votantes de {item.nomlid}</span>
            </div>
            <div className="text-left mb-2 mt-3 text-sm">
              <SearchBar candidato={idCandidato} filter={setFilter} consulta='votante' codLider={item?item.codlid:''} />
            </div>
           
           {filter?.length > 0 && (
            <div className="results-container">
              {filter.map((a) => (
                <CardVotante
                  key={a.cedvot}
                  lastName={a.apevot}
                  name={a.nomvot}
                  cedvot={a.cedvot}
                  usuario={user.usuario}
                  candidato={idCandidato}
                  ok={a.ok}
                  filter={setFilter}
                />
              ))}
            </div>
          )}
          </div>
          {error === true && (
                    <div className="bg-red-600 border border-red-700  px-4 py-3 rounded-lg mt-2 relative text-center text-sm" role="alert">
                      <strong className="font-semibold text-white">Ha ocurrido un error, no se pudo cerrar sesión</strong>
                    </div>
                  )}
        </div>
      </>
  )
}
