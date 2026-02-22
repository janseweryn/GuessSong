import React, { useState, useRef, useEffect } from "react";
import songsData from "./songs.json";
import SearchBar from "./components/SearchBar";

// 🟢 RĘCZNIE DEFINIOWANE DAILY
const manualDaily = {
    "2026-02-21": [
    {
      title: "Revolving Door",
      artist: "Tate McRae",
      cover: "/songs/covers/so_close_to_what.jpg",
      snippet: "/songs/pop/revolving_door.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Whole Lotta Love",
      artist: "Led Zeppelin", 
      cover:  "/songs/covers/zeppelin2.jpg",
      snippet: "/songs/rock/whole_lotta.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Godzilla (feat. Juice WRLD)",
      artist: "Eminem",
      cover: "/songs/covers/musicmurder.jpg",
      snippet: "/songs/rap/godzilla.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
   "2026-02-22": [
    {
      title: "Sofia",
      artist: "Alvaro Soler",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/05/d7/e1/05d7e189-c4d5-331f-0327-da3add4bae06/16UMGIM14728.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/pop/alvaro_soler_sofia.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Ironic",
      artist: "Alanis Morissette",
      cover:  "https://is1-ssl.mzstatic.com/image/thumb/Features124/v4/5f/3b/ca/5f3bca60-024c-d4aa-d638-6d58e7e81461/mza_1406686761081396977.jpg/600x600bb.jpg",
      snippet: "/songs/rock/alanis_morissette_ironic.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "1-800-273-8255 (feat. Alessia Cara & Khalid)",
      artist: "Logic",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/84/71/13/8471139e-5f02-b603-a462-9a8a62f14af4/17UMGIM87027.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/rap/logic_1_800_273_8255_feat_alessia_cara_khalid.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
};


const LEVELS = [
  { label: "0.1s", time: 0.2, displayTime: 0.1 },
  { label: "0.5s", time: 0.5, displayTime: 0.5 },
  { label: "1s", time: 1, displayTime: 1 },
  { label: "2s", time: 2, displayTime: 2 },
  { label: "4s", time: 4, displayTime: 4 },
  { label: "8s", time: 8, displayTime: 8 },
  { label: "15s", time: 15, displayTime: 15 },
  { label: "30s", time: 30, displayTime: 30 },
];

const CATEGORY_NAMES = {
  all: "All",
  pop: "Pop",
  rock: "Rock",
  rap: "Rap",
  polish_all: "Polskie",
  polish_pop: "Polskie Pop",
  polish_rock: "Polskie Rock",
  polish_rap: "Polskie Rap",
};

const simplifyText = (text) => {
  if (!text) return "";
  return text
    .toLowerCase()
    .replace(/\s*[\(\[][^)]*[\)\]]\s*/g, "")
    .replace(/[.,/#!$%^&*;:{}=\-_`~]/g, "")
    .trim();
};

function getManualDailySongs() {
  const today = new Date();
  const polandTime = new Date(today.toLocaleString("en-US", { timeZone: "Europe/Warsaw" }));
  const dateKey = polandTime.toISOString().split("T")[0];
  return typeof manualDaily !== 'undefined' ? manualDaily[dateKey] : null;
}

// --- KOMPONENT MODALA (Wykresy) ---
function StatsModal({ stats, onClose, currentLevel }) {
  if (!stats) return null;
  const levelsOrder = ["0.1s", "0.5s", "1s", "2s", "4s", "8s", "15s", "30s", "fail"];
  const maxHits = Math.max(...Object.values(stats.distribution || {}), 1);

  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.92)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2000, padding: 20, backdropFilter: "blur(5px)" }}>
      <div style={{ background: "#1a1a1a", padding: "30px", borderRadius: "20px", width: "100%", maxWidth: "380px", textAlign: "center", border: "1px solid #333" }}>
        <h2 style={{ color: "white", marginBottom: 5, fontSize: "1.2rem" }}>GUESS DISTRIBUTION</h2>
        <p style={{ color: "#888", marginBottom: 25, fontSize: "0.85rem" }}>Total players: {stats.total}</p>
        <div style={{ textAlign: "left", marginBottom: 25 }}>
          {levelsOrder.map((lvl) => {
            const count = stats.distribution[lvl] || 0;
            const percentage = (count / maxHits) * 100;
            const isPlayerLevel = lvl === currentLevel;
            return (
              <div key={lvl} style={{ display: "flex", alignItems: "center", marginBottom: 10, gap: 12 }}>
                <div style={{ width: 35, fontSize: "0.75rem", color: isPlayerLevel ? "#4caf50" : "#888", fontWeight: isPlayerLevel ? "bold" : "normal" }}>
                  {lvl === "fail" ? "X" : lvl.replace("s", "")}
                </div>
                <div style={{ flex: 1, background: "#2a2a2a", borderRadius: 4, height: 22 }}>
                  <div style={{ 
                    width: count > 0 ? `${percentage}%` : "8%", 
                    height: "100%", 
                    background: isPlayerLevel ? "#4caf50" : "#555",
                    borderRadius: 4,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    paddingRight: 8,
                    fontSize: "0.75rem",
                    color: "white",
                    fontWeight: "bold",
                    minWidth: "22px",
                    transition: "width 0.8s ease-out"
                  }}>
                    {count}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <button onClick={onClose} style={{ background: "#4caf50", color: "white", border: "none", padding: "14px", borderRadius: 12, fontWeight: "bold", cursor: "pointer", width: "100%", fontSize: "1rem" }}>
          CONTINUE
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [mode, setMode] = useState("menu"); 
  const [category, setCategory] = useState(null);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [snippetIndex, setSnippetIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [userGuess, setUserGuess] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [isFullPlaying, setIsFullPlaying] = useState(false);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [dailySongs, setDailySongs] = useState([]);
  const [dailyIndex, setDailyIndex] = useState(0);
  const [dailyComplete, setDailyComplete] = useState(false);
  const [noDaily, setNoDaily] = useState(false);

  // STATYSTYKI
  const [stats, setStats] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const audioRef = useRef(null);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  // OPTYMALIZACJA: Wysyłamy i pobieramy jednocześnie
  const finishGame = async (song, levelLabel) => {
    try {
      // Startujemy obie operacje na raz, żeby uniknąć lagu
      const [saveRes, fetchRes] = await Promise.all([
        fetch("/.netlify/functions/save-stat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ songKey: song.snippet, title: song.title, level: levelLabel })
        }),
        fetch(`/.netlify/functions/get-stats?songKey=${encodeURIComponent(song.snippet)}`)
      ]);
      
      const data = await fetchRes.json();
      setStats(data);
      setShowModal(true);
    } catch (err) {
      console.error("❌ Błąd statystyk:", err);
    }
  };

  const clearTimers = () => {
    clearInterval(intervalRef.current);
    clearTimeout(timeoutRef.current);
  };

  const startNewSong = (songsList) => {
    const list = songsList || filteredSongs;
    if (!list || list.length === 0) return;
    const idx = Math.floor(Math.random() * list.length);
    const song = list[idx];
    setCurrentSong(song);
    setSnippetIndex(0);
    setIsCorrect(false);
    setGameOver(false);
    setIsPlaying(false);
    setWrongAnswers([]);
    setStats(null);
    setShowModal(false);
    clearTimers();
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const selectCategory = (cat) => {
    const allSongs = Array.isArray(songsData) ? songsData : songsData.songs;
    let filtered = [];
    if (cat === "all") {
      filtered = allSongs;
    } else if (cat.startsWith("polish")) {
      filtered = allSongs.filter(s => s?.categories?.some(c => c.toLowerCase().startsWith("polsk")));
      if (cat === "polish_pop") filtered = filtered.filter(s => s.categories.includes("Polskie Pop"));
      if (cat === "polish_rock") filtered = filtered.filter(s => s.categories.includes("Polskie Rock"));
      if (cat === "polish_rap") filtered = filtered.filter(s => s.categories.includes("Polskie Rap"));
    } else {
      filtered = allSongs.filter(s => s?.categories?.some(c => c.toLowerCase().includes(cat.toLowerCase())));
    }
    if (!filtered.length) return;
    setCategory(cat);
    setFilteredSongs(filtered);
    setMode("category");
    startNewSong(filtered);
  };

  const startDaily = () => {
    const todayDaily = getManualDailySongs();
    if (!todayDaily) return setNoDaily(true);
    setDailySongs(todayDaily);
    setDailyIndex(0);
    setCurrentSong(todayDaily[0]);
    setMode("daily");
    setDailyComplete(false);
    setNoDaily(false);
  };

  const playSnippet = () => {
    if (!currentSong) return;
    const level = LEVELS[snippetIndex];
    const audio = audioRef.current;
    audio.currentTime = 0;
    audio.play();
    setIsPlaying(true);
    setCurrentTime(0);
    intervalRef.current = setInterval(() => setCurrentTime(t => t + 0.1), 100);
    timeoutRef.current = setTimeout(() => stopSnippet(), level.time * 1000);
  };

  const stopSnippet = () => {
    if (audioRef.current) audioRef.current.pause();
    setIsPlaying(false);
    clearTimers();
  };

  const handleGuess = () => {
    const parts = userGuess.split(" - ");
    const simplifiedGuess = simplifyText(parts[0]);
    const simplifiedCorrect = simplifyText(currentSong.title);

    if (simplifiedGuess === simplifiedCorrect) {
      setIsCorrect(true);
      stopSnippet();
      finishGame(currentSong, LEVELS[snippetIndex].label);
    } else {
      const artistMatches = parts[1] && currentSong.artist.toLowerCase().includes(parts[1].toLowerCase().trim());
      setWrongAnswers(prev => [...prev, { title: userGuess, artistCorrect: artistMatches }]);
      skipToNext();
    }
    setUserGuess("");
  };

  const skipToNext = () => {
    stopSnippet();
    if (snippetIndex < LEVELS.length - 1) {
      setSnippetIndex(i => i + 1);
    } else {
      setGameOver(true);
      finishGame(currentSong, "fail");
    }
  };

  const giveUp = () => {
    stopSnippet();
    setGameOver(true);
    finishGame(currentSong, "fail");
  };

  const playFullSong = () => {
    audioRef.current.currentTime = 0;
    audioRef.current.play();
    setIsFullPlaying(true);
  };

  const stopFullSong = () => {
    audioRef.current.pause();
    setIsFullPlaying(false);
  };

  const nextDailySong = () => {
    if (dailyIndex < dailySongs.length - 1) {
      const next = dailyIndex + 1;
      setDailyIndex(next);
      setCurrentSong(dailySongs[next]);
      setSnippetIndex(0);
      setIsCorrect(false);
      setGameOver(false);
      setWrongAnswers([]);
      setStats(null);
      setShowModal(false);
    } else setDailyComplete(true);
  };

  const displayedTime = (() => {
    const level = LEVELS[snippetIndex];
    const scaled = currentTime * (level.displayTime / level.time);
    return scaled > level.displayTime ? level.displayTime : scaled;
  })();

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", minHeight: "100vh", color: "white", background: "#222", padding: 20 }}>
      <h1 style={{ fontSize: "2.5rem", marginBottom: 20 }}>🎵 SongGuess 🎵</h1>

      {mode === "menu" && (
        <>
          <h2>Wybierz kategorię:</h2>
          <div style={{ marginTop: 20 }}>
            <button onClick={() => selectCategory("all")} style={{ margin: 8 }}>🎧 All</button>
            <button onClick={() => selectCategory("pop")} style={{ margin: 8 }}>🎤 Pop</button>
            <button onClick={() => selectCategory("rock")} style={{ margin: 8 }}>🎸 Rock</button>
            <button onClick={() => selectCategory("rap")} style={{ margin: 8 }}>🧢 Rap</button>
            <div style={{ marginTop: 30 }}>
              <h3 style={{ color: "#aaa" }}>🇵🇱 Polskie</h3>
              <button onClick={() => selectCategory("polish_all")} style={{ margin: 8 }}>🇵🇱 🎧 Polskie</button>
              <button onClick={() => selectCategory("polish_pop")} style={{ margin: 8 }}>🇵🇱 🎤 Polski Pop</button>
              <button onClick={() => selectCategory("polish_rock")} style={{ margin: 8 }}>🇵🇱 🎸 Polski Rock</button>
              <button onClick={() => selectCategory("polish_rap")} style={{ margin: 8 }}>🇵🇱 🧢 Polski Rap</button>
            </div>
            <div style={{ marginTop: 30 }}>
              <button onClick={startDaily} style={{ background: "#8b5cf6", color: "white", padding: "10px 16px", borderRadius: 10, fontWeight: "bold", border: "none", cursor: "pointer" }}>🎯 Daily Challenge</button>
            </div>
            {noDaily && <p style={{ color: "#ff5555" }}>Brak daily na dziś 😢</p>}
          </div>
        </>
      )}

      {(mode === "category" || mode === "daily") && currentSong && (
        <>
          {dailyComplete ? (
            <div style={{ marginTop: 100, textAlign: "center" }}>
              <h2 style={{ fontSize: "2rem", marginBottom: 20 }}>✅ Daily ukończone!</h2>
              <button onClick={() => setMode("menu")} style={{ background: "#555", color: "white", padding: "10px 16px", borderRadius: 10, fontWeight: "bold", border: "none", cursor: "pointer" }}>⬅ Wróć na stronę główną</button>
            </div>
          ) : (
            <GameView 
              title={mode === "daily" ? `🎯 Daily ${dailyIndex + 1}/${dailySongs.length} — ${currentSong.dailyCategory}` : `🎵 ${CATEGORY_NAMES[category]} Mode`}
              onBack={() => { setMode("menu"); clearTimers(); }}
              {...{ currentSong, snippetIndex, displayedTime, LEVELS, audioRef, isPlaying, playSnippet, stopSnippet, skipToNext, giveUp, wrongAnswers, isCorrect, gameOver, userGuess, setUserGuess, handleGuess, isFullPlaying, playFullSong, stopFullSong, startNewSong: mode === "daily" ? nextDailySong : () => startNewSong() }}
            />
          )}
        </>
      )}

      {showModal && (
        <StatsModal 
          stats={stats} 
          currentLevel={isCorrect ? LEVELS[snippetIndex].label : "fail"} 
          onClose={() => {
            setShowModal(false);
            if (mode !== "daily") startNewSong();
          }} 
        />
      )}
    </div>
  );
}

function GameView({ title, onBack, currentSong, snippetIndex, displayedTime, LEVELS, audioRef, isPlaying, playSnippet, stopSnippet, skipToNext, giveUp, wrongAnswers, isCorrect, gameOver, userGuess, setUserGuess, handleGuess, isFullPlaying, playFullSong, stopFullSong, startNewSong }) {
  return (
    <>
      <button onClick={onBack} style={{ position: "absolute", top: 20, left: 20, background: "#555", border: "none", color: "white", padding: "6px 10px", borderRadius: 8, cursor: "pointer" }}>⬅ Wróć</button>
      <h2 style={{ marginBottom: 10, color: "#ccc" }}>{title}</h2>
      <h3>Fragment: <strong>{LEVELS[snippetIndex].label}</strong></h3>
      <p>⏱ {displayedTime.toFixed(1)}s / {LEVELS[snippetIndex].displayTime}s</p>
      
      <audio ref={audioRef} src={currentSong.snippet} />

      {!isCorrect && !gameOver ? (
        <>
          <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginBottom: 35 }}>
            <button onClick={isPlaying ? stopSnippet : playSnippet} style={{ background: "#333", color: "white", border: "none", padding: "10px 25px", borderRadius: 10, cursor: "pointer" }}>{isPlaying ? "⏹ Stop" : "▶️ Play"}</button>
            <button onClick={skipToNext} style={{ background: "#333", color: "white", border: "none", padding: "10px 25px", borderRadius: 10, cursor: "pointer" }}>⏭ Skip</button>
          </div>
          <div className="search-section">
            <SearchBar onSelectSong={(t, a) => setUserGuess(`${t} - ${a}`)} />
            <button onClick={handleGuess} style={{ background: "#4caf50", color: "white", padding: "16px 0", borderRadius: 14, border: "none", fontWeight: "bold", cursor: "pointer", fontSize: "1.2rem", width: "100%", marginTop: 5 }}>Submit</button>
          </div>
          <div style={{ marginTop: 25 }}>
            {wrongAnswers.map((ans, i) => (
              <div key={i} style={{ marginTop: 8, borderRadius: 8, padding: "8px 15px", border: "1px solid #444", backgroundColor: ans.artistCorrect ? "#ffd54f" : "#ef5350", color: "black", display: "inline-block", minWidth: "250px" }}>❌ {ans.title}</div>
            ))}
          </div>
          {snippetIndex === LEVELS.length - 1 && (
            <div style={{ marginTop: 20 }}>
              <button onClick={giveUp} style={{ background: "#ff5555", color: "white", border: "none", padding: "8px 15px", borderRadius: 8, cursor: "pointer" }}>Give Up</button>
            </div>
          )}
        </>
      ) : (
        <div style={{ marginTop: 16 }}>
          {isCorrect ? <h2>✅ Correct!</h2> : <h2 style={{ color: "#ff5555" }}>❌ Nie udało się</h2>}
          <p style={{ fontSize: "1.2rem" }}><strong>Tytuł:</strong> {currentSong.title}<br /><strong>Artysta:</strong> {currentSong.artist}</p>
          <img src={currentSong.cover} alt="cover" width={220} style={{ borderRadius: 15, marginTop: 15, boxShadow: "0 10px 20px rgba(0,0,0,0.5)" }} />
          <div style={{ marginTop: 20 }}>
            <button onClick={isFullPlaying ? stopFullSong : playFullSong} style={{ background: "#444", color: "white", border: "none", padding: "10px 20px", borderRadius: 10, cursor: "pointer" }}>{isFullPlaying ? "⏹ Stop Full" : "▶️ Play Full"}</button>
          </div>
          <button onClick={startNewSong} style={{ marginTop: 20, background: "#fff", color: "#000", padding: "12px 30px", borderRadius: 10, fontWeight: "bold", border: "none", cursor: "pointer" }}>Next →</button>
        </div>
      )}
    </>
  );
}