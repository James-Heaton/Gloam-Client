import { useTypewriter } from "../hooks/useTypewriter";

export const Landing = () => {
    const fullText = `After days of hard travel, you see the castle at last. 
    
It looms over the horizon like a sentinel. Dark, ominous, and ever watchful. Its twisted towers claw at the moonlit sky above, and you wonder if its roots do the same to the cold earth below.

You have heard tales of great treasure hidden within the castle walls. Great treasure... and death.`

    const { displayText, isComplete, skip } = useTypewriter(fullText, 20);

    const renderTextWithStyle = (text) => {
        if (!text.includes('death.')) {
        return text;
        }
    
        const parts = text.split('death.');
        return (
        <>
            {parts[0]}
            <span className="text-red-800">death.</span>
            {parts[1]}
        </>
        );
    };

  return (
    <div
      className="animate-fadeIn flex flex-col items-center justify-center pt-45 pb-8"
      onClick={!isComplete ? skip : undefined}
    >
    {/* <h1 className="font-washington text-4xl text-red-800 mb-10">Rules</h1> */}
      <div className="font-washington max-w-168 ml-15 mr-15 text-2xl text-justify leading-10 text-stone-300 relative mb-5">
        <div className="invisible whitespace-pre-wrap">{fullText}</div>
        <div className="absolute inset-0 whitespace-pre-wrap">
          {renderTextWithStyle(displayText)}
        </div>
      </div>
    </div>
  );
};
