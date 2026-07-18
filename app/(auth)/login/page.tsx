"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Zap, Loader2 } from "lucide-react";
import { FaGoogle } from "react-icons/fa";
import { useLogin } from "@/hooks/useAuth";
import axios from "axios";

const DEMO_CREDENTIALS = {
  email: "demo@diagramcraft.ai",
  password: "Demo@123",
} as const;

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { mutate: login, isPending } = useLogin();
  const [loginError, setLoginError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    setLoginError(null);
    login(data, {
      onSuccess: () => {
        router.push("/dashboard");
      },
      onError: (error: Error) => {
        if (axios.isAxiosError(error)) {
          setLoginError(
            error.response?.data?.message || "Failed to login. Please check your credentials."
          );
        } else {
          setLoginError(error.message || "An unexpected error occurred.");
        }
      },
    });
  };

  const handleDemoLogin = async () => {
    setLoginError(null);
    
    // Directly call the mutation without form validation
    login(
      { email: "demo@diagramcraft.ai", password: "Demo@123" },
      {
        onSuccess: () => {
          router.push("/dashboard");
        },
        onError: (error: any) => {
          const message =
            error?.response?.data?.message ||
            error?.message ||
            "Failed to login with demo account. Please try again.";
          setLoginError(message);
        },
      }
    );
  };

  const handleGoogleLogin = () => {
    setLoginError("Google login is not available yet.");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-md p-8">
        <div className="flex flex-col items-center mb-8">
          <Link href="/" className="bg-indigo-100 p-3 rounded-full mb-4 hover:bg-indigo-200 transition-colors">
            <Zap className="w-8 h-8 text-indigo-600" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
          <p className="text-gray-500 mt-2 text-center">
            Sign in to your account to continue
          </p>
        </div>

        {loginError && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100">
            {loginError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              {...register("email")}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            />
            {errors.email && (
              <p className="mt-1.5 text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              {...register("password")}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            />
            {errors.password && (
              <p className="mt-1.5 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-2.5 font-medium transition-colors flex justify-center items-center disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isPending ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <div className="mt-6 flex flex-col gap-3">
          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink-0 mx-4 text-gray-400 text-sm">Or</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          <button
            type="button"
            onClick={handleDemoLogin}
            className="w-full border border-indigo-200 text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-xl py-2.5 font-medium transition-colors flex justify-center items-center gap-2 disabled:opacity-70"
          >
            Demo Login (Auto Fill)
          </button>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 rounded-xl py-2.5 font-medium transition-colors flex justify-center items-center gap-2"
          >
            <FaGoogle className="text-red-500" />
            Continue with Google
          </button>
        </div>

        <div className="mt-8 text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-indigo-600 hover:text-indigo-700 hover:underline"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
