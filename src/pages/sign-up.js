import Logo from "../assets/Logo";
import Footer from "../components/Footer";
import SignUp from '../components/forms/SignUp'
import background from "../assets/home-bg.jpg";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <section
      style={{
        backgroundImage: `linear-gradient(0deg, transparent 80%, rgba(0, 0, 0, 0.7)),
    radial-gradient(90% 100%, transparent 0, rgba(0, 0, 0, 0.7) 100%),url(${background})`,
      }}
    >
      <Link to="/">
        <Logo width={"8rem"} padding={"1.5rem 2.5rem"} />
      </Link>
      <SignUp />
      <Footer bgColor="rgb(0, 0, 0,0.65)" />
    </section>
  );
};

export default Login;
