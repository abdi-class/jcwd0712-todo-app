"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useRef } from "react";

const SigninPage = () => {
  const inputEmailRef = useRef<HTMLInputElement>(null);
  const inputPasswordRef = useRef<HTMLInputElement>(null);

  const onSignin = async () => {
    try {
      const result = await axios.get(
        "https://amiableday-us.backendless.app/api/data/accounts",
        {
          params: {
            where: `'email'='${inputEmailRef.current?.value}' AND 'password'='${inputPasswordRef.current?.value}'`,
          },
        }
      );

      alert(`Selamat datang ${result.data[0].email}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-64 m-auto my-40 p-5 border shadow rounded-lg">
      <h1 className="text-3xl">Signin</h1>
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
      <Button type="button" onClick={onSignin} className="w-full">
        Submit
      </Button>
    </div>
  );
};

export default SigninPage;
