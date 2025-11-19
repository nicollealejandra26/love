"use client";

import React, { useState, useEffect } from 'react';
import { BookOpen, Target, Sparkles, Trash2, Edit, Check, Plus, Heart, Star, Sun, Cloud, Moon } from 'lucide-react';

export default function GlowJournal() {
  type Entry = { id: number; text: string; mood: string; date: string };
  type Goal = { id: number; text: string; category: string; completed: boolean; progress: number; createdAt: string };
  type Affirmation = { id: number; text: string };

  const [activeTab, setActiveTab] = useState<'diary' | 'goals' | 'affirmations'>('diary');

  // Diary State
  const [entries, setEntries] = useState<Entry[]>([]);
  const [newEntry, setNewEntry] = useState<string>('');
  const [selectedMood, setSelectedMood] = useState<string>('');
  const [editingEntry, setEditingEntry] = useState<number | null>(null);

  // Goals State
  const [goals, setGoals] = useState<Goal[]>([]);
  const [newGoal, setNewGoal] = useState<string>('');
  const [goalCategory, setGoalCategory] = useState<string>('personal');

  // Affirmations State
  const [affirmations, setAffirmations] = useState<Affirmation[]>([]);
  const [newAffirmation, setNewAffirmation] = useState<string>('');
  const [dailyAffirmation, setDailyAffirmation] = useState<Affirmation | null>(null);

  const moods = [
    { emoji: '😊', name: 'Feliz', color: 'bg-yellow-200' },
    { emoji: '💖', name: 'Enamorada', color: 'bg-pink-200' },
    { emoji: '😌', name: 'Tranquila', color: 'bg-blue-200' },
    { emoji: '😔', name: 'Triste', color: 'bg-gray-200' },
    { emoji: '😤', name: 'Enojada', color: 'bg-red-200' },
    { emoji: '✨', name: 'Motivada', color: 'bg-purple-200' }
  ];

  const categories = [
    { id: 'personal', name: 'Personal', icon: Heart, color: 'pink' },
    { id: 'estudio', name: 'Estudio', icon: BookOpen, color: 'purple' },
    { id: 'salud', name: 'Salud', icon: Star, color: 'blue' },
    { id: 'otros', name: 'Otros', icon: Sparkles, color: 'indigo' }
  ];

  // Load data from localStorage
  useEffect(() => {
    const savedEntries = localStorage.getItem('glowJournalEntries');
    const savedGoals = localStorage.getItem('glowJournalGoals');
    const savedAffirmations = localStorage.getItem('glowJournalAffirmations');
    
    if (savedEntries) setEntries(JSON.parse(savedEntries));
    if (savedGoals) setGoals(JSON.parse(savedGoals));
    if (savedAffirmations) setAffirmations(JSON.parse(savedAffirmations));
  }, []);

  // Diary Functions
  const addEntry = () => {
    if (!newEntry.trim() || !selectedMood) return;
    
    const entry = {
      id: Date.now(),
      text: newEntry,
      mood: selectedMood,
      date: new Date().toLocaleDateString('es-ES', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    };
    
    const updatedEntries = [entry, ...entries];
    setEntries(updatedEntries);
    localStorage.setItem('glowJournalEntries', JSON.stringify(updatedEntries));
    setNewEntry('');
    setSelectedMood('');
  };

  const deleteEntry = (id: number) => {
    const updatedEntries = entries.filter(e => e.id !== id);
    setEntries(updatedEntries);
    localStorage.setItem('glowJournalEntries', JSON.stringify(updatedEntries));
  };

  const updateEntry = (id: number, newText: string) => {
    const updatedEntries = entries.map(e =>
      e.id === id ? { ...e, text: newText } : e
    );
    setEntries(updatedEntries);
    localStorage.setItem('glowJournalEntries', JSON.stringify(updatedEntries));
    setEditingEntry(null);
  };

  // Goals Functions
  const addGoal = () => {
    if (!newGoal.trim()) return;
    
    const goal = {
      id: Date.now(),
      text: newGoal,
      category: goalCategory,
      completed: false,
      progress: 0,
      createdAt: new Date().toLocaleDateString('es-ES')
    };
    
    const updatedGoals = [...goals, goal];
    setGoals(updatedGoals);
    localStorage.setItem('glowJournalGoals', JSON.stringify(updatedGoals));
    setNewGoal('');
  };

  const updateGoalProgress = (id: number, progress: number) => {
    const updatedGoals = goals.map(g =>
      g.id === id ? { ...g, progress, completed: progress === 100 } : g
    );
    setGoals(updatedGoals);
    localStorage.setItem('glowJournalGoals', JSON.stringify(updatedGoals));
  };

  const deleteGoal = (id: number) => {
    const updatedGoals = goals.filter(g => g.id !== id);
    setGoals(updatedGoals);
    localStorage.setItem('glowJournalGoals', JSON.stringify(updatedGoals));
  };

  // Affirmations Functions
  const addAffirmation = () => {
    if (!newAffirmation.trim()) return;
    
    const affirmation = {
      id: Date.now(),
      text: newAffirmation
    };
    
    const updatedAffirmations = [...affirmations, affirmation];
    setAffirmations(updatedAffirmations);
    localStorage.setItem('glowJournalAffirmations', JSON.stringify(updatedAffirmations));
    setNewAffirmation('');
  };

  const deleteAffirmation = (id: number) => {
    const updatedAffirmations = affirmations.filter(a => a.id !== id);
    setAffirmations(updatedAffirmations);
    localStorage.setItem('glowJournalAffirmations', JSON.stringify(updatedAffirmations));
  };

  const selectDailyAffirmation = () => {
    if (affirmations.length === 0) return;
    const random = affirmations[Math.floor(Math.random() * affirmations.length)];
    setDailyAffirmation(random);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-500 text-white p-6 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center flex items-center justify-center gap-2">
            <Sparkles className="animate-pulse" />
            Glow Journal
            <Sparkles className="animate-pulse" />
          </h1>
          <p className="text-center mt-2 text-pink-100">Tu espacio personal para brillar ✨</p>
        </div>
      </div>

      {/* Navigation */}
      <div className="max-w-4xl mx-auto mt-6 px-4">
        <div className="flex gap-2 bg-white/60 backdrop-blur-sm p-2 rounded-2xl shadow-lg">
          <button
            onClick={() => setActiveTab('diary')}
            className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'diary'
                ? 'bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-md'
                : 'text-gray-600 hover:bg-pink-100'
            }`}
          >
            <BookOpen size={20} />
            Mi Diario
          </button>
          <button
            onClick={() => setActiveTab('goals')}
            className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'goals'
                ? 'bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-md'
                : 'text-gray-600 hover:bg-pink-100'
            }`}
          >
            <Target size={20} />
            Metas
          </button>
          <button
            onClick={() => setActiveTab('affirmations')}
            className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'affirmations'
                ? 'bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-md'
                : 'text-gray-600 hover:bg-pink-100'
            }`}
          >
            <Sparkles size={20} />
            Afirmaciones
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto mt-6 px-4 pb-8">
        {/* Diary Tab */}
        {activeTab === 'diary' && (
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-purple-600 mb-2">📝 Mi Diario Personal</h2>
              <p className="text-gray-600">Escribe cómo te sientes hoy</p>
            </div>

            {/* New Entry Form */}
            <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-6 rounded-2xl mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                ¿Cómo te sientes? 💭
              </label>
              <div className="flex gap-2 mb-4 flex-wrap">
                {moods.map((mood) => (
                  <button
                    key={mood.name}
                    onClick={() => setSelectedMood(mood.name)}
                    className={`px-4 py-2 rounded-xl font-medium transition-all ${
                      selectedMood === mood.name
                        ? mood.color + ' scale-110 shadow-lg'
                        : 'bg-white hover:scale-105'
                    }`}
                  >
                    {mood.emoji} {mood.name}
                  </button>
                ))}
              </div>

              <textarea
                value={newEntry}
                onChange={(e) => setNewEntry(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-pink-300 focus:border-purple-400 focus:outline-none bg-white resize-none"
                placeholder="Escribe lo que sientes, tus pensamientos del día..."
                rows={4}
              />

              <button
                onClick={addEntry}
                disabled={!newEntry.trim() || !selectedMood}
                className="w-full mt-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Plus size={20} />
                Guardar Entrada
              </button>
            </div>

            {/* Entries List */}
            <div className="space-y-4">
              {entries.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <BookOpen size={48} className="mx-auto mb-4 opacity-50" />
                  <p>No hay entradas aún. ¡Comienza a escribir!</p>
                </div>
              ) : (
                entries.map((entry) => (
                  <div key={entry.id} className="bg-white p-5 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <span className="text-2xl">{moods.find(m => m.name === entry.mood)?.emoji}</span>
                        <span className="ml-2 text-sm text-gray-500">{entry.date}</span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditingEntry(entry.id)}
                          className="text-purple-500 hover:text-purple-700"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => deleteEntry(entry.id)}
                          className="text-red-400 hover:text-red-600"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                    
                    {editingEntry === entry.id ? (
                      <div className="flex gap-2">
                        <textarea
                          defaultValue={entry.text}
                          className="flex-1 px-3 py-2 rounded-lg border-2 border-purple-300 focus:outline-none resize-none"
                          rows={3}
                          id={`edit-${entry.id}`}
                        />
                        <button
                          onClick={() => {
                            const el = document.getElementById(`edit-${entry.id}`) as HTMLTextAreaElement | null;
                            const newText = el ? el.value : '';
                            updateEntry(entry.id, newText);
                          }}
                          className="bg-purple-500 text-white px-4 rounded-lg hover:bg-purple-600"
                        >
                          <Check size={20} />
                        </button>
                      </div>
                    ) : (
                      <p className="text-gray-700 leading-relaxed">{entry.text}</p>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Goals Tab */}
        {activeTab === 'goals' && (
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-purple-600 mb-2">🎯 Mis Metas & Sueños</h2>
              <p className="text-gray-600">Visualiza y alcanza tus objetivos</p>
            </div>

            {/* New Goal Form */}
            <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-6 rounded-2xl mb-6">
              <div className="flex gap-2 mb-4 flex-wrap">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setGoalCategory(cat.id)}
                      className={`px-4 py-2 rounded-xl font-medium transition-all flex items-center gap-2 ${
                        goalCategory === cat.id
                          ? `bg-${cat.color}-200 scale-110 shadow-lg`
                          : 'bg-white hover:scale-105'
                      }`}
                    >
                      <Icon size={16} />
                      {cat.name}
                    </button>
                  );
                })}
              </div>

              <input
                type="text"
                value={newGoal}
                onChange={(e) => setNewGoal(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-pink-300 focus:border-purple-400 focus:outline-none bg-white mb-4"
                placeholder="Escribe tu meta..."
              />

              <button
                onClick={addGoal}
                disabled={!newGoal.trim()}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Plus size={20} />
                Agregar Meta
              </button>
            </div>

            {/* Goals List */}
            <div className="space-y-4">
              {goals.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <Target size={48} className="mx-auto mb-4 opacity-50" />
                  <p>No hay metas aún. ¡Define tus objetivos!</p>
                </div>
              ) : (
                goals.map((goal) => {
                  const category = categories.find(c => c.id === goal.category) || categories[0];
                  const Icon = category.icon;
                  
                  return (
                    <div key={goal.id} className="bg-white p-5 rounded-2xl shadow-md">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-2">
                          <Icon size={20} className={`text-${category.color}-500`} />
                          <span className="text-sm font-semibold text-gray-600">{category.name}</span>
                        </div>
                        <button
                          onClick={() => deleteGoal(goal.id)}
                          className="text-red-400 hover:text-red-600"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                      
                      <p className={`text-gray-700 font-medium mb-3 ${goal.completed ? 'line-through text-gray-400' : ''}`}>
                        {goal.text}
                      </p>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>Progreso</span>
                          <span className="font-bold">{goal.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className={`h-3 rounded-full transition-all ${
                              goal.completed
                                ? 'bg-gradient-to-r from-green-400 to-emerald-500'
                                : 'bg-gradient-to-r from-pink-400 to-purple-500'
                            }`}
                            style={{ width: `${goal.progress}%` }}
                          />
                        </div>
                        
                        <div className="flex gap-2 mt-3">
                          {[0, 25, 50, 75, 100].map((value) => (
                            <button
                              key={value}
                              onClick={() => updateGoalProgress(goal.id, value)}
                              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
                                goal.progress === value
                                  ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                                  : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                              }`}
                            >
                              {value}%
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* Affirmations Tab */}
        {activeTab === 'affirmations' && (
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-purple-600 mb-2">✨ Afirmaciones Positivas</h2>
              <p className="text-gray-600">Crea y personaliza tus mantras diarios</p>
            </div>

            {/* Daily Affirmation Display */}
            {dailyAffirmation && (
              <div className="bg-gradient-to-br from-pink-100 to-purple-100 p-8 rounded-2xl mb-6 text-center animate-pulse">
                <Sparkles className="mx-auto mb-4 text-purple-500" size={32} />
                <p className="text-xl font-medium text-gray-700 leading-relaxed">
                  "{dailyAffirmation.text}"
                </p>
                <div className="flex justify-center gap-2 mt-4">
                  <Star className="text-yellow-400 fill-yellow-400" />
                  <Star className="text-yellow-400 fill-yellow-400" />
                  <Star className="text-yellow-400 fill-yellow-400" />
                </div>
              </div>
            )}

            <button
              onClick={selectDailyAffirmation}
              disabled={affirmations.length === 0}
              className="w-full mb-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Sparkles size={20} />
              Afirmación del Día
            </button>

            {/* New Affirmation Form */}
            <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-6 rounded-2xl mb-6">
              <input
                type="text"
                value={newAffirmation}
                onChange={(e) => setNewAffirmation(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-pink-300 focus:border-purple-400 focus:outline-none bg-white mb-4"
                placeholder="Ej: Soy capaz de lograr todo lo que me proponga..."
              />

              <button
                onClick={addAffirmation}
                disabled={!newAffirmation.trim()}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Plus size={20} />
                Agregar Afirmación
              </button>
            </div>

            {/* Affirmations List */}
            <div className="space-y-3">
              {affirmations.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <Sparkles size={48} className="mx-auto mb-4 opacity-50" />
                  <p>No hay afirmaciones aún. ¡Crea las tuyas!</p>
                </div>
              ) : (
                affirmations.map((affirmation) => (
                  <div key={affirmation.id} className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow flex justify-between items-center">
                    <p className="text-gray-700 flex-1">"{affirmation.text}"</p>
                    <button
                      onClick={() => deleteAffirmation(affirmation.id)}
                      className="text-red-400 hover:text-red-600 ml-4"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="text-center pb-6 text-gray-600">
        <p className="text-sm"></p>
      </div>
    </div>
  );
}