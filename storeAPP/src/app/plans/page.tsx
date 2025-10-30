import PlansPageContainer from "@/modules/plans/plans-page.container";

export default function PlansPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-10">
        Escolha o Plano Perfeito para Você
      </h1>
      <PlansPageContainer />
    </div>
  );
}
