export default function AreaDisplay({ area }) {
  return (
    <div className="bg-gray-900 text-white p-6 rounded">
      {/* <div className="mb-2">
        <span className="text-sm text-gray-400">Area {area.area_number}</span>
      </div> */}
      
      <h2 className="text-2xl font-bold mb-4">{area.name}</h2>
      
      <p className="text-gray-300 leading-relaxed whitespace-pre-line">
        {area.description}
      </p>
    </div>
  );
}
