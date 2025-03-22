import { BackgroundBeams } from "@/components/ui/background-beams";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const CustomCard: React.FC<{
  isMember: boolean;
  setIsMember: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ isMember, setIsMember }) => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  return (
    <Card className="bg-background relative w-[300px] rounded-[20px] sm:w-[400px]">
      <CardHeader>
        <CardTitle className="font-display text-center text-4xl font-bold">
          {isMember ? "You are a member!" : "Want to be a member?"}
        </CardTitle>
        <CardDescription className="text-center font-mono">
          {isMember
            ? "You can now access the membership features of this blog."
            : "Enter the membership password to become a member of this blog."}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {!isMember && (
          <Input
            type="password"
            placeholder="Shhhhhhhhh"
            ref={inputRef}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && password === "buriburi" && setIsMember(true)
            }
          />
        )}
        <Button
          className="mt-3 cursor-pointer"
          onClick={() => {
            if (isMember) navigate("/");
            if (password === "buriburi") setIsMember(true);
            else setIsMember(false);
          }}
        >
          {isMember ? "Go to Homepage" : "Become a member"}
        </Button>
      </CardContent>
    </Card>
  );
};

const Membership: React.FC = () => {
  const [isMember, setIsMember] = useState(false);
  return (
    <section className="flex h-screen items-center justify-center">
      <BackgroundBeams />
      {isMember ? (
        <BackgroundGradient>
          <CustomCard isMember={isMember} setIsMember={setIsMember} />
        </BackgroundGradient>
      ) : (
        <CustomCard isMember={isMember} setIsMember={setIsMember} />
      )}
    </section>
  );
};

export default Membership;
