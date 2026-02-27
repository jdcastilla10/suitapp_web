import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import http from '../services/http';
import { Endpoint } from '../constants/API';




export const ReporteVotantes = () => {


    const [user, setUser] = useState('');
    const [disabled, setDisabled] = useState(false);
    useEffect(() => {
        const resp = localStorage.getItem('user');
        if (resp) {
          setUser(JSON.parse(resp));
        }
      }, []);

    
  const descargarArchivo = async (candidato) => {
    //setDisabled(true)
    console.log('hola')
    try {
      const response = await http('get',Endpoint.getVoterByCandidate(candidato));
      console.log({response})
    //   const result = await response.json();

      if (!response.success) {
        alert("Error trayendo datos");
        return;
      }

      const data = response.data;

      if (data.length === 0) {
        alert("No hay datos para exportar");
        return;
      }

      // 👇 Encabezados personalizados (más profesional)
      const headers = ["cedvot", "nomvot", "apevot", "ok", "codusu"];

      const rows = data.map(item => [
        item.cedvot,
        item.nomvot,
        item.apevot,
        item.ok,
        item.codusu
      ].join(";")); // usamos ; para Excel en Colombia

      const csvContent =
        headers.join(",") + "\n" +
        rows.join("\n");

      // 👇 BOM para que Excel respete tildes
      const blob = new Blob(["\uFEFF" + csvContent], {
        type: "text/csv;charset=utf-8;"
      });

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      if(candidato==='1'){
        link.setAttribute("download", "votantes_jose_exportados.csv");
      }
      if(candidato==='2'){
        link.setAttribute("download", "votantes_primario_exportados.csv");
      }
      if(candidato==='3'){
        link.setAttribute("download", "votantes_elver_exportados.csv");
      }
      if(candidato==='4'){
        link.setAttribute("download", "votantes_baq_exportados.csv");
      }
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setDisabled(false)

    } catch (error) {
        alert("No hay datos para exportar");
        console.error("Error descargando CSV:", error);
    }
  }
  

    
  return (
      <>
        <Navbar onLogout={null} user={user} />
        <div className="flex flex-col items-center  min-h-screen p-4 ">
          <div className=" grid grid-cols-1 p-3  w-full sm:w-96  mb-2 mr-2 space-y-3 ">
            <div className="text-left mb-2 mt-3 text-sm">
              <span className="text-neutral-800 font-bold">Reportes</span>
            </div>
            <button
              type="button"
              className={`shadow-md p-3 rounded-xl w-full py-2 px-4 text-black hover:text-white border-gray-100 border-y-2 border-x-2 items-center flex flex-row hover:bg-blue-950 font-bold `}
            onClick={()=>descargarArchivo('1')}
            disabled={disabled}
          
            >
              <div className="text-left ml-3 text-m flex flex-col">
                <span className="font-bold">JOSE</span>
                <span className="font-normal text-xs">Descargar reporte</span>
              </div>
              
              
            </button>
            <button
              type="button"
              className={`shadow-md p-3 rounded-xl w-full py-2 px-4 text-black hover:text-white border-gray-100 border-y-2 border-x-2 items-center flex flex-row hover:bg-blue-950 font-bold `}
             onClick={()=>descargarArchivo('2')}
            >
            
              <div className="text-left ml-3 text-m flex flex-col">
                <span className=" font-bold">PRIMARIO</span>
                <span className=" font-normal text-xs">Descargar reporte.</span>
              </div>
              
              
            </button>
            <button
              type="button"
              className={`shadow-md p-3 rounded-xl w-full py-2 px-4 text-black hover:text-white border-gray-100 border-y-2 border-x-2 items-center flex flex-row hover:bg-blue-950 font-bold `}
              onClick={()=>descargarArchivo('3')}
            >
            
              <div className="text-left ml-3 text-m flex flex-col">
                <span className="font-bold">ELVER</span>
                <span className="font-normal text-xs">Descargar reporte.</span>
              </div>
              
              
            </button>
            <button
              type="button"
              className={`shadow-md p-3 rounded-xl w-full py-2 px-4 text-black hover:text-white border-gray-100 border-y-2 border-x-2 items-center flex flex-row hover:bg-blue-950 font-bold `}
              onClick={()=>descargarArchivo('4')}
            >
            
              <div className="text-left ml-3 text-m flex flex-col">
                <span className="font-bold">BARRANQUILLA</span>
                <span className="font-normal text-xs">Descargar reporte.</span>
              </div>
              
              
            </button>
          </div>
        </div>
      </>
  )
}
