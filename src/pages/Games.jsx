import "../app.css";
import logo from "../assets/logo 1 simple png.png";
import customAxios from "../../utils/axios";
import { useState } from "react";
import { useEffect } from "react";

const Games = () => {
  const [games, setGames] = useState([]);

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
              Ac League
            </div>
          </div>
          <div className="grid gap-4 divide-y">
            {games?.map((game) => (
              <div key={game._id} className="match-content">
                <div className="column">
                  <div className="team team--home">
                    <div className="team-logo">
                      <img src={game?.homeTeam.team.crest} />
                    </div>
                    <h2 className="team-name">{game?.homeTeam.name}</h2>
                  </div>
                </div>
                <div className="column">
                  <div className="match-details">
                    <div className="match-date">
                      {game.day} على <strong>{game.time}</strong>
                    </div>
                    <div className="match-score">
                      <span className="match-score-number match-score-number--leading">
                        VS
                      </span>
                    </div>

                    <div className="match-referee">
                      الحكم: <strong>حمزة</strong>
                    </div>

                    <button className="btn btn-sm mt-2 btn-outline btn-secondary">
                      لعبت
                    </button>
                  </div>
                </div>
                <div className="column">
                  <div className="team team--away">
                    <div className="team-logo">
                      <img src={game?.awayTeam.team.crest} />
                    </div>
                    <h2 className="team-name">{game?.awayTeam.name}</h2>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Games;
