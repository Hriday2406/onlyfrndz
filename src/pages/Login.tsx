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

  // 0 -> login, 1 -> signup, 2 -> forgot
  const [signUp, setSignUp] = useState(0);
  const [error, setError] = useState<string[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const checkConfirmPassword = () => {
    if (password.length < 8 || password !== confirmPassword) return false;
    return true;
  };

  async function handleLogin() {
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
        localStorage.setItem("Authorization", `Bearer ${response.data.token}`);
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
        } else setError([response.data.message]);
        if (inputRef.current) inputRef.current.focus();
      }
    } catch (error: any) {
      setError([error]);
      setUsername("");
      if (inputRef.current) inputRef.current.focus();
      console.log(error);
    }
    setPassword("");
  }

  async function handleForgotPassword() {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/forgot",
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
        setSignUp(0);
      } else {
        setError([]);
        if (response.data.errors) {
          let errorsArr: string[] = [];
          response.data.errors.forEach((error: any) =>
            errorsArr.push(error.msg),
          );
          setError((prevErrors) => [...prevErrors, ...errorsArr]);
          setPassword("");
          setConfirmPassword("");
        } else setError([response.data.message]);
        if (inputRef.current) inputRef.current.focus();
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
  }

  async function handleSingup() {
    if (fullName === "" || email === "" || confirmPassword === "")
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
        setError([response.data.message]);
        setSignUp(0);
      } else {
        setError([]);
        if (response.data.errors) {
          let errorsArr: string[] = [];
          response.data.errors.forEach((error: { msg: string }) =>
            errorsArr.push(error.msg),
          );
          setError((prevErrors) => [...prevErrors, ...errorsArr]);
        } else setError([response.data.message]);
        if (inputRef.current) inputRef.current.focus();
      }
    } catch (error: any) {
      setError([error]);
      setFullName("");
      setUsername("");
      setEmail("");
      if (inputRef.current) inputRef.current.focus();
      console.log(error);
    }
    setPassword("");
    setConfirmPassword("");
  }

  const handleSubmit = () => {
    if (username === "" || password === "")
      return setError(["Please enter all the details"]);
    if (signUp === 1) handleSingup();
    else if (signUp === 0) handleLogin();
    else handleForgotPassword();
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
              {signUp === 1
                ? "Sign Up"
                : signUp === 2
                  ? "Forgot Password"
                  : "Log In"}
            </CardTitle>
            <CardDescription className="text-center font-mono">
              {signUp === 2
                ? "Enter your Name along with Email ID to reset your password"
                : "Sign up / Login to access the website"}
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
            {!!signUp && (
              <>
                <Input
                  type="text"
                  placeholder="Full Name"
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
              placeholder={signUp === 2 ? "New Password" : "Password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            />
            {!!signUp && (
              <Input
                type="password"
                placeholder={
                  signUp === 2 ? "Confirm New Password" : "Confirm Password"
                }
                className={` ${password === "" ? "" : checkConfirmPassword() ? "border-green-500" : "border-red-500"} transition-all duration-500`}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              />
            )}
            <Button className="mt-3 cursor-pointer" onClick={handleSubmit}>
              {signUp === 1
                ? "Sign Up"
                : signUp === 2
                  ? "Forgot Password"
                  : "Log In"}
            </Button>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            {!signUp && (
              <Button
                variant="link"
                className="mx-auto w-full cursor-pointer"
                size="sm"
                onClick={() => setSignUp(2)}
              >
                Forgot Password?
              </Button>
            )}
            <Button
              variant="link"
              className="mx-auto w-full cursor-pointer"
              size="sm"
              onClick={() =>
                setSignUp((prev) => {
                  if (prev === 0) return 1;
                  else return 0;
                })
              }
            >
              {signUp === 0
                ? "Don't have an account? Sign Up"
                : signUp === 2
                  ? "Still remember your password? Log In"
                  : "Already have an account? Log In"}
            </Button>
          </CardFooter>
        </Card>
      </BackgroundGradient>
    </section>
  );
};

export default Login;
