import { FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer>
      <div className="flex flex-col md:flex-row justify-between ">
        <aside className="w-full md:w-1/2 bg-[#1F2937] flex flex-col justify-center items-center gap-y-1 text-white/70 p-10">
          <h2 className="text-2xl font-bold mb-2 ">CONTACT US</h2>
          <div className="text-sm  text-center space-y-1">
            <p>123 ABS Street, Uni 21, Bangladesh</p>
            <p>+88 123456789</p>
            <p>Mon - Fri: 08:00 - 22:00</p>
            <p>Sat - Sun: 10:00 - 23:00</p>
          </div>
        </aside>
        <aside className="w-full md:w-1/2 flex flex-col justify-center items-center gap-y-3 bg-[#111827] text-white/70 p-10">
          <h2 className="text-2xl font-bold ">Follow US</h2>
          <p className="text-sm ">Join us on social media</p>
          <div className="flex gap-4">
            <FaFacebookF className="text-2xl" />
            <FaTwitter className="text-2xl" />
            <FaYoutube className="text-2xl" />
          </div>
        </aside>
      </div>

      <div className="footer footer-center bg-[#151515] text-white/60 p-4">
        <p>
          Copyright &copy; {new Date().getFullYear()} - All right reserved by
          Bistro Boss Restaurant
        </p>
      </div>
    </footer>
  );
};

export default Footer;
