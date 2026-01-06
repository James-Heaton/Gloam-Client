import { useTypewriter } from "../hooks/useTypewriter";

export const Rules = () => {
  const fullText = `Gloam: The Winding Path is a game of adventure, exploration, risk, and reward. You must weigh the risk of an action against what you hope to gain.

Your goal is to survive... and acquire as much treasure as possible.

Once you enter an area, the way back locks behind you. You can only go forward. 

Risky Actions will result in a Complete Success, Mixed Success, or Complete Failure. This is determined by a hidden 2D6 dice roll.

Being Lucky is helpful, but it does not always guarantee a success.

If you wish to edit a Character, that Character’s game progress will be reset.

If you wish to skip the animated text, simply click to do so.`;

  const { displayText, isComplete, skip } = useTypewriter(fullText, 20);

  return (
    <div
      className="animate-fadeIn flex flex-col items-center justify-center pt-30 pb-8"
      onClick={!isComplete ? skip : undefined}
    >
    <h1 className="font-washington text-4xl text-red-800 mb-10">Rules</h1>
      <div className="font-washington max-w-168 ml-15 mr-15 text-2xl text-justify leading-10 text-stone-300 relative mb-5">
        <div className="invisible whitespace-pre-wrap">{fullText}</div>
        <div className="absolute inset-0 whitespace-pre-wrap">
          {displayText}
        </div>
      </div>
    </div>
  );    
}