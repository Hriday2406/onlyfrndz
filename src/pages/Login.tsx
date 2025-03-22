import { BackgroundBeams } from "@/components/ui/background-beams";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [signUp, setSignUp] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const checkConfirmPassword = () => {
    if (password.length < 8 || password !== confirmPassword) return false;
    return true;
  };

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [signUp]);

  return (
    <section className="flex h-screen items-center justify-center">
      <BackgroundBeams />
      <BackgroundGradient>
        <Card className="bg-background relative w-[300px] rounded-[20px] sm:w-[400px]">
          <CardHeader>
            <CardTitle className="font-display text-center text-4xl font-bold">
              {signUp ? "Sign Up" : "Log In"}
            </CardTitle>
            <CardDescription className="text-center font-mono">
              Sign up / Login to access the website
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Input
              type="text"
              placeholder="Username"
              ref={inputRef}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {signUp && (
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            )}
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              // onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            />
            {signUp && (
              <Input
                type="password"
                placeholder="Confirm Password"
                className={` ${password === "" ? "" : checkConfirmPassword() ? "border-green-500" : "border-red-500"} transition-all duration-500`}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                // onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              />
            )}
            <Button className="mt-3 cursor-pointer">
              {signUp ? "Sign Up" : "Log In"}
            </Button>
          </CardContent>
          <CardFooter>
            <Button
              variant="link"
              className="mx-auto cursor-pointer"
              size="sm"
              onClick={() => setSignUp(!signUp)}
            >
              {signUp
                ? "Already have an account? Log In"
                : "Don't have an account? Sign Up"}
            </Button>
          </CardFooter>
        </Card>
      </BackgroundGradient>
    </section>
  );
};

export default Login;
