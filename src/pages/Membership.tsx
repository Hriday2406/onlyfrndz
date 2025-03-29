import Errors from "@/components/Errors Box";
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
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const CustomCard: React.FC<{
  isMember: boolean;
  setIsMember: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ isMember, setIsMember }) => {
  const [membershipPassword, setMembershipPassword] = useState("");
  const [error, setError] = useState<string[]>([]);

  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleMembership = async () => {
    if (membershipPassword === "")
      return setError(["Please enter the password"]);
    try {
      const response = await axios.put(
        "http://localhost:3000/api/user/membership",
        {
          membershipPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("Authorization")}`,
          },
        },
      );
      if (response.data.status === 200) {
        setMembershipPassword("");
        setError([]);
        setIsMember(true);
      } else {
        setError([]);
        if (response.data.errors) {
          let errorsArr: string[] = [];
          response.data.errors.forEach((error: any) =>
            errorsArr.push(error.msg),
          );
          setError((prevErrors) => [...prevErrors, ...errorsArr]);
          setMembershipPassword("");
          if (inputRef.current) inputRef.current.focus();
        } else {
          setError([response.data.message]);
          setMembershipPassword("");
          if (inputRef.current) inputRef.current.focus();
        }
      }
    } catch (error: any) {
      setError([error]);
      setMembershipPassword("");
      if (inputRef.current) inputRef.current.focus();
      console.log(error);
    }
  };

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
    const fetchMembershipStatus = async () => {
      const response = await axios.get(
        "http://localhost:3000/api/user/membership",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("Authorization")}`,
          },
        },
      );
      if (response.data.status === 200) {
        setIsMember(response.data.membershipStatus);
      }
    };
    fetchMembershipStatus();
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
        {error.length != 0 && <Errors errors={error} />}

        {!isMember && (
          <Input
            type="password"
            placeholder="Shhhhhhhhh"
            ref={inputRef}
            value={membershipPassword}
            onChange={(e) => setMembershipPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleMembership()}
          />
        )}
        <Button
          className="mt-3 cursor-pointer"
          onClick={() => {
            isMember ? navigate("/") : handleMembership();
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
