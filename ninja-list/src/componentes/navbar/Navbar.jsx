import { BsBoxArrowRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import imagemLogo from "../../assets/img/ninjalist-logo.png";

const Navbar = () => {
  const local = localStorage.getItem("criptografia");
  let redireciona = useNavigate();

  const chamandoRedirect = () => {
    localStorage.clear();
    redireciona("/");
  };

  return (
    <nav className="navbar navbar-expand-lg mt-3 border-bottom border-1">
      <div className="container mb-2">
        <div className="navbar-brand m-0 h1">
          <img
            src={imagemLogo}
            alt=""
            width="30"
            className="d-inline-block align-text-top me-2 rounded-circle"
          />
          Ninja List
        </div>
        {local ? (
          <button
            className="btn btn-warning me-2"
            type="button"
            onClick={chamandoRedirect}
          >
            <BsBoxArrowRight className="align-text-top me-2" />
            Sair
          </button>
        ) : null}
      </div>
    </nav>
  );
};

export default Navbar;
