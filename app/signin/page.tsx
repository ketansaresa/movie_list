'use client';
import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import BackgroundWrapper from "@/components/backgroundWrapper";
import { Button } from "@/components/button";
import { InputCheckbox } from "@/components/inputCheckbox";
import { Input } from "@/components/InputText";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const authToken = localStorage.getItem('userId');
    
    if (authToken) {
      router.push('/movies');
    }
  }, [router]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    
    try {
      const response = await fetch('http://localhost:3001/api/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        localStorage.setItem('userId', data.userId);
        router.push('/movies');
      } else {
        setError(data.message || 'Sign in failed');
      }
    } catch (error) {
      console.error('Error during sign in:', error);
      setError('An error occurred. Please try again.');
    }
  };
    
  return (
    <BackgroundWrapper>
      <div className="flex flex-col w-screen h-screen justify-center items-center">
        <p className="text-font-primary text-5xl font-semibold mb-8">Sign In</p>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-6 my-4">
          <input 
            required={true}
            type="email"
            placeholder="Email" 
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            className="bg-[#224957] border-none outline-none rounded-lg text-font-primary px-6 py-3 w-full white-placeholder"
          />
          <Input 
            placeholder="Password" 
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          />
          <InputCheckbox label="Remember me" />
          <Button text="Login" type="submit" />
        </form>
      </div>
    </BackgroundWrapper>
  );
}