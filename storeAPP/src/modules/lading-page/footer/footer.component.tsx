export default function FooterComponent() {
  return (
    <div
      style={{ padding: "4rem" }}
      className="flex flex-col items-center justify-center bg-blue-900"
    >
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="flex justify-between items-center">
            <div className="text-lg font-semibold">Sua Empresa</div>
            <div className="flex space-x-6">
              <a href="#home" className="hover:text-blue-400">
                Home
              </a>
              <a href="#about" className="hover:text-blue-400">
                Sobre
              </a>
              <a href="#services" className="hover:text-blue-400">
                Serviços
              </a>
              <a href="#contact" className="hover:text-blue-400">
                Contato
              </a>
            </div>
          </div>
          <div className="mt-6 text-center text-sm">
            <p>
              &copy; {new Date().getFullYear()} Sua Empresa. Todos os direitos
              reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
