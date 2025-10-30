export default function TestimonialsComponent() {
  return (
    <div
      style={{ padding: "4rem" }}
      className="flex flex-col items-center justify-center bg-white shadow-md"
    >
      <div style={{ marginTop: "3rem", width: "60rem" }} className="m-2">
        <div
          style={{ gap: "3rem" }}
          className="flex items-center justify-center"
        >
          <div className="m-4 text-left">
            <h1
              style={{ width: "30rem" }}
              className="text-4xl font-bold text-gray-800 mb-4 transition-colors duration-300 hover:text-blue-600"
            >
              Faça igual a tantanana
            </h1>
            <div style={{ width: "32rem" }}>
              <p className="text-gray-500 text-left leading-relaxed text-base mb-4">
                descrição
              </p>
            </div>
          </div>

          <div className="flex-shrink-0">video</div>
        </div>
      </div>
    </div>
  );
}
