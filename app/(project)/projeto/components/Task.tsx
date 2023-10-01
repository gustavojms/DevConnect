type TaskProps = {
  title: string;
  description: string;
  priority: string;
};

export default function Task(props: TaskProps) {
  return (
    <div
      id="task"
      className="flex flex-col bg-pale-blue bg-opacity-[15%] w-56 h-40 rounded-lg p-3"
    >
      <div className="bg-red-500 bg-opacity-10 w-max px-4 rounded mt-2">
        <span className="text-red-500 font-bold uppercase">
          {props.priority}
        </span>
      </div>
      <h1 className="text-white font-bold first-letter:capitalize">
        {props.title}
      </h1>
      <p className="text-gray-ba text-sm first-letter:capitalize">
        {props.description}
      </p>
    </div>
  );
}
