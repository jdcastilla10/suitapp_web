
const BASEURL = 'https://consultortecnology.com/api';
//const BASEURL = 'https://4df1-181-236-203-0.ngrok-free.app/api';

export const Endpoint = {
    login:`${BASEURL}/auth/login`,
    logout:`${BASEURL}/auth/logout`,
    getLideres:`${BASEURL}/lideres/listar`,
    getLiderName: (leader, candidato) =>`${BASEURL}/lideres?name=${(leader)}&candidato=${(candidato)}`,
    getVoterName:(dni,codlid,candidato)=>`${BASEURL}/votantes?dni=${dni}&codlid=${codlid}&candidato=${candidato}`,
    updateVoterState:(dni,codusu,candidato)=>`${BASEURL}/votantes?dni=${dni}&candidato=${candidato}&codusu=${codusu}`,
    getVoterByCandidate:(candidato)=>`${BASEURL}/votantes/all?candidato=${candidato}`,
    getVoterByleader:(candidato,codlid)=>`${BASEURL}/votantes/reporte?candidato=${candidato}&codlid=${codlid}`,
};

    