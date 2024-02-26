import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function SignInForm() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <div className="flex justify-center">
          <FlagIcon />
        </div>
        <h2 className="mt-4 text-center text-2xl font-bold text-gray-900">
          Iniciar sesión
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
              href="/auth/register"
            >
              Registrarse
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
      <path d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1" />
      <polygon points="12 15 17 21 7 21 12 15" />
    </svg>
  );
}
