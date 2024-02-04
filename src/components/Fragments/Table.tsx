interface TouristProps {
  id: string;
  tourist_email: string;
  tourist_location: string;
  tourist_name: string;
}

interface TableProps {
  data: TouristProps[];
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  onDetail: (id: string) => void;
}

const Table: React.FC<TableProps> = ({ data, onDelete, onEdit, onDetail }) => {
  return (
    <table className="w-full min-w-[540px]">
      <thead>
        <tr>
          <th className="text-[12px] tracking-wide font-medium text-gray-500  py-2 px-4 bg-gray-100  text-left">
            Name
          </th>
          <th className="text-[12px] tracking-wide font-medium text-gray-500  py-2 px-4 bg-gray-100 text-left">
            Email
          </th>
          <th className="text-[12px] tracking-wide font-medium text-gray-500  py-2 px-4 bg-gray-100 text-left">
            Location
          </th>
          <th className="text-[12px] tracking-wide font-medium text-gray-500 py-2 px-4 bg-gray-100 text-left">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {data?.map((data) => (
          <tr key={data.id}>
            <td className="px-4 py-2 border-b border-b-gray-50">
              <span className="ml-2 text-sm font-medium text-gray-500 truncate hover:text-blue-500">
                {data.tourist_name}
              </span>
            </td>
            <td>{data.tourist_email}</td>
            <td>{data.tourist_location}</td>
            <td className="flex gap-2 px-4 py-2 border-b">
              <button
                className="py-[4px] px-2 bg-blue-400 rounded"
                onClick={() => onDetail(data.id)}
              >
                Detail
              </button>
              <button
                className="py-[4px] px-2 bg-orange-400 rounded"
                onClick={() => onEdit(data.id)}
              >
                Edit
              </button>
              <button
                className="py-[4px] px-2 bg-red-500 rounded"
                onClick={() => onDelete(data.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
