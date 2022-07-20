import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Home from "../pages/Home";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import Clientes from '../pages/Clientes/clientes';
import Cliente from '../pages/Clientes/cliente';
import Empresa from '../pages/Empresa';

const Private = ({ Item }) => {
  const { signed } = useAuth();

  return signed > 0 ? <Item /> : <Signin />;
};

const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Fragment>
        <Routes>
          <Route exact path="/home" element={<Private Item={Home} />} />
          <Route path="/empresa" element={<Private Item={Empresa} />}></Route>
          <Route path="/clientes" element={<Private Item={Clientes} />}></Route>
          <Route path="/cadastrocliente" element={<Private Item={Cliente} />}></Route>
          <Route path="/cliente/:id" element={<Private Item={Cliente} />}></Route>
          <Route path="/" element={<Signin />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route path="*" element={<Signin />} />
        </Routes>
      </Fragment>
    </BrowserRouter>
  );
};

export default RoutesApp;
