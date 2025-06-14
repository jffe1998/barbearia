"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erro, setErro] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !senha) {
      setErro("Preencha todos os campos.");
      return;
    }

    if (!email.includes("@")) {
      setErro("E-mail inválido.");
      return;
    }

    setErro("");
    alert("Login efetuado!");
    // Redirecionar ou trocar de tela aqui
  };

  return (
    <div className="min-h-screen bg-[rgb(243,243,243)] flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm">
        <h2 className="text-center text-2xl font-bold mb-6">Bem-vindo!</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent focus:outline-none placeholder-gray-500"
              required
            />
            <div className="h-px bg-gray-300" />
          </div>

          <div className="relative">
            <input
              type={mostrarSenha ? "text" : "password"}
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full bg-transparent focus:outline-none placeholder-gray-500 pr-10"
              required
            />
            <div className="h-px bg-gray-300" />
            <button
              type="button"
              onClick={() => setMostrarSenha((prev) => !prev)}
              className="absolute top-1/2 right-0 transform -translate-y-1/2 text-gray-500 pr-2"
            >
              {mostrarSenha ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {erro && <p className="text-red-600 text-sm">{erro}</p>}

          <button
            type="submit"
            className="w-full py-2 rounded-full bg-gradient-to-r from-cyan-400 to-purple-600 text-white font-semibold"
          >
            Entrar
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Esqueceu a senha?{" "}
          <span className="text-blue-600 hover:underline cursor-pointer">
            Recuperar
          </span>
        </p>

        <p className="mt-2 text-center text-sm text-gray-600">
          Não tem conta?{" "}
          <span className="text-blue-600 hover:underline cursor-pointer">
            <Link href="/estabelecimento"> Se Fuder </Link>
          </span>
        </p>
      </div>
    </div>
  );
}
