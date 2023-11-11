import { LuListOrdered } from "react-icons/lu";
import { GiSoccerKick, GiSoccerBall } from "react-icons/gi";
import { TbSoccerField } from "react-icons/tb";
import { Link } from "react-router-dom";
const Front = () => {
  return (
    <div className="min-h-[90vh] flex justify-center items-center">
      <div className="grid sm:grid-cols-4 grid-cols-2 gap-2">
        <Link to="/standings">
          <article className=" bg-gray-700 aspect-square rounded-lg p-1 flex flex-col items-center justify-center">
            <LuListOrdered className=" text-7xl" />
            <h2 className=" text-xl font-semibold">الترتيب</h2>
          </article>
        </Link>
        <Link to="/games">
          <article className=" bg-gray-700 aspect-square rounded-lg p-1 flex flex-col items-center justify-center">
            <GiSoccerKick className="text-7xl" />
            <h2 className="text-xl font-semibold">المباريات القادمة</h2>
          </article>
        </Link>
        <Link to="/played_games">
          <article className="  bg-gray-700 aspect-square rounded-lg p-1 flex flex-col items-center justify-center">
            <GiSoccerBall className="text-6xl" />
            <h2 className="text-xl font-semibold">المباريات الفائته</h2>
          </article>
        </Link>
        <Link to="/join">
          <article className="relative  bg-gray-700 aspect-square rounded-lg p-1 flex flex-col items-center justify-center">
            <TbSoccerField className="text-7xl" />
            <h2 className="text-xl font-semibold">إنضم لنا</h2>
          </article>
        </Link>

        {/* <article className=" bg-gray-700 aspect-square rounded-lg p-1 flex flex-col items-center justify-center">
          <img
            src="https://crests.football-data.org/57.png"
            alt="team logo"
            className="w-16"
          />
          <h1 className="font-bold">Med_ali</h1>
          <h2 className="text-xl font-semibold">أقوى دفاع</h2>
        </article>
        <article className=" bg-gray-700 aspect-square rounded-lg p-1 flex flex-col items-center justify-center">
          <img
            src="https://crests.football-data.org/86.png"
            alt="team logo"
            className="w-16"
          />
          <h1 className="font-bold">Med_ali</h1>

          <h2 className="text-xl font-semibold">أقوى هجوم</h2>
        </article> */}
      </div>
    </div>
  );
};
export default Front;
