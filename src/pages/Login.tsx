import Errors from "@/components/Errors Box";
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
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [signUp, setSignUp] = useState(false);
  const [error, setError] = useState<string[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const checkConfirmPassword = () => {
    if (password.length < 8 || password !== confirmPassword) return false;
    return true;
  };

  const handleSubmit = async () => {
    if (username === "" || password === "")
      return setError(["Please enter all the details"]);
    if (signUp) {
      if (fullName === "" || email === "")
        return setError(["Please enter all the details"]);
      try {
        const response = await axios.post(
          "http://localhost:3000/api/auth/signup",
          {
            fullName,
            username,
            email,
            password,
            confirmPassword,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        if (response.data.status === 200) {
          setFullName("");
          setUsername("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setError([response.data.message]);
          setSignUp(false);
        } else {
          setError([]);
          if (response.data.errors) {
            let errorsArr: string[] = [];
            response.data.errors.forEach((error: { msg: string }) =>
              errorsArr.push(error.msg),
            );
            setError((prevErrors) => [...prevErrors, ...errorsArr]);
            setPassword("");
            setConfirmPassword("");
            if (inputRef.current) inputRef.current.focus();
          } else {
            setError([response.data.message]);
            setPassword("");
            setConfirmPassword("");
            if (inputRef.current) inputRef.current.focus();
          }
        }
      } catch (error: any) {
        setError([error]);
        setFullName("");
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        if (inputRef.current) inputRef.current.focus();
        console.log(error);
      }
    } else {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/auth/login",
          {
            username,
            password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        if (response.data.status === 200) {
          localStorage.setItem(
            "Authorization",
            `Bearer ${response.data.token}`,
          );
          setUsername("");
          setPassword("");
          setError([]);
          navigate("/");
        } else {
          setError([]);
          if (response.data.errors) {
            let errorsArr: string[] = [];
            response.data.errors.forEach((error: any) =>
              errorsArr.push(error.msg),
            );
            setError((prevErrors) => [...prevErrors, ...errorsArr]);
            setPassword("");
            if (inputRef.current) inputRef.current.focus();
          } else {
            setError([response.data.message]);
            setPassword("");
            if (inputRef.current) inputRef.current.focus();
          }
        }
      } catch (error: any) {
        setError([error]);
        setUsername("");
        setPassword("");
        if (inputRef.current) inputRef.current.focus();
        console.log(error);
      }
    }
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
            {error.length != 0 && <Errors errors={error} />}

            <Input
              type="text"
              placeholder="Username"
              ref={inputRef}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {signUp && (
              <>
                <Input
                  type="text"
                  placeholder="Fullname"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </>
            )}

            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            />
            {signUp && (
              <Input
                type="password"
                placeholder="Confirm Password"
                className={` ${password === "" ? "" : checkConfirmPassword() ? "border-green-500" : "border-red-500"} transition-all duration-500`}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              />
            )}
            <Button className="mt-3 cursor-pointer" onClick={handleSubmit}>
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
