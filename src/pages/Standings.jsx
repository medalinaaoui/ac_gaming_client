import axios from "../../utils/axios";
import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

const Standings = () => {
  const [standings, setStandings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const fetchStanding = async () => {
    try {
      const res = await axios.get(`/standings`);
      if (res.status === 200) {
        setIsLoading(false);
        setStandings(res.data);
        console.log("Standings ~ res.data:", res.data);
      }
    } catch (error) {
      setIsLoading(false);
      console.log("fetchStanding ~ error:", error);
    }
  };
  useEffect(() => {
    fetchStanding();
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="table ">
        {/* head */}
        <thead>
          <tr>
            <th>#</th>
            <th>الإسم</th>
            <th>لعب</th>
            <th>النقط</th>
            <th>فوز</th>
            <th className="sm:block hidden">تعادل</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <div className="w-screen h-screen flex justify-center items-center">
              <span className="loader"></span>
            </div>
          ) : standings?.length > 0 ? (
            standings?.map((user) => (
              <tr key={user._id}>
                <th>{user.rank}</th>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-8 sm:w-12 h-8 sm:h-12">
                        <img src={user.teamFlag} alt="main user picture" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold sm:text-base text-sm">
                        {user.user}
                      </div>
                      <div className="text-sm opacity-50 hidden sm:block ">
                        {user.team}
                      </div>
                    </div>
                  </div>
                </td>
                <td>{user.gamesPlayed}</td>
                <td>{user.points}</td>
                <td>{user.wins}</td>
                <td className="sm:block hidden">{user.draws}</td>
              </tr>
            ))
          ) : (
            <p>You didn&rsquo;t include any vehicle yet</p>
          )}
        </tbody>
      </table>
    </div>
  );
};
export default Standings;
