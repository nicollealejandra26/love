"use client";

import React, { useState } from "react";
import { Heart, Sparkles, MessageCircle, Trophy, RefreshCw } from "lucide-react";

type Card = { id: number; emoji: string; flipped: boolean };

export default function LoveMatcherApp() {
  const [activeTab, setActiveTab] = useState<"game" | "calculator" | "messages">("game");
  const [cards, setCards] = useState<Card[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [moves, setMoves] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [gameStarted, setGameStarted] = useState<boolean>(false);

  const [name1, setName1] = useState<string>("");
  const [name2, setName2] = useState<string>("");
  const [loveScore, setLoveScore] = useState<number | null>(null);

  const [generatedMessage, setGeneratedMessage] = useState<string>("");

  const emojis = ["💖", "💕", "💗", "💝", "💘", "💓", "💞", "🌸"];

  const loveMessages = [
    "Eres la razón por la que sonrío cada día ✨",
    "Contigo, cada momento es mágico 💫",
    "Mi corazón late más fuerte cuando estás cerca 💗",
    "Eres mi persona favorita en todo el universo 🌟",
    "Gracias por llenar mi vida de color 🌈",
    "Eres el sueño que nunca quiero despertar 💭",
    "Tu sonrisa ilumina mi mundo entero ☀️",
    "Cada día contigo es una nueva aventura 🦋",
    "Eres mi felicidad en forma de persona 💖",
    "Mi lugar favorito es a tu lado 🌸",
  ];

  const initializeGame = () => {
    const shuffledEmojis: Card[] = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({ id: index, emoji, flipped: false }));

    setCards(shuffledEmojis);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setScore(0);
    setGameStarted(true);
  };

  const handleCardClick = (id: number) => {
    if (flipped.length === 2 || flipped.includes(id) || matched.includes(id)) return;

    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [first, second] = newFlipped;

      if (!cards[first] || !cards[second]) return;

      if (cards[first].emoji === cards[second].emoji) {
        const newMatched = [...matched, first, second];
        setMatched(newMatched);
        setScore((s) => s + 10);
        setFlipped([]);

        if (newMatched.length === cards.length) {
          setTimeout(() => {
            alert(`¡Felicidades! 🎉 Completaste el juego en ${moves + 1} movimientos con ${score + 10} puntos!`);
          }, 500);
        }
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  const calculateLove = () => {
    if (!name1 || !name2) return;

    const combined = (name1 + name2).toLowerCase();
    let total = 0;
    for (let char of combined) {
      total += char.charCodeAt(0);
    }
    const percentage = total % 101;
    setLoveScore(percentage);
  };

  const generateMessage = () => {
    const randomMessage = loveMessages[Math.floor(Math.random() * loveMessages.length)];
    setGeneratedMessage(randomMessage);
  };

  const getLoveLevel = (s: number) => {
    if (s >= 80) return { text: "¡Amor Verdadero! 💖", color: "text-pink-500" };
    if (s >= 60) return { text: "¡Gran Conexión! 💕", color: "text-purple-500" };
    if (s >= 40) return { text: "Buena Compatibilidad 💗", color: "text-pink-400" };
    return { text: "Amistad Especial 💝", color: "text-purple-400" };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-pink-200">
      <div className="bg-gradient-to-r from-pink-400 via-purple-400 to-pink-500 text-white p-6 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center flex items-center justify-center gap-2">
            <Heart className="animate-pulse" />
            Love Matcher
            <Sparkles className="animate-pulse" />
          </h1>
          <p className="text-center mt-2 text-pink-100">Tu app de amor más cute ✨</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto mt-6 px-4">
        <div className="flex gap-2 bg-white/60 backdrop-blur-sm p-2 rounded-2xl shadow-lg">
          <button
            onClick={() => setActiveTab("game")}
            className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
              activeTab === "game"
                ? "bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-md"
                : "text-gray-600 hover:bg-pink-100"
            }`}
          >
            🎮 Juego
          </button>
          <button
            onClick={() => setActiveTab("calculator")}
            className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
              activeTab === "calculator"
                ? "bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-md"
                : "text-gray-600 hover:bg-pink-100"
            }`}
          >
            💕 Amor
          </button>
          <button
            onClick={() => setActiveTab("messages")}
            className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
              activeTab === "messages"
                ? "bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-md"
                : "text-gray-600 hover:bg-pink-100"
            }`}
          >
            ✨ Mensajes
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto mt-6 px-4 pb-8">
        {activeTab === "game" && (
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-purple-600 mb-2">🎴 Juego de Parejas</h2>
              <p className="text-gray-600">¡Encuentra todas las parejas!</p>
            </div>

            {!gameStarted ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">💝</div>
                <button
                  onClick={initializeGame}
                  className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                >
                  Iniciar Juego ✨
                </button>
              </div>
            ) : (
              <>
                <div className="flex justify-around mb-6 bg-gradient-to-r from-pink-200 to-purple-200 p-4 rounded-2xl">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{moves}</div>
                    <div className="text-sm text-gray-600">Movimientos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-pink-600 flex items-center justify-center gap-1">
                      <Trophy size={20} />
                      {score}
                    </div>
                    <div className="text-sm text-gray-600">Puntos</div>
                  </div>
                  <button
                    onClick={initializeGame}
                    className="bg-white px-4 py-2 rounded-xl shadow hover:shadow-md transition-all"
                  >
                    <RefreshCw size={20} className="text-purple-500" />
                  </button>
                </div>

                <div className="grid grid-cols-4 gap-3">
                  {cards.map((card) => (
                    <button
                      key={card.id}
                      onClick={() => handleCardClick(card.id)}
                      className={`aspect-square rounded-2xl text-4xl flex items-center justify-center transition-all transform ${
                        flipped.includes(card.id) || matched.includes(card.id)
                          ? "bg-gradient-to-br from-pink-300 to-purple-300 scale-100"
                          : "bg-gradient-to-br from-pink-400 to-purple-400 hover:scale-105"
                      } shadow-lg hover:shadow-xl`}
                      disabled={matched.includes(card.id)}
                    >
                      {flipped.includes(card.id) || matched.includes(card.id) ? (
                        <span className="animate-bounce">{card.emoji}</span>
                      ) : (
                        <Heart className="text-white" size={32} />
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {activeTab === "calculator" && (
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-purple-600 mb-2">💕 Calculadora de Amor</h2>
              <p className="text-gray-600">¿Qué tan compatibles son?</p>
            </div>

            <div className="space-y-4 max-w-md mx-auto">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Primer nombre 💝</label>
                <input
                  type="text"
                  value={name1}
                  onChange={(e) => setName1(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-pink-300 focus:border-purple-400 focus:outline-none bg-pink-50"
                  placeholder="Tu nombre..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Segundo nombre 💖</label>
                <input
                  type="text"
                  value={name2}
                  onChange={(e) => setName2(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-pink-300 focus:border-purple-400 focus:outline-none bg-pink-50"
                  placeholder="Su nombre..."
                />
              </div>

              <button
                onClick={calculateLove}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
              >
                Calcular Amor ✨
              </button>

              {loveScore !== null && (
                <div className="mt-6 bg-gradient-to-br from-pink-100 to-purple-100 p-6 rounded-2xl text-center animate-pulse">
                  <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-2">{loveScore}%</div>
                  <div className={`text-xl font-bold ${getLoveLevel(loveScore as number).color} mb-2`}>
                    {getLoveLevel(loveScore as number).text}
                  </div>
                  <div className="flex justify-center gap-1 mt-4">
                    {[...Array(5)].map((_, i) => (
                      <Heart
                        key={i}
                        size={24}
                        className={i < (loveScore as number) / 20 ? "fill-pink-500 text-pink-500" : "text-gray-300"}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "messages" && (
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-purple-600 mb-2">✨ Mensajes Cute</h2>
              <p className="text-gray-600">Genera mensajes románticos</p>
            </div>

            <div className="max-w-md mx-auto">
              <button
                onClick={generateMessage}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle /> Generar Mensaje Romántico
              </button>

              {generatedMessage && (
                <div className="mt-6 bg-gradient-to-br from-pink-100 to-purple-100 p-6 rounded-2xl animate-pulse">
                  <div className="text-center mb-4">
                    <Sparkles className="inline-block text-purple-500 animate-bounce" />
                  </div>
                  <p className="text-lg text-gray-700 text-center font-medium leading-relaxed">{generatedMessage}</p>
                  <div className="flex justify-center gap-2 mt-4">
                    <Heart className="text-pink-500 animate-pulse" />
                    <Heart className="text-purple-500 animate-pulse" style={{ animationDelay: "0.2s" }} />
                    <Heart className="text-pink-500 animate-pulse" style={{ animationDelay: "0.4s" }} />
                  </div>
                </div>
              )}

              <div className="mt-8 bg-pink-50 p-4 rounded-xl">
                <h3 className="font-bold text-purple-600 mb-3 text-center">💌 Mensajes Guardados</h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {loveMessages.slice(0, 5).map((msg, i) => (
                    <div key={i} className="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                      <p className="text-sm text-gray-700">{msg}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="text-center pb-6 text-gray-600">
        <p className="text-sm">Trabajo 1</p>
      </div>
    </div>
  );
}