"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginV4() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erro, setErro] = useState("");
  const [mensagem, setMensagem] = useState("");
  const router = useRouter();

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
    setMensagem("Login efetuado com sucesso!");
    setTimeout(() => router.push("/dashboard"), 1000);
  };

  const handleGoogleLogin = () => {
    alert("Login com Google ainda não implementado.");
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/background-login.jpg')" }}
    >
      <div className="bg-white bg-opacity-90 shadow-2xl p-10 rounded-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6 font-sans">
          Bem-vindo!
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <input
              type="email"
              maxLength={120}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail:"
              aria-label="Email"
              className="w-full border-b border-gray-300 bg-transparent py-2 placeholder-gray-500 focus:outline-none focus:border-purple-600 transition"
            />
          </div>

          <div className="relative">
            <input
              type={mostrarSenha ? "text" : "password"}
              maxLength={20}
              value={senha}
              onChange={(e) => {
                console.log("Senha digitada:", e.target.value);
                setSenha(e.target.value);
              }}
              placeholder="Senha:"
              aria-label="Senha"
              className="w-full border-b border-gray-300 bg-transparent py-2 pr-10 placeholder-gray-500 focus:outline-none focus:border-purple-600 transition"
            />
            <button
              type="button"
              onClick={() => setMostrarSenha((prev) => !prev)}
              className="absolute right-0 top-2 text-gray-500"
              aria-label="Toggle password visibility"
            >
              {mostrarSenha ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {erro && <p className="text-xs text-red-500">{erro}</p>}
          {mensagem && <p className="text-xs text-green-600">{mensagem}</p>}

          <button
            type="submit"
            className="w-full py-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold shadow-md hover:shadow-lg transition"
          >
            Entrar
          </button>


          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full py-2 border border-gray-300 rounded-full text-gray-700 bg-white hover:bg-gray-100 font-medium flex items-center justify-center gap-2"
          >
            <img src="https://agenciapnz.com/wp-content/uploads/Logo-Google-G.png" alt="Google" className="w-5 h-5" />
            Entrar com Google
          </button>
        </form>

        <div className="text-center text-xs text-gray-600 mt-4">
          <Link href="/recuperar-senha" className="text-purple-600 hover:underline">
           Esqueceu sua senha?
          </Link>
        </div>

        <div className="text-center text-xs text-gray-600 mt-2">
          Ainda não possui uma conta?{' '}
          <Link href="/estabelecimento" className="text-purple-600 hover:underline">
            Cadastre-se
          </Link>
        </div>
      </div>
    </div>
  );
}