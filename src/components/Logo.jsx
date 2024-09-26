import logo from "../assets/Logo.svg";

export default function Logo() {
  return (
    <div className="logo">
      <span role="img">
        <img src={logo} width={80} height={40} />
      </span>
      <h1>FilmoSphere</h1>
    </div>
  );
}
