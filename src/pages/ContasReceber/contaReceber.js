import React from "react";
import { useParams } from "react-router-dom";
import Topnav from "../../components/NavBar/Topnav";
import "../../pages/ContasReceber/styles.css";
import { Container, Button, Form, Col, Row} from "react-bootstrap";

export default function contaReceber(){

  const {id} = useParams();

  const [isLoading, setIsLoading] = React.useState(true);
  const [cliente, setCliente] = React.useState({
    id: "",
    nome: "",
    cpf: "",
    rg: "",
    nascimento: "",
    endereco: "",
    cidade: "",
    estado: "",
    telefone: "",
    email: "",
    celular: "",
    bairro: "",
    informacoes: "",
    cep: "",
    cadastro: "",
    alteracao: "",
    orgaoexp: "",
    naturalidade: "",
    estcivil: "",
    numero: "",
    conjuge: "",
    pai: "",
    mae: "",
    telconju: "",
    telpai: "",
    telmae: "",
    empresa: "",
    cargo: "",
    telemp: "",
    salario: "",
    complemento: "",
    cobrador: "",
    classe: "",
    rgesposa: "",
    nascesposa: "",
    sexo: "",
    ativo: "",
    fantasia: "",
    im: "",
    codformapag: "",
    cpfesposa: "",
    contato: "",
    email2: "",
    desconto: ""
  });

  React.useEffect(() => {

    if (id !== undefined) {
      const token = localStorage.getItem('user_token');
  
      const requestInfo = {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }),
      };
  
      fetch("http://127.0.0.1:8000/api/cliente/"+id, requestInfo)
        .then(resposta => resposta.json())
        .then((json) => setCliente(json))
        .catch((error) => console.log(error));
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cadastrarCliente = () => {
    const token = localStorage.getItem('user_token');

    const requestInfo = {
      method: 'POST',
      headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      }),
      body: JSON.stringify(cliente)
    };

    if (id !== undefined) {
      fetch("http://127.0.0.1:8000/api/cliente/"+id, requestInfo)
        .then(resposta => {
          if(resposta.ok){
            console.log(cliente)
            console.log(JSON.stringify(cliente))
            console.log('feito update')
          }else{
            alert('Não foi possível inserir Cliente')
          }
        })        
    }else{
      fetch("http://127.0.0.1:8000/api/cliente", requestInfo)
      .then(resposta => {
        if(resposta.ok){
          console.log('feito cadastro')
        }else{
          alert('Não foi possível inserir Cliente')
        }
      })         
    }
  };

  React.useEffect(() => {
    if (id !== undefined) {
       setTimeout(() => {
         setIsLoading(false);
       }, 200);
      }else{
        setIsLoading(false);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const atualizaCidades = (e) => {
    e.preventDefault();
    const {value, name} = e.target;
    setCliente({ ...cliente, [name]: value})
    console.log('atualiza cidades com'+value+'  '+name)
  }

  return (
    <div>
      <Topnav/>
      <Container style={{width: '750px'}}>          
          {isLoading ? (
            <h2 className="custom-title">Carregando...</h2>
          ) : (
          <Form> 
            <h2 className="custom-title">Cliente</h2>
          <Form.Group>  
            <Row>
              <Col>
                <Form.Label>Nome/Razão</Form.Label>
                <Form.Control placeholder="Nome/Razão" value={cliente.nome == null ? '' : cliente.nome} onChange={nome => setCliente({ ...cliente, nome: nome.target.value})}></Form.Control>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Label className="custom-row">CPF/CNPJ</Form.Label>
                <Form.Control placeholder="CPF/CNPJ" value={cliente.cpf == null ? '' : cliente.cpf} onChange={cpf => setCliente({ ...cliente, cpf: cpf.target.value})}></Form.Control>
                <Form.Text className="text-muted">
                Com pontos e formatação.
                </Form.Text>
              </Col>
              <Col>
                <Form.Label className="custom-row">RG/IE</Form.Label>
                <Form.Control placeholder="RG/IE" value={cliente.rg == null ? '' : cliente.rg} onChange={e => setCliente({ ...cliente, rg: e.target.value})}></Form.Control>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Label className="custom-row">Data Nascimento</Form.Label>
                <Form.Control type="date" value={cliente.nascimento == null ? '' : cliente.nascimento} onChange={e => setCliente({ ...cliente, nascimento: e.target.value})}/>
              </Col>
              <Col></Col>
            </Row>

            <Row> 
              <Col>
                <Form.Label className="custom-row">Endereço</Form.Label>
                <Form.Control placeholder="Endereço" value={cliente.endereco == null ? '' : cliente.endereco} onChange={e => setCliente({ ...cliente, endereco: e.target.value})}></Form.Control>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Label className="custom-row">Número</Form.Label>
                <Form.Control placeholder="Número" value={cliente.numero == null ? '' : cliente.numero} onChange={e => setCliente({ ...cliente, numero: e.target.value})}></Form.Control>
              </Col>
              <Col>
                <Form.Label className="custom-row">Bairro</Form.Label>
                <Form.Control placeholder="Bairro" value={cliente.bairro == null ? '' : cliente.bairro} onChange={e => setCliente({ ...cliente, bairro: e.target.value})}></Form.Control>
              </Col>
              <Col>
                <Form.Label className="custom-row">CEP</Form.Label>
                <Form.Control placeholder="CEP" value={cliente.cep == null ? '' : cliente.cep} onChange={e => setCliente({ ...cliente, cep: e.target.value})}></Form.Control>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Label className="custom-row">Estado</Form.Label>
                <DropdownEstados id="state" name ="state" title="estado" value={cliente.estado == null ? '' : cliente.estado} onChange={atualizaCidades()}></DropdownEstados>
              </Col>
              <Col>
                <Form.Label className="custom-row">Município</Form.Label>
                <DropdownCidades id="city" name ="city" title="municipio" state={cliente.cidade} value={cliente.cidade == null ? '' : cliente.cidade} onChange={atualizaCidades()}></DropdownCidades>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Label className="custom-row">Telefone</Form.Label>
                <Form.Control placeholder="Telefone" value={cliente.telefone == null ? '' : cliente.telefone} onChange={e => setCliente({ ...cliente, telefone: e.target.value})}></Form.Control>
              </Col>
              <Col>
                <Form.Label className="custom-row">Celular</Form.Label>
                <Form.Control placeholder="Celular" value={cliente.celular == null ? '' : cliente.celular} onChange={e => setCliente({ ...cliente, celular: e.target.value})}></Form.Control>
              </Col>
            </Row>

            <Row> 
              <Col>
                <Form.Label className="custom-row">Email</Form.Label>
                <Form.Control placeholder="Email" value={cliente.email == null ? '' : cliente.email} onChange={e => setCliente({ ...cliente, email: e.target.value})}></Form.Control>
              </Col>
            </Row>

            <Row> 
              <Col>
                <Form.Label className="custom-row">Email 2</Form.Label>
                <Form.Control placeholder="Email 2" value={cliente.email2 == null ? '' : cliente.email2} onChange={e => setCliente({ ...cliente, email2: e.target.value})}></Form.Control>
              </Col>
            </Row>
            </Form.Group>
          
          <Button variant="primary" type="button" style={{ marginTop: '3vh', marginBottom: '4vh' }}
          onClick={() => {cadastrarCliente()}}>
              Salvar
          </Button> 
          </Form>
          )}
      </Container>
    </div>
    )
  }