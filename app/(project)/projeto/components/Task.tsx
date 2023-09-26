export default function Task() {
  return (
    <div className="flex flex-col bg-pale-blue bg-opacity-[15%] w-56 h-40 rounded-lg">
      <div className="bg-red-500 bg-opacity-10 w-max px-4 rounded mt-5">
        <span className="text-red-500 font-bold uppercase">Alta</span>
      </div>
      <h1 className="text-white font-bold">Tarefa</h1>
      <p className="text-gray-ba text-sm">Descrição</p>
    </div>
  );
}
