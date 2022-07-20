import React from "react";
import { Link } from "react-router-dom";
import Topnav from "../../components/NavBar/Topnav";
import "../../pages/Clientes/styles.css";
import { Table, Button, Form, Container, Row, Col} from "react-bootstrap";

export default function Clientes(){

    const [isLoading, setIsLoading] = React.useState(true);
    const [clientes, setClientes] = React.useState([]);
    const [busca, setBusca] = React.useState('');   
    const lowerBusca = busca.toLowerCase();

    const clientesFiltrados = clientes.filter((cliente) => cliente.nome.toLowerCase().includes(lowerBusca))

    React.useEffect(() => {
        const token = localStorage.getItem('user_token');
  
        const requestInfo = {
          method: 'GET',
          headers: new Headers({
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          }),
        };
  
        fetch("http://127.0.0.1:8000/api/clientes", requestInfo)
          .then(resposta => resposta.json())
          .then((json) => setClientes(json))
          .catch((error) => console.log(error));
    }, []);

    React.useEffect(() => {
        if (clientes.length !== 0) {
            setIsLoading(false);
        }
        console.log(clientes);
    }, [clientes]);
  
    return (
        <div>
            <Topnav/>
            <Container style={{width: '1500px'}}>
            <Form> 
            <Form.Group style={{ marginTop: '3vh' }}>  
            <Row>
              <Col>
                <h2>Clientes</h2>
                <Link to={`/cadastrocliente`}>
                    <Button variant="secondary">Cadastrar</Button>
                </Link>
              </Col>
            </Row> 

            <div className="custom-space">
                <Form.Control type="text" placeholder="Pesquisar clientes..." 
                value={busca}
                onChange={(ev) => setBusca(ev.target.value)}/>
            </div>
            <Table striped bordered hover>
            <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Telefone</th>
                        <th>Celular</th>
                        <th>CPF/CNPJ</th>
                        <th>RG/IE</th>
                        <th>Nasc/Fund.</th>
                        <th>Endereço</th>
                        <th>Número</th>
                        <th>Opções</th>
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
                clientesFiltrados.map((cliente) => (                
                    <tr key={cliente.id}>
                      <td>{cliente.nome}</td>
                      <td>{cliente.telefone}</td>
                      <td>{cliente.celular}</td>
                      <td>{cliente.cpf}</td>
                      <td>{cliente.rg}</td>
                      <td>{cliente.nascimento}</td>
                      <td>{cliente.endereco}</td>
                      <td>{cliente.numero}</td>
                      <td>
                        <Link to={`/cliente/${cliente.id}`}>
                        <Button variant="secondary">Atualizar</Button>
                        </Link>
                        {/*<Button variant="danger">Excluir</Button>*/}
                      </td>
                    </tr>
              ))
            )}
            </tbody>
            </Table>
            </Form.Group>
            </Form>
            </Container>
        </div>
    );
}