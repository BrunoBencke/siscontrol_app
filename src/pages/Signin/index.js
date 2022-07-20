import React, { useState } from "react";
import Input from "../../components/Input";
import "../../pages/Signin/styles.css";
import { Button } from "react-bootstrap";
import Logo from "../../components/Imagens/splash.png";
import * as C from "./styles";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Signin = () => {
  const { signin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  async function handleLogin () {

    if (!email && !senha) {
      setError("Preencha todos os campos");
      return;
    }

    if (!email) {
      setError("Preencha seu e-mail");
      return;
    }

    if (!senha) {
      setError("Preencha sua senha");
      return;
    }

    const res = await signin(email, senha);

    if (!res) {
      setError('Dados incorretos');
      return;
    }

    navigate("/home");
  };

  return (
    <C.Container>
      {/*<C.Label>SISCONTROL</C.Label>*/}
      <C.Content>
        <img src={Logo} width={250} height={250} alt="Logo"/>
        <Input
          className="input"
          type="email"
          placeholder="Digite seu E-mail"
          value={email}
          onChange={(e) => [setEmail(e.target.value), setError("")]}
        />
        <Input
          type="password"
          placeholder="Digite sua Senha"
          value={senha}
          onChange={(e) => [setSenha(e.target.value), setError("")]}
        />
        <C.labelError>{error}</C.labelError>
        <Button className="btn-button" variant="secondary" type="button" onClick={handleLogin} >
          Entrar
        </Button>
        {/*
        <C.LabelSignup>
          Não tem uma conta?
          <C.Strong>
            <Link to="/signup">&nbsp;Registre-se</Link>
          </C.Strong>
        </C.LabelSignup>
        */}
      </C.Content>
    </C.Container>
  );
};

export default Signin;
