export const Rules = () => {
  return (
    <div
      className="animate-fadeIn flex flex-col items-center justify-center pt-40 pb-8"
    >
    <h1 className="font-washington text-5xl text-stone-300 mb-10">Rules</h1>
      <div className="max-w-156 ml-15 mr-15 text-xl text-justify leading-9 text-stone-300 relative mb-5">
        <p className="mb-8">
          Gloam: The Winding Path is a game of adventure, exploration, risk, and reward. You must weigh the risk of an action against what you hope to gain.
        </p>
        <p className="mb-8">
          Your goal is to survive... and acquire as much treasure (GP) as possible.
        </p>
        <p className="mb-8">
          Once you enter an Area, the way back locks behind you. You can only go forward. 
        </p>
        <p className="mb-8">
          Your Actions may result in a Success, Mixed Success, or Failure. The outcome is determined by a hidden 2D6 dice roll. Each Action leads to a different Area.
        </p>
        <p className="mb-8">
          Being Lucky is helpful, but it does not always guarantee a success.
        </p>
        <p className="mb-8">
          HP and MP are very important. If you reach 0 HP, you will die. If you reach 0 MP, you can no longer use Magic.
        </p>
        <p className="mb-8">
          If you wish to edit a Character, that Character’s game progress will be reset.
        </p>
        <p className="mb-8">
          If you wish to skip the animated text, simply *click* the text to do so.
        </p>
      </div>
    </div>
  );    
}