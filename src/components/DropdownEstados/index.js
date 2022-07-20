import React from "react";
import { Select, MenuItem } from '@mui/material';

export default function DropdownEstados ({estado, onChange = () => {} }){

    const [estados, setEstados] = React.useState([]);

    React.useEffect(() => {

        const token = localStorage.getItem('user_token');

        const requestInfo = {
          method: 'GET',
          headers: new Headers({
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          }),
        };
  
        fetch("http://127.0.0.1:8000/api/municipios", requestInfo)
          .then(resposta => resposta.json())
          .then((json) => setEstados(json))
          .catch((error) => console.log(error));
    }, []);

    return (
          <Select variant="secondary" title="UF" value={estado} onChange={onChange}> 
            {estados.map((estado) => ( 
                <MenuItem key={estado.cuf} value={estado.cuf}>{estado.uf}</MenuItem>
            ))}
          </Select>
    )
}