import React from "react";
import Topnav from "../../components/NavBar/Topnav";
import DropdownEstados from "../../components/DropdownEstados/index";
import DropdownCidades from "../../components/DropdownCidades/index";
import "../../pages/Empresa/styles.css";
import { useNavigate } from "react-router-dom";
import { Container, Button, Form, Col, Row } from "react-bootstrap";

export default function Empresa(){

  let navigate  = useNavigate();

  const [isLoading, setIsLoading] = React.useState(true);
  const [empresa, setEmpresa] = React.useState({
    cMun: "",
    cPais: "",
    cep: "",
    cnae: "",
    cnpj: "",
    cpf: "",
    crt: "",
    email: "",
    fone: "",
    ie: "",
    iest: "",
    im: "",
    nro: "",
    uf: "",
    xBairro: "",
    xCpl: "",
    xFant: "",
    xLgr: "",
    xMun: "",
    xNome: "",
    xPais: "",
    xSlogan: ""
  });

  React.useEffect(() => {

       setTimeout(() => {
         setIsLoading(false);
       }, 200);

      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {

      const token = localStorage.getItem('user_token');
  
      const requestInfo = {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }),
      };
  
      fetch("http://127.0.0.1:8000/api/emitente/1", requestInfo)
        .then(resposta => resposta.json())
        .then((json) => setEmpresa(json))
        .catch((error) => console.log(error));

      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const editarEmpresa = () => {
    const token = localStorage.getItem('user_token');

    const requestInfo = {
      method: 'POST',
      headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      }),
      body: JSON.stringify(empresa)
    };

    fetch("http://127.0.0.1:8000/api/emitente/1", requestInfo)
      .then(resposta => {
        if(resposta.ok){
          //console.log('Sucess')
          navigate('/home');
        }else{
          alert('Não foi possível atualizar empresa')
        }
      })        
  };

  const atualizaEstado = (e) => {
    setEmpresa({ ...empresa, uf: e})
  }

  const atualizaCidade = (e) => {
    setEmpresa({ ...empresa, cMun: e})
  }

  return (
    <div>
      <Topnav/>
      <Container style={{width: '750px'}}>
      {isLoading ? (
            <h2 className="custom-title">Carregando...</h2>
          ) : (
        <Form>    
          <Form.Group>
            <h2 className="custom-title">Empresa</h2>

            <Row className="custom-row">
              <Col>
                <Form.Label>Razão Social</Form.Label>
                <Form.Control placeholder="Razão Social" value={empresa.xNome == null ? '' : empresa.xNome} onChange={xNome => setEmpresa({ ...empresa, xNome: xNome.target.value})}></Form.Control>
              </Col>
            </Row>

            <Row className="custom-row"> 
              <Col>
                <Form.Label className="custom-row">Fantasia</Form.Label>
                <Form.Control placeholder="Fantasia" value={empresa.xFant == null ? '' : empresa.xFant} onChange={xFant => setEmpresa({ ...empresa, xFant: xFant.target.value})}></Form.Control>
              </Col>
            </Row>

            <Row className="custom-row"> 
              <Col>
                <Form.Label className="custom-row">Slogan</Form.Label>
                <Form.Control placeholder="Slogan" value={empresa.xSlogan == null ? '' : empresa.xSlogan} onChange={xSlogan => setEmpresa({ ...empresa, xSlogan: xSlogan.target.value})}></Form.Control>
              </Col>
            </Row>

            <Row className="custom-row">
              <Col>
                <Form.Label className="custom-row">CNPJ</Form.Label>
                <Form.Control placeholder="CNPJ" value={empresa.cnpj == null ? '' : empresa.cnpj} onChange={cnpj => setEmpresa({ ...empresa, cnpj: cnpj.target.value})}></Form.Control>
                <Form.Text className="text-muted">
                Com pontos e formatação.
                </Form.Text>
              </Col>
              <Col>
                <Form.Label className="custom-row">IE</Form.Label>
                <Form.Control placeholder="IE" value={empresa.ie == null ? '' : empresa.ie} onChange={ie => setEmpresa({ ...empresa, ie: ie.target.value})}></Form.Control>
              </Col>
            </Row>

            <Row className="custom-row">
              <Col>
                <Form.Label className="custom-row">IM</Form.Label>
                <Form.Control placeholder="IM" value={empresa.im == null ? '' : empresa.im} onChange={im => setEmpresa({ ...empresa, im: im.target.value})}></Form.Control>
              </Col>
              <Col>
                <Form.Label className="custom-row">IE ST</Form.Label>
                <Form.Control placeholder="IE ST" value={empresa.iest == null ? '' : empresa.iest} onChange={iest => setEmpresa({ ...empresa, iest: iest.target.value})}></Form.Control>
              </Col>
            </Row>

            <Row className="custom-row">
              <Col>
                <Form.Label className="custom-row">CNAE</Form.Label>
                <Form.Control placeholder="CNAE" value={empresa.cnae == null ? '' : empresa.cnae} onChange={cnae => setEmpresa({ ...empresa, cnae: cnae.target.value})}></Form.Control>
              </Col>
              <Col>
                <Form.Label className="custom-row">Regime</Form.Label>
                <Form.Select variant="secondary" title="Regime" value={empresa.crt == null ? '' : empresa.crt} onChange={crt => setEmpresa({ ...empresa, crt: crt.target.value})}></Form.Select>
              </Col>
            </Row>

            <Row className="custom-row"> 
              <Col>
                <Form.Label className="custom-row">Logradouro</Form.Label>
                <Form.Control placeholder="Logradouro" value={empresa.xLgr == null ? '' : empresa.xLgr} onChange={xLgr => setEmpresa({ ...empresa, xLgr: xLgr.target.value})}></Form.Control>
              </Col>
            </Row>

            <Row className="custom-row">
              <Col>
                <Form.Label className="custom-row">Número</Form.Label>
                <Form.Control placeholder="Número" value={empresa.nro == null ? '' : empresa.nro} onChange={nro => setEmpresa({ ...empresa, nro: nro.target.value})}></Form.Control>
              </Col>
              <Col>
                <Form.Label className="custom-row">Bairro</Form.Label>
                <Form.Control placeholder="Bairro" value={empresa.xBairro == null ? '' : empresa.xBairro} onChange={xBairro => setEmpresa({ ...empresa, xBairro: xBairro.target.value})}></Form.Control>
              </Col>
              <Col>
                <Form.Label className="custom-row">CEP</Form.Label>
                <Form.Control placeholder="CEP" value={empresa.cep == null ? '' : empresa.cep} onChange={cep => setEmpresa({ ...empresa, cep: cep.target.value})}></Form.Control>
              </Col>
            </Row>

            <Row className="custom-row">
              <Col>
                <Form.Label className="custom-row">Estado</Form.Label>
                <DropdownEstados id="estado" name="estado" title="estado" estado={empresa.uf} onChange={(ev) => atualizaEstado(ev.target.value)}></DropdownEstados>
              </Col>
              <Col>
                <Form.Label className="custom-row">Município</Form.Label>
                <DropdownCidades id="municipio" name="municipio" title="municipio" estado={empresa.uf} cidade={empresa.cMun} onChange={(ev) => atualizaCidade(ev.target.value)}></DropdownCidades>
              </Col>
            </Row>

            <Row className="custom-row"> 
              <Col>
                <Form.Label className="custom-row">Complemento</Form.Label>
                <Form.Control placeholder="Complemento" value={empresa.xCpl == null ? '' : empresa.xCpl} onChange={xCpl => setEmpresa({ ...empresa, xCpl: xCpl.target.value})}></Form.Control>
              </Col>
            </Row>

            <Row className="custom-row">
              <Col>
                <Form.Label className="custom-row">Telefone</Form.Label>
                <Form.Control placeholder="Telefone" value={empresa.fone == null ? '' : empresa.fone} onChange={fone => setEmpresa({ ...empresa, fone: fone.target.value})}></Form.Control>
              </Col>
            </Row>

            <Row className="custom-row"> 
              <Col>
                <Form.Label className="custom-row">Email</Form.Label>
                <Form.Control placeholder="Email" value={empresa.email == null ? '' : empresa.email} onChange={email => setEmpresa({ ...empresa, email: email.target.value})}></Form.Control>
              </Col>
            </Row>

          </Form.Group>

          <Button variant="secondary" type="button" style={{ marginTop: '3vh', marginBottom: '4vh' }}
          onClick={() => {editarEmpresa()}}>
              Salvar
          </Button>

          <Button variant="outline-secondary" type="button" style={{ marginTop: '3vh', marginBottom: '4vh', marginLeft: '4vh' }}
          onClick={() => {navigate('/home')}}>
              Voltar
          </Button> 
        </Form>
        )}
      </Container>
    </div>
    )
  }