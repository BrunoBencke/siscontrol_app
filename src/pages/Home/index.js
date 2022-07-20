import React from "react";
import Logo from "../../components/Imagens/marca.png";
import * as C from "./styles";
import Topnav from '../../components/NavBar/Topnav';

const Home = () => {

  return (
    <div className="Home">
      <Topnav/>
      <C.Content>
      <img src={Logo} width={1000} height={200} 
        style={{ display: 'flex', alignSelf: 'center' }} alt="Logo"/>
      </C.Content>
    </div>
  );
};

export default Home;
