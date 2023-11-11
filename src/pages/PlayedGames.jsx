import logo from "../assets/logo 1 simple png.png";
import customAxios from "../../utils/axios";
import { useState } from "react";
import { useEffect } from "react";
import { CiCircleRemove } from "react-icons/ci";

const Games = () => {
  const [games, setGames] = useState([]);
  const [results, setResults] = useState({
    homeTeam: "",
    awayTeam: "",
  });
  const [pass, setPass] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleResults = (e) => {
    setResults({
      ...results,
      [e.target.name]: e.target.value,
    });
  };

  const fetchMatches = async () => {
    try {
      setIsLoading(true);
      const res = await customAxios.get("/plyed-matches-with-team-infos");
      if (res.status === 200) {
        setGames(res.data);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.log("🚀 ~ file: Games.jsx:18 ~ fetchMatches ~ error:", error);
    }
  };

  const handleUpdateMatch = async (matchId) => {
    if (!results.homeTeam || !results.awayTeam || !pass) {
      setMessage("املأ المعلومات");
      setTimeout(() => {
        setMessage("");
      }, 3000);
    } else {
      try {
        const updatedResult = {
          homeTeamGoals: results.homeTeam,
          awayTeamGoals: results.awayTeam,
        };
        const res = await customAxios.put(`/update-match/${matchId}`, {
          pass,
          result: updatedResult,
        });
        if (res.status === 200) {
          setMessage("GG");
          setResults({
            homeTeam: "",
            awayTeam: "",
          });
          setPass("");
          fetchMatches();
          setTimeout(() => {
            setMessage("");
          }, 3000);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  return (
    <div className="w-full flex justify-center">
      <div className="container min-h-screen flex items-start">
        <div className="match">
          <div className="match-header">
            <div className="match-tournament">
              <img src={logo} />
              Ac Gaming League
            </div>
          </div>
          {isLoading ? (
            <div className="w-full h-screen flex justify-center items-center">
              <span className="loader"></span>
            </div>
          ) : games.length === 0 ? (
            <div className="w-full h-screen flex justify-center items-center">
              <span>لا توجد مباريات</span>
            </div>
          ) : (
            <div className="grid gap-4 divide-red-950 divide-y">
              {games?.map((game) => (
                <div key={game._id} className="match-content items-center ">
                  <div className="column sm:p-8 p-4">
                    <div className="team">
                      <div className=" w-8 sm:w-12 h-8 sm:h-12">
                        <img src={game?.homeTeam.team.crest} />
                      </div>
                      <h2 className=" font-semibold sm:text-2xl">
                        {game?.homeTeam.name}
                      </h2>
                    </div>
                  </div>
                  <div className="text-xl sm:text-2xl text-red-700 font-extrabold">
                    {game?.result?.homeTeamGoals}
                  </div>
                  <div className="column ">
                    <div className="match-details">
                      <div className="flex gap-2">
                        <div className="match-date">{game.day} :يوم</div>
                        <div className="match-date">
                          {game.time.slice(0, 1)} :ساعة
                        </div>
                      </div>
                      <span
                        onClick={() =>
                          document
                            .getElementById(`my_modal_${game._id}`)
                            .showModal()
                        }
                        className="btn btn-xs btn-outline btn-primary mt-2 hover:animate-pulse cursor-pointer"
                      >
                        تعديل
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
                              className="input input-bordered w-full max-w-xs p-0 text-center"
                              name="homeTeam"
                              value={results.homeTeam}
                              onChange={handleResults}
                            />
                            <p className="mx-4">-</p>
                            <input
                              type="number"
                              min={0}
                              max={20}
                              className="input input-bordered w-full max-w-xs p-0 text-center"
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
                            <form method="dialog" className="absolute top-4">
                              <button>
                                <CiCircleRemove className="text-3xl font-bold" />
                              </button>
                            </form>
                            <label className="absolute left-4 bottom-7">
                              #
                              <input
                                type="password"
                                name="pass"
                                onChange={(e) => setPass(e.target.value)}
                                value={pass}
                                className=" input input-bordered px-3 w-24 h-6 p-0 ml-1"
                              />
                            </label>
                            <form className="w-full flex justify-center">
                              <button
                                type="button"
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
                  <div className="text-xl sm:text-2xl text-red-700 font-extrabold">
                    {game?.result?.awayTeamGoals}
                  </div>
                  <div className="column sm:p-8 p-4">
                    <div className="team ">
                      <div className=" w-8 sm:w-12 h-8 sm:h-12">
                        <img src={game?.awayTeam.team.crest} />
                      </div>
                      <h2 className="font-semibold sm:text-2xl">
                        {game?.awayTeam.name}
                      </h2>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
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
