import React from "react";
import { Select, MenuItem } from '@mui/material';

export default function DropdownCidades ({estado, cidade, onChange = () => {}}){

    const [cidades, setCidades] = React.useState([]);

    React.useEffect(() => {

        const token = localStorage.getItem('user_token');

        if (estado === '' || estado === undefined || estado === null){ 
          estado = 11;
        }

        const requestInfo = {
          method: 'GET',
          headers: new Headers({
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          }),
        };
  
        fetch("http://127.0.0.1:8000/api/municipios/"+estado, requestInfo)
          .then(resposta => resposta.json())
          .then((json) => setCidades(json))
          .catch((error) => console.log(error));
    }, [estado]);

    return (
          <Select variant="secondary" title="Município" value={cidade === '' ? 1100015 : cidade} onChange={onChange}>
            {cidades.map((cidade) => ( 
                <MenuItem key={cidade.cmun} value={cidade.cmun}>{cidade.xmun}</MenuItem>
            ))}
          </Select>
    )
}