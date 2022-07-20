import React from "react";
import { Link } from "react-router-dom";
import Topnav from "../../components/NavBar/Topnav";
import "../../pages/contas/styles.css";
import { Table, Button, Form, Container} from "react-bootstrap";

export default function Contas(){

    const [isLoading, setIsLoading] = React.useState(true);
    const [contas, setContas] = React.useState([]);
    const [busca, setBusca] = React.useState('');   
    const lowerBusca = busca.toLowerCase();

    const contasFiltradas = contas.filter((conta) => conta.cliente.toLowerCase().includes(lowerBusca))

    React.useEffect(() => {
        const token = localStorage.getItem('user_token');
  
        const requestInfo = {
          method: 'GET',
          headers: new Headers({
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          }),
        };
  
        fetch("http://127.0.0.1:8000/api/contasreceber", requestInfo)
          .then(resposta => resposta.json())
          .then((json) => setContas(json))
          .catch((error) => console.log(error));
    }, []);

    React.useEffect(() => {
        if (contas.length !== 0) {
            setIsLoading(false);
        }
        console.log(contas);
    }, [contas]);
  
    return (
        <div>
            <Topnav/>
            <Container style={{width: '1500px'}}>
            <h2 className="custom-title">Contas a Receber
            <Link to={`/cadastroconta`}>
                <Button variant="secondary">Cadastrar</Button>
            </Link>
            </h2>
            <div className="custom-space">
                <Form.Control type="text" placeholder="Pesquisar contas..." 
                value={busca}
                onChange={(ev) => setBusca(ev.target.value)}/>
            </div>
            <Table striped bordered hover>
            <thead>
                    <tr>
                        <th>Código</th>
                        <th>Histórico</th>
                        <th>Conta</th>
                        <th>Documento</th>
                        <th>Cliente</th>
                        <th>Contrato</th>
                        <th>Emissão</th>
                        <th>Vencimento</th>
                        <th>Valor</th>
                        <th>Atualizado</th>
                        <th>Recebido</th>
                        <th>Valor quitado</th>
                        <th>Dias vencido</th>
                        <th>NSU</th>
                    </tr>
            </thead>
            <tbody>
            {isLoading ? (
                    <tr>
                        <td>
                             Carregando...
                        </td>
                    </tr>
            ) : (
                contasFiltradas.map((conta) => (                
                    <tr key={conta.id}>
                      <td>{conta.historico}</td>
                      <td>{conta.conta}</td>
                      <td>{conta.documento}</td>
                      <td>{conta.cliente}</td>
                      <td>{conta.idContrato}</td>
                      <td>{conta.emissao}</td>
                      <td>{conta.vencimento}</td>
                      <td>{conta.valor}</td>
                      <td>{conta.valorrecebido}</td>
                      <td>{conta.datarecebido}</td>
                      <td>{conta.valorrecebido}</td>
                      <td>{conta.documento}</td>
                      <td>{conta.nsu}</td>
                      <td>
                        <Link to={`/contareceber/${conta.id}`}>
                        <Button variant="secondary">Atualizar</Button>
                        </Link>
                        <Button variant="danger">Excluir</Button>
                      </td>
                    </tr>
              ))
            )}
            </tbody>
            </Table>
            </Container>
        </div>
    );
}