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
import { useState } from "react";

const Login: React.FC = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [signUp, setSignUp] = useState(false);

  return (
    <section className="flex h-screen items-center justify-center">
      <Card className="bg-background mx-5 mt-5 w-[400px]">
        <CardHeader>
          <CardTitle className="font-display text-center text-4xl font-bold">
            {signUp ? "Sign Up" : "Log In"}
          </CardTitle>
          <CardDescription className="text-center font-mono">
            Sign up / Login to access the website
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {signUp && (
            <Input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          <Input
            type="text"
            placeholder="Username"
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
          />
          {signUp && (
            <Input
              type="password"
              placeholder="Confirm Password"
              className={` ${password === "" ? "" : password !== confirmPassword ? "border-red-500" : "border-green-500"} transition-all duration-500`}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
    </section>
  );
};

export default Login;
