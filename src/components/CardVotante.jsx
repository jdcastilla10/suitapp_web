import { useState } from 'react';
import check from '../assets/img/checkCircle.png'
import circleSelect from '../assets/img/circleSelect.png'
import { Endpoint } from '../constants/API';
import http from '../services/http';
import { CircleLoader } from 'react-spinners';

export const CardVotante = ({ cedvot,name, lastName,usuario,candidato,ok,filter }) => {

  const [loading, setLoading] = useState(false);

  const actializarEstadoVotante=async()=>{ 
    console.log(cedvot,candidato,usuario)

      try {
          setLoading(true);
          const resp = await http('post', Endpoint.updateVoterState(cedvot,usuario,candidato))
           if (resp?.success) {
          filter([])
          alert('Estado votante actualizado')
          setLoading(false)
        }
          
        } catch (error) {
          console.log('Error buscando líderes', error)
         alert('error al actualizar estado votante')
        }finally {
        setLoading(false);
    }
    }
  

  return (

    <div
      className="h-[50px] w-full flex items-center p-2 rounded-xl mt-2 shadow  bg-gray-200 transition"
    >
      <div className="flex justify-between items-center w-full">
  
  {/* Texto en columna */}
  <div className="flex flex-col">
    <span className="font-bold text-sm text-gray-800">
      {name} {lastName?lastName:''}
    </span>
    <span className="text-xs text-gray-500">
      {cedvot}
    </span>
  </div>

  {/* Imagen al extremo */}
  {
    ok==='F'?
      <button
        className={`
          flex items-center justify-center gap-2`}
        onClick={()=>actializarEstadoVotante()}
      >
        {
          loading?
          <CircleLoader color="white" size={20} />
          :
          <img
            src={check}
            alt="update"
            className="w-7 h-7"
        />
        }
        
      </button>
    :
        <img
            src={circleSelect}
            alt="update"
            className="w-5 h-2 mr-1"
        />
    }

</div>
</div>
    
  );
};