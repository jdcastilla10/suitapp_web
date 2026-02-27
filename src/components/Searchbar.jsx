import React, { useState } from 'react';
import { Endpoint } from '../constants/API';
import { useForm } from '../hooks/useFrom';
import http from '../services/http';

const SearchBar = ({candidato, filter, consulta,codLider}) => {
  const [loading, setLoading] = useState(false);
  const {
      leader,
      onInputChange,
    } = useForm(
      {
        leader: "",
      },
    );

  const fetchLeader=async()=>{ 
    try {
        setLoading(true);
        const leaderText = String(leader);
        const candidatoText = String(candidato);
        console.log(Endpoint.getLiderName(leader,candidato))
        const resp = await http('get', Endpoint.getLiderName(leaderText,candidatoText))
        console.log({resp})
        if (resp?.success && Array.isArray(resp.data)) {
          filter(resp.data)
        } else {
          filter([])
        }
      } catch (error) {
        console.log('Error buscando líderes', error)
        filter([])
      }finally {
      setLoading(false);
  }
  }
  const fetchVotante=async()=>{ 
    console.log({codLider})
    console.log({candidato})
    console.log({leader})

    try {
        setLoading(true);
        const leaderText = String(leader);
        const candidatoText = String(candidato);
        const codLiderText = String(codLider);
        console.log(Endpoint.getLiderName(leader,candidato))
        const resp = await http('get', Endpoint.getVoterName(leaderText,codLiderText,candidatoText))
        console.log({resp})
        if (resp?.success && Array.isArray(resp.data)) {
          filter(resp.data)
        } else {
          filter([])
        }
      } catch (error) {
        console.log('Error buscando líderes', error)
        filter([])
      }finally {
      setLoading(false);
       onInputChange({
    target: {
      name: "leader",
      value: ""
    }
  });
  }
  }

  return (
    <div className="flex items-center   space-x-1  mx-auto">
      <input
        type="text"
        placeholder="Buscar..."
        name="leader"
        value={leader}
        onChange={onInputChange}
        className="flex-grow py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
      />
      <button
        className={`bg-blue-900 hover:bg-blue-950 text-white py-2 px-4 rounded-md 
          flex items-center justify-center gap-2
          ${(loading || !leader.trim()) ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={consulta==='lider'?fetchLeader:fetchVotante}
        disabled={loading || !leader.trim()}
      >
        {loading && (
          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
        )}

        {loading ? "" : "Buscar"}
      </button>
    </div>
  );
};

export default SearchBar;

