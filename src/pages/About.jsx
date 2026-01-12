// import { useTypewriter } from "../hooks/useTypewriter";

// export const About = () => {
//   const fullText = `gloam (noun) : twilight, dusk, or the time when light fades after sunset

// Gloam: The Winding Path is a dark-fantasy text-based adventure game. It was inspired by table-top role-playing games like Dungeons & Dragons, classic text-based adventure games like Zork, and those fun choose-your-own-adventure novels that we read as kids.

// Gloam is a personal project that was created out of a love for adventure and a desire to share adventure with others.

// Thank you for playing.`;

//   const { displayText, isComplete, skip } = useTypewriter(fullText, 20);

//   return (
//     <div
//       className="animate-fadeIn flex flex-col items-center justify-center pt-40 pb-8"
//       onClick={!isComplete ? skip : undefined}
//     >
//     <h1 className="font-washington text-5xl text-stone-300 mb-10">About</h1>
//       <div className="max-w-168 ml-15 mr-15 text-xl text-justify leading-9 text-stone-300 relative">
//         <div className="invisible whitespace-pre-wrap">{fullText}</div>
//         <div className="absolute inset-0 whitespace-pre-wrap">
//           {displayText}
//         </div>
//       </div>
//     </div>
//   );
// };

export const About = () => {
  return (
    <div className="animate-fadeIn flex flex-col items-center justify-center pt-40 pb-8">
      <h1 className="font-washington text-5xl text-stone-300 mb-10">About</h1>
      <div className="max-w-156 ml-15 mr-15 text-xl text-justify leading-9 text-stone-300 relative">
        <p className="mb-10">
          gloam (noun) : twilight, dusk, or the time when light fades after
          sunset
        </p>
        <p className="mb-8">
          Gloam: The Winding Path is a dark-fantasy text-based adventure game.
          It was inspired by table-top role-playing games like Dungeons &
          Dragons, classic text-based adventure games like Zork, and those fun
          choose-your-own-adventure novels that we read as kids.
        </p>
        <p className="mb-8">
          Gloam is a personal project that was created out of a love for adventure and a desire to share adventure with others.
        </p>
        <p>
          Thank you for playing.
        </p>
      </div>
    </div>
  );
};
