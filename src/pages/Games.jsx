import "../app.css";
import logo from "../assets/logo 1 simple png.png";
import customAxios from "../../utils/axios";
import { useState } from "react";
import { useEffect } from "react";

const Games = () => {
  const [games, setGames] = useState([]);
  const [results, setResults] = useState({
    homeTeam: "",
    awayTeam: "",
  });
  const [message, setMessage] = useState("");

  const handleResults = (e) => {
    setResults({
      ...results,
      [e.target.name]: e.target.value,
    });
  };

  const fetchMatches = async () => {
    try {
      const res = await customAxios.get("/matches-with-team-infos");
      if (res.status === 200) {
        setGames(res.data);
      }
    } catch (error) {
      console.log("🚀 ~ file: Games.jsx:18 ~ fetchMatches ~ error:", error);
    }
  };

  const handleUpdateMatch = async (matchId) => {
    try {
      const updatedResult = {
        homeTeamGoals: results.homeTeam,
        awayTeamGoals: results.awayTeam,
      };
      const res = await customAxios.put(`/update-match/${matchId}`, {
        result: updatedResult,
      });
      if (res.status === 200) {
        setMessage("GG");
        fetchMatches();
        setTimeout(() => {
          setMessage("");
        }, 3000);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  return (
    <div className="w-full flex justify-center">
      <div className="container">
        <div className="match">
          <div className="match-header">
            <div className="match-tournament">
              <img src={logo} />
              Ac Gaming League
            </div>
          </div>
          <div className="grid gap-4  divide-red-950 divide-y">
            {games?.map((game) => (
              <div key={game._id} className="match-content">
                <div className="column sm:p-8 p-4">
                  <div className="team team--home">
                    <div className=" w-8 sm:w-12 h-8 sm:h-12">
                      <img src={game?.homeTeam.team.crest} />
                    </div>
                    <h2 className="team-name font-semibold sm:text-2xl">
                      {game?.homeTeam.name}
                    </h2>
                  </div>
                </div>
                <div className="column ">
                  <div className="match-details">
                    <div className="flex gap-2">
                      <div className="text-sm sm:text-base font-semibold">
                        {game.day} :يوم
                      </div>
                      <div className="font-semibold text-sm sm:text-base">
                        {game.time.slice(0, 1)} :ساعة
                      </div>
                    </div>

                    <div className="match-referee text-xs">الحكم: حمزة</div>

                    <span
                      onClick={() =>
                        document
                          .getElementById(`my_modal_${game._id}`)
                          .showModal()
                      }
                      className="btn btn-xs btn-outline btn-primary mt-2 hover:animate-pulse cursor-pointer"
                    >
                      لعب
                    </span>

                    <dialog id={`my_modal_${game._id}`} className="modal">
                      <div className="modal-box">
                        <div className="flex justify-between items-center">
                          <div className="column sm:p-8 p-4">
                            <div className="team team--home">
                              <div className=" w-8 sm:w-12 h-8 sm:h-12">
                                <img src={game?.homeTeam.team.crest} />
                              </div>
                              <h2 className=" w-24 truncate text-center font-semibold sm:text-2xl">
                                {game?.homeTeam.name}
                              </h2>
                            </div>
                          </div>

                          <input
                            type="number"
                            min={0}
                            max={20}
                            className="input input-bordered w-full max-w-xs"
                            name="homeTeam"
                            value={results.homeTeam}
                            onChange={handleResults}
                          />
                          <p className="mx-4">-</p>
                          <input
                            type="number"
                            min={0}
                            max={20}
                            className="input input-bordered w-full max-w-xs"
                            name="awayTeam"
                            value={results.awayTeam}
                            onChange={handleResults}
                          />

                          <div className="column sm:p-8 p-4">
                            <div className="team team--away">
                              <div className=" w-8 sm:w-12 h-8 sm:h-12">
                                <img src={game?.awayTeam.team.crest} />
                              </div>
                              <h2 className=" w-24 truncate text-center font-semibold sm:text-2xl">
                                {game?.awayTeam.name}
                              </h2>
                            </div>
                          </div>
                        </div>
                        <div className="modal-action">
                          <form
                            method="dialog"
                            className="w-full flex justify-center"
                          >
                            {/* if there is a button in form, it will close the modal */}
                            <button
                              onClick={() => handleUpdateMatch(game._id)}
                              className="btn btn-sm btn-primary"
                            >
                              تم
                            </button>
                          </form>
                        </div>
                      </div>
                    </dialog>
                  </div>
                </div>
                <div className="column sm:p-8 p-4">
                  <div className="team team--away">
                    <div className=" w-8 sm:w-12 h-8 sm:h-12">
                      <img src={game?.awayTeam.team.crest} />
                    </div>
                    <h2 className="team-name font-semibold sm:text-2xl">
                      {game?.awayTeam.name}
                    </h2>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {message && (
        <div className="toast toast-center">
          <div className="alert alert-info bg-red-700 justify-center items-center flex  border-none  text-white">
            <span>{message}</span>
          </div>
        </div>
      )}
    </div>
  );
};
export default Games;
