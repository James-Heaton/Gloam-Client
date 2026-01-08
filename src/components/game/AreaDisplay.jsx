import { useTypewriter } from '../../hooks/useTypewriter';

export default function AreaDisplay({ area }) {
  const { displayText, isComplete, skip } = useTypewriter(area.description, 30);

  return (
    <div 
      key={area.area_number}
      className="bg-black/50 border-4 border-stone-700 rounded-lg p-8 shadow-2xl"
      onClick={!isComplete ? skip : undefined}
    >
      <h2 className="font-washington text-4xl font-bold text-stone-300 mb-6 text-center">
        {area.name}
      </h2>
      
      <div className="relative">
        {/* Invisible text to reserve space */}
        <p className="invisible text-xl text-stone-300 leading-relaxed whitespace-pre-line">
          {area.description}
        </p>
        
        {/* Visible typed text */}
        <p className="absolute inset-0 text-xl text-stone-300 leading-relaxed whitespace-pre-line">
          {displayText}
        </p>
      </div>
    </div>
  );
}
