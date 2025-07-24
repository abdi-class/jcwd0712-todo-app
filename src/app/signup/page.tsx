"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useRef } from "react";

const SignupPage = () => {
  const inputEmailRef = useRef<HTMLInputElement>(null);
  const inputPasswordRef = useRef<HTMLInputElement>(null);
  const inputConfirmPasswordRef = useRef<HTMLInputElement>(null);

  const onSignup = async () => {
    try {
      const result = await axios.post(
        "https://amiableday-us.backendless.app/api/data/accounts",
        {
          email: inputEmailRef.current?.value,
          password: inputPasswordRef.current?.value,
        }
      );

      alert("Registrasi berhasil");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-64 m-auto my-40 p-5 border shadow rounded-lg">
      <h1 className="text-3xl">Signup</h1>
      <div className="my-4">
        <label>Email</label>
        <Input type="email" placeholder="Type email" ref={inputEmailRef} />
      </div>
      <div className="my-4">
        <label>Password</label>
        <Input
          type="password"
          placeholder="Type password"
          ref={inputPasswordRef}
        />
      </div>
      <div className="my-4">
        <label>Confirmation Password</label>
        <Input
          type="password"
          placeholder="Type confirm password"
          ref={inputConfirmPasswordRef}
        />
      </div>
      <Button type="button" onClick={onSignup} className="w-full">
        Submit
      </Button>
    </div>
  );
};

export default SignupPage;
