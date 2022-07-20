import React from "react";
import { Link } from "react-router-dom";
import Topnav from "../../components/NavBar/Topnav";
import "../../pages/Contratos/styles.css";
import { Table, Button, Form, Container, Row, Col} from "react-bootstrap";

export default function Contratos(){

    const [isLoading, setIsLoading] = React.useState(true);
    const [contratos, setContratos] = React.useState([]);
    const [busca, setBusca] = React.useState('');   
    const lowerBusca = busca.toLowerCase();

    const contratosFiltrados = contratos.filter((contrato) => contrato.dtVencimento.toLowerCase().includes(lowerBusca))

    React.useEffect(() => {
        const token = localStorage.getItem('user_token');
  
        const requestInfo = {
          method: 'GET',
          headers: new Headers({
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          }),
        };
  
        fetch("http://127.0.0.1:8000/api/contratos", requestInfo)
          .then(resposta => resposta.json())
          .then((json) => setContratos(json))
          .catch((error) => console.log(error));
    }, []);

    React.useEffect(() => {
        if (contratos.length !== 0) {
            setIsLoading(false);
        }
        console.log(contratos);
    }, [contratos]);
  
    return (
        <div>
            <Topnav/>
            <Container style={{width: '1500px'}}>
            <Form> 
            <Form.Group style={{ marginTop: '3vh' }}>  
            <Row>
              <Col>
                <h2>Contratos</h2>
                <Link to={`/contrato`}>
                    <Button variant="secondary">Cadastrar</Button>
                </Link>
              </Col>
            </Row> 

            <div className="custom-space">
                <Form.Control type="text" placeholder="Pesquisar contratos pela data de vencimento..." 
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
                contratosFiltrados.map((contrato) => (                
                    <tr key={contrato.id}>
                      <td>{contrato.nome}</td>
                      <td>{contrato.telefone}</td>
                      <td>{contrato.celular}</td>
                      <td>{contrato.cpf}</td>
                      <td>{contrato.rg}</td>
                      <td>{contrato.nascimento}</td>
                      <td>{contrato.endereco}</td>
                      <td>{contrato.numero}</td>
                      <td>
                        <Link to={`/contrato/${contrato.id}`}>
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