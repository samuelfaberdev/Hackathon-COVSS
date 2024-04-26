import Konami from "konami";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import team from "../utils/team.json";

function Team() {
  const navigate = useNavigate();

  useEffect(() => {
    const easterEgg = new Konami(() => {
      navigate("/team-egg");
    });
    console.info(easterEgg);
  });

  return (
    <div className="flex max-sm:flex-col sm:flex-row sm:max-2xl:flex-wrap items-center justify-center mt-5">
      {team
        .filter((element) => element.name !== "Antho le BG")
        .map((member) => (
          <div key={member.name}>
            <a
              className="flex flex-col items-center"
              href={member.linkedin}
              rel="noreferrer"
              target="_blank"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-[50%] rounded-full drop-shadow-[-4px_4px_4px_rgba(0,0,0,0.25)]"
              />
              <h2 className="p-[1rem] font-bold text-primary">{member.name}</h2>
            </a>
          </div>
        ))}
    </div>
  );
}

export default Team;
