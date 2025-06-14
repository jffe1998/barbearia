"use client";

import { useState } from "react";

export default function Login() {
  const [tela, setTela] = useState("cadastro-estabelecimento");

  const [estabelecimento, setEstabelecimento] = useState({
    nomeFantasia: "",
    razaoSocial: "",
    cnpj: "",
    telefone: "",
    email: "",
    cep: "",
    endereco: "",
  });

  const formatCNPJ = (value: string) =>
    value
      .replace(/\D/g, "")
      .replace(/^(\d{2})(\d)/, "$1.$2")
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2")
      .slice(0, 18);

  const formatTelefone = (value: string) =>
    value
      .replace(/\D/g, "")
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .slice(0, 15);

  const formatCep = (value: string) =>
    value
      .replace(/\D/g, "")
      .replace(/^(\d{5})(\d)/, "$1-$2")
      .slice(0, 9);

  const handleEstabelecimentoChange = (field: keyof typeof estabelecimento, formatter?: (val: string) => string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = formatter ? formatter(e.target.value) : e.target.value;
    setEstabelecimento((prev) => ({ ...prev, [field]: value }));
  };

  const buscarEnderecoPorCep = async () => {
    const cep = estabelecimento.cep.replace(/\D/g, "");
    if (cep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        if (!data.erro) {
          setEstabelecimento((prev) => ({
            ...prev,
            endereco: `${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`,
          }));
        }
      } catch (error) {
        console.error("Erro ao buscar endereço:", error);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Estabelecimento cadastrado com sucesso!");
    setTela("principal");
  };

  if (tela === "principal") {
    return (
      <div className="min-h-screen bg-[rgb(243,243,243)] flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm text-center">
          <h2 className="text-2xl font-bold mb-6">Painel Principal</h2>
          <button
            className="py-2 px-4 rounded-full bg-gradient-to-r from-cyan-400 to-purple-600 text-white font-semibold"
            onClick={() => setTela("cadastro-estabelecimento")}
          >
            Cadastrar Estabelecimento
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[rgb(243,243,243)] flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm">
        <h2 className="text-center text-2xl font-bold mb-6">
          Cadastro Estabelecimento
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              value={estabelecimento.nomeFantasia}
              onChange={handleEstabelecimentoChange("nomeFantasia")}
              maxLength={50}
              placeholder="Nome Fantasia:"
              className="w-full bg-transparent focus:outline-none placeholder-gray-500"
              required
            />
            <div className="h-px bg-gray-300" />
          </div>

          <div>
            <input
              type="text"
              value={estabelecimento.razaoSocial}
              onChange={handleEstabelecimentoChange("razaoSocial")}
              maxLength={50}
              placeholder="Razão Social:"
              className="w-full bg-transparent focus:outline-none placeholder-gray-500"
              required
            />
            <div className="h-px bg-gray-300" />
          </div>

          <div>
            <input
              type="text"
              value={estabelecimento.cnpj}
              onChange={handleEstabelecimentoChange("cnpj", formatCNPJ)}
              placeholder="CNPJ:"
              className="w-full bg-transparent focus:outline-none placeholder-gray-500"
              required
            />
            <div className="h-px bg-gray-300" />
          </div>

          <div>
            <input
              type="tel"
              value={estabelecimento.telefone}
              onChange={handleEstabelecimentoChange("telefone", formatTelefone)}
              placeholder="Telefone:"
              className="w-full bg-transparent focus:outline-none placeholder-gray-500"
              required
            />
            <div className="h-px bg-gray-300" />
          </div>

          <div>
            <input
              type="email"
              value={estabelecimento.email}
              onChange={handleEstabelecimentoChange("email")}
              maxLength={150}
              placeholder="E-mail:"
              className="w-full bg-transparent focus:outline-none placeholder-gray-500"
              required
            />
            <div className="h-px bg-gray-300" />
          </div>

          <div>
            <input
              type="text"
              value={estabelecimento.cep}
              onChange={handleEstabelecimentoChange("cep", formatCep)}
              onBlur={buscarEnderecoPorCep}
              placeholder="CEP:"
              className="w-full bg-transparent focus:outline-none placeholder-gray-500"
              required
            />
            <div className="h-px bg-gray-300" />
          </div>

          <div>
            <input
              type="text"
              value={estabelecimento.endereco}
              readOnly
              placeholder="Endereço"
              className="w-full bg-transparent focus:outline-none placeholder-gray-500"
            />
            <div className="h-px bg-gray-300" />
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-4 rounded-full bg-gradient-to-r from-cyan-400 to-purple-600 text-white font-semibold"
          >
            Cadastrar Estabelecimento
          </button>
        </form>
      </div>
    </div>
  );
}
