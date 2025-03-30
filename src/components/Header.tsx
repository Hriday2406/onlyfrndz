import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { HoverBorderGradient } from "./ui/hover-border-gradient";
import { ModeToggle } from "./mode-toggle";

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activePath, setActivePath] = useState(location.pathname);

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location.pathname]);

  return (
    <header className="absolute top-0 z-50 w-full">
      <div
        className={`container mx-auto flex flex-col items-center gap-5 md:flex-row md:gap-0 ${activePath === "/" ? "justify-between" : "justify-center"} py-5 md:px-10`}
      >
        <Link to={"/"} className="font-writing text-4xl">
          OnlyFrndz
        </Link>
        {activePath === "/" && (
          <div className="flex items-center justify-between gap-5 md:w-1/2 md:gap-20">
            <HoverBorderGradient
              containerClassName="md:-translate-x-1/2"
              as="button"
              className="dark:bg-background cursor-pointer bg-white font-mono font-bold text-black dark:text-white"
              onClick={() => navigate("/membership")}
            >
              <span>Membership</span>
            </HoverBorderGradient>

            <div className="flex gap-5">
              <ModeToggle />
              <Button
                variant="outline"
                className="dark:bg-background cursor-pointer rounded-full border-2 bg-white py-5 text-base text-black dark:text-white"
                onClick={() => {
                  localStorage.removeItem("Authorization");
                  navigate(
                    localStorage.getItem("Authorization") ? "/" : "/login",
                  );
                }}
              >
                {localStorage.getItem("Authorization") ? "Logout" : "Login"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
