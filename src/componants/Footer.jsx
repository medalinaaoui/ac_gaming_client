import { FaGithub, FaInstagram } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="h-16 mt-6 gap-2 bg-[#120a0a] w-full flex justify-center items-center">
      <span className=" cursor-pointer">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/medalinaaoui"
        >
          <FaGithub />
        </a>
      </span>
      <span className=" cursor-pointer">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://instagram.com/chayga_01?igshid=NzZlODBkYWE4Ng=="
        >
          <FaInstagram />
        </a>
      </span>
      <p className="text-center  text-white text-xs font-semibold">
        {"جميع الحقوق محفوظة، محمد علي النعوي"} &copy;
      </p>
    </footer>
  );
};
export default Footer;
