import "../app.css";
import customAxios from "../../utils/axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [teams, setTeams] = useState([]);
  const [form, setForm] = useState({});
  const [message, setMessage] = useState("");
  //   const [chooseTeam, setChooseTeam] = useState(null);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const fetchTeams = async () => {
    const res = await customAxios.get("/allteams");
    setTeams(res.data);
  };
  const fetchMatches = async () => {
    try {
      const res = await customAxios.get("/matches");
      if (res.status === 200) {
        navigate("/games");
      }
    } catch (error) {
      if (error.response.data.available) {
        navigate("/games");
      } else {
        fetchTeams();
      }
    }
  };

  const handleStartLeage = async (e) => {
    e.preventDefault();
    try {
      const res = await customAxios.get("/start");
      setMessage("Games on");
      setTimeout(() => {
        setMessage("");
        navigate("/games");
      }, 2000);
    } catch (error) {
      setMessage(error.response.data.message);
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };
  const handleGo = async (e) => {
    e.preventDefault();
    if (!Object.values(form).every((v) => v)) {
      setMessage("أملء المعلومات");

      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
    try {
      const req = await customAxios.post("/join/league", form);
      if (req.status === 201) {
        setMessage(req.data.message);
        setTimeout(() => {
          setMessage("");
        }, 3000);
      }
    } catch (error) {
      setMessage(error.response.data.error);
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };
  useEffect(() => {
    fetchMatches();
  }, []);
  return (
    <div className=" px-24 sm:px-0">
      <div className="login-box">
        <h2>دوري الأبطال</h2>
        <form>
          <div className="user-box">
            <input type="text" onChange={handleChange} name="name" />
            <label>الإسم</label>
          </div>
          <div className="user-box">
            <input type="text" onChange={handleChange} name="joinCode" />
            <label>رقم الإنضمام</label>
          </div>
          <div>
            <select
              className="select w-full max-w-xs"
              name="team"
              onChange={handleChange}
              id="teams"
            >
              {teams &&
                teams?.map((team) => (
                  <option key={team._id} value={team._id}>
                    {team.shortName}
                  </option>
                ))}
            </select>
          </div>
          <a>
            <span />
            <span />
            <span />
            <span />
            <button onClick={handleGo}>Go</button>
          </a>
        </form>
      </div>
      <div className=" flex justify-center pt-[30rem]">
        <button onClick={handleStartLeage} className="the-button">
          بدء
        </button>
      </div>
      {message && (
        <div className="toast toast-center">
          <div className="alert alert-info bg-[#1D0E0E] border-none  text-white">
            <span>{message}</span>
          </div>
        </div>
      )}
    </div>
  );
};
export default Home;
