import Errors from "@/components/Errors Box";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState<string[]>([]);

  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAdminLogin = async () => {
    if (username === "" || password === "")
      return setError(["Please enter all the details"]);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/admin",
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
  };

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  return (
    <section className="flex h-screen items-center justify-center">
      <BackgroundBeams />
      <BackgroundGradient>
        <Card className="bg-background relative w-[300px] rounded-[20px] sm:w-[400px]">
          <CardHeader>
            <CardTitle className="font-display text-center text-4xl font-bold">
              Admin Log In
            </CardTitle>
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
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAdminLogin()}
            />
            <Button className="mt-3 cursor-pointer" onClick={handleAdminLogin}>
              Log In
            </Button>
          </CardContent>
        </Card>
      </BackgroundGradient>
    </section>
  );
};

export default AdminLogin;
