import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="absolute top-0 z-50 flex w-screen items-center justify-center py-5">
      <Link to={"/"} className="font-writing text-4xl">
        FrndzOnly
      </Link>
    </header>
  );
};
