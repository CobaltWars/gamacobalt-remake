import Link from "next/link";
import { useTheme } from "next-themes";
import { FiSun, FiMoon, FiUser } from "react-icons/fi";

export default function Navbar() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    const themes = ["dark", "blue-dark", "blue-white", "white"];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  return (
    <nav className="flex justify-between items-center py-4 border-b border-gray-200 dark:border-blue-dark-700">
      <Link href="/" className="text-xl font-bold">
        MonPortfolio
      </Link>
      <div className="flex items-center space-x-4">
        <Link href="/jeux">Jeux</Link>
        <Link href="/logiciels">Logiciels</Link>
        <Link href="/gldf">GLDF</Link>
        <button onClick={toggleTheme} className="p-2 rounded-full">
          {theme === "dark" || theme === "blue-dark" ? <FiSun /> : <FiMoon />}
        </button>
        <Link href="/login" className="p-2 rounded-full">
          <FiUser />
        </Link>
      </div>
    </nav>
  );
}