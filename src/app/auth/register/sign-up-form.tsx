import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function SignUpForm() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <div className="flex justify-center">
          <FlagIcon />
        </div>
        <h2 className="mt-4 text-center text-2xl font-bold text-gray-900">
          Crea una cuenta
        </h2>
        <form className="mt-8 space-y-6">
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <Input
              className="mt-1"
              id="email"
              placeholder="name@email.com"
              type="email"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="password"
            >
              Contraseña
            </label>
            <Input
              className="mt-1"
              id="password"
              placeholder="••••••••"
              type="password"
            />
          </div>

          <Button className="w-full">Continuar</Button>

          <p className="mt-4 text-center text-sm text-gray-600">
            <Link
              className="font-medium text-blue-600 hover:text-blue-500"
              href="/auth/login"
            >
              Iniciar sesión
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

function FlagIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="60"
      height="60"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#e71e63"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 21h10" />
      <rect width="20" height="14" x="2" y="3" rx="2" />
    </svg>
  );
}
