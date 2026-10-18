import React, { useState, useRef, useEffect } from "react";
import songsData from "./songs.json";
import SearchBar from "./components/SearchBar";
import "./App.css";

// 🟢 RĘCZNIE DEFINIOWANE DAILY
const manualDaily = {
    "2026-10-17": [
     {
      title: "Hot To Go!",
      artist: "Chappell Roan",
      cover:  "/songs/covers/princess.jpg",
      snippet: "/songs/pop/hot_go.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
   {
      title: "Back to the Old House",
      artist: "The Smiths",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/fb/73/d5/fb73d503-8e0a-c17f-7f34-ac5a566a192d/825646642847.jpg/600x600bb.jpg",
      snippet: "/songs/rock/the_smiths_back_to_the_old_house.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Black Beatles (feat. Gucci Mane)",
      artist: "Rae Sremmurd",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/22/fa/68/22fa68f2-4269-4f9d-5cda-9eca2071f0db/16UMGIM21219.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/rap/rae_sremmurd_black_beatles_feat_gucci_mane.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-10-18": [
     {
      title: "Housewife",
      artist: "Tate McRae",
      cover:  "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/2b/96/2b/2b962b77-3a04-5650-aefd-37ecfce04b03/196874840146.jpg/600x600bb.jpg",
      snippet: "/songs/pop/tate_mcrae_housewife.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
   {
      title: "Hysteria",
      artist: "Muse",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/4a/73/ab/4a73abdf-1d55-b3fe-484d-e023a507428e/5054197904233.jpg/600x600bb.jpg",
      snippet: "/songs/rock/muse_hysteria.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "We Are One (Ole Ola) [The Official 2014 FIFA World Cup Song] [feat. Jennifer Lopez & Cláudia Leitte]",
      artist: "Pitbull",
      cover: "/songs/pop/pitbull_we_are_one_ole_ola_the_official_2014_fifa_world_cup_song_feat_jennifer_lopez_cl_udia_leitte_olodum_mix.mp3",
      snippet: "https://is1-ssl.mzstatic.com/image/thumb/Music4/v4/9d/30/bd/9d30bdd8-fa07-5193-3163-804fb2ae5305/886444556958.jpg/600x600bb.jpg",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-10-19": [
     {
      title: "Don't You Worry Child (feat. John Martin)",
      artist: "Swedish House Mafia",
      cover:  "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/6a/30/7d/6a307d9d-2d13-999a-3b9c-03221087f845/15UMGIM27846.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/pop/swedish_house_mafia_don_t_you_worry_child_feat_john_martin.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
   {
      title: "Selfless",
      artist: "The Strokes",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/62/a6/ff/62a6ff2a-95c9-5302-31f4-2dcca9e40323/886448281085.jpg/600x600bb.jpg",
      snippet: "/songs/rock/the_strokes_selfless.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Hate It or Love It (feat. 50 Cent)",
      artist: "The Game",
      cover:  "https://is1-ssl.mzstatic.com/image/thumb/Music118/v4/fe/d1/3b/fed13b47-091c-a793-56ad-b2bbc677e92a/00602498641453.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/rap/the_game_hate_it_or_love_it_feat_50_cent.mp3",
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

// --- KOMPONENT WYKRESU (Zintegrowany z widokiem końca gry) ---
function GuessChart({ stats, currentLevel }) {
  if (!stats) return <div style={{ marginTop: 20, color: "#888" }}>Ładowanie statystyk...</div>;
  const levelsOrder = ["0.1s", "0.5s", "1s", "2s", "4s", "8s", "15s", "30s", "fail"];
  const maxHits = Math.max(...Object.values(stats.distribution || {}), 1);

  return (
    <div style={{ marginTop: 25, background: "#1a1a1a", padding: "20px", borderRadius: "15px", width: "100%", maxWidth: "350px", border: "1px solid #333", marginLeft: "auto", marginRight: "auto" }}>
      <p style={{ color: "#888", marginBottom: 15, fontSize: "0.8rem", fontWeight: "bold" }}>GUESS DISTRIBUTION (Total: {stats.total})</p>
      {levelsOrder.map((lvl) => {
        const count = stats.distribution[lvl] || 0;
        const percentage = (count / maxHits) * 100;
        const isPlayerLevel = lvl === currentLevel;
        return (
          <div key={lvl} style={{ display: "flex", alignItems: "center", marginBottom: 8, gap: 10 }}>
            <div style={{ width: 30, fontSize: "0.7rem", color: isPlayerLevel ? "#4caf50" : "#888", fontWeight: isPlayerLevel ? "bold" : "normal" }}>
              {lvl === "fail" ? "X" : lvl.replace("s", "")}
            </div>
            <div style={{ flex: 1, background: "#2a2a2a", borderRadius: 4, height: 18 }}>
              <div style={{ 
                width: count > 0 ? `${percentage}%` : "5%", 
                height: "100%", 
                background: isPlayerLevel ? "#4caf50" : "#555",
                borderRadius: 4,
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                paddingRight: 5,
                fontSize: "0.65rem",
                color: "white",
                minWidth: "20px",
                transition: "width 0.8s ease-out"
              }}>
                {count}
              </div>
            </div>
          </div>
        );
      })}
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
  const [stats, setStats] = useState(null);
  const [volume, setVolume] = useState(1);
  const [lastSnippetIndex, setLastSnippetIndex] = useState(-1); // ostatni próg
const [hasPlayedCurrentLevel, setHasPlayedCurrentLevel] = useState(false); // czy odtworzono już ten poziom
const [fullCurrentTime, setFullCurrentTime] = useState(0);
const [fullDuration, setFullDuration] = useState(0);

  const audioRef = useRef(null);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  const finishGame = async (song, levelLabel) => {
    try {
      // Równoległe wysyłanie i pobieranie dla zerowego lagu
      const [_, fetchRes] = await Promise.all([
        fetch("/.netlify/functions/save-stat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ songKey: song.snippet, title: song.title, level: levelLabel })
        }),
        fetch(`/.netlify/functions/get-stats?songKey=${encodeURIComponent(song.snippet)}`)
      ]);
      const data = await fetchRes.json();
      setStats(data);
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
    setFullCurrentTime(0);
    setFullDuration(0);
    setIsFullPlaying(false);
    setCurrentTime(0);          // ✅ reset paska
    setLastSnippetIndex(-1);    // ✅ reset logiki progów
    setHasPlayedCurrentLevel(false);
    setIsCorrect(false);
    setGameOver(false);
    setIsPlaying(false);
    setWrongAnswers([]);
    setStats(null);
    clearTimers();
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const selectCategory = (cat) => {
    const allSongs = Array.isArray(songsData) ? songsData : songsData.songs;
    let filtered = [];
    const isPolish = (song) =>
  song?.categories?.some(c => c.toLowerCase().startsWith("polsk"));
  if (cat === "all") {
  filtered = allSongs.filter(song => !isPolish(song));
    } else if (cat.startsWith("polish")) {
      filtered = allSongs.filter(s => s?.categories?.some(c => c.toLowerCase().startsWith("polsk")));
      if (cat === "polish_pop") filtered = filtered.filter(s => s.categories.includes("Polskie Pop"));
      if (cat === "polish_rock") filtered = filtered.filter(s => s.categories.includes("Polskie Rock"));
      if (cat === "polish_rap") filtered = filtered.filter(s => s.categories.includes("Polskie Rap"));
    } else {
    filtered = allSongs.filter(
      s =>
        !isPolish(s) &&
        s?.categories?.some(c => c.toLowerCase().includes(cat.toLowerCase()))
   );
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

  let startTime = currentTime; // <-- KLUCZOWA ZMIANA

  if (snippetIndex !== lastSnippetIndex) {
    // nowy próg → kontynuuj od aktualnego czasu zamiast od końca poprzedniego
    setHasPlayedCurrentLevel(true);
  } else {
    // ten sam próg → od początku
    startTime = 0;
    setHasPlayedCurrentLevel(false);
  }

  audio.currentTime = startTime;
  audio.play();
  setIsPlaying(true);
  setCurrentTime(startTime);

  const remainingTime = level.time - startTime;

  timeoutRef.current = setTimeout(() => stopSnippet(), remainingTime * 1000);
  intervalRef.current = setInterval(() => setCurrentTime(t => t + 0.1), 100);

  setLastSnippetIndex(snippetIndex);
};

 const stopSnippet = () => {
  if (!audioRef.current) return;

  audioRef.current.pause();
  setIsPlaying(false);
  clearTimers();

  const level = LEVELS[snippetIndex];

  // ustawiamy tylko jeśli faktycznie dotarliśmy do końca progu
  setCurrentTime(prev => Math.max(prev, level.time));
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
  if (snippetIndex >= LEVELS.length - 1) {
    stopSnippet();
    setGameOver(true);
    finishGame(currentSong, "fail");
    return;
  }

  const nextIndex = snippetIndex + 1;
  setSnippetIndex(nextIndex);

  const nextLevel = LEVELS[nextIndex];

  if (isPlaying) {
    clearTimeout(timeoutRef.current);

    const remainingTime = nextLevel.time - currentTime;

    timeoutRef.current = setTimeout(() => {
      stopSnippet();
    }, remainingTime * 1000);
  }

  setHasPlayedCurrentLevel(false);
};

  const giveUp = () => {
    stopSnippet();
    setGameOver(true);
    finishGame(currentSong, "fail");
  };

  const playFullSong = () => {
  if (!audioRef.current) return;
  audioRef.current.pause();
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
      setFullCurrentTime(0);
      setFullDuration(0);
      setIsFullPlaying(false);
      setCurrentTime(0);          // ✅ reset paska
      setLastSnippetIndex(-1);
      setHasPlayedCurrentLevel(false);
      setIsCorrect(false);
      setGameOver(false);
      setWrongAnswers([]);
      setStats(null);
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
        <div style={{ marginTop: 20 }}>
          <h2>Wybierz kategorię:</h2>
          <button onClick={() => selectCategory("all")} style={{ margin: 8 }}>🎧 All</button>
          <button onClick={() => selectCategory("pop")} style={{ margin: 8 }}>🎤 Pop</button>
          <button onClick={() => selectCategory("rock")} style={{ margin: 8 }}>🎸 Rock</button>
          <button onClick={() => selectCategory("rap")} style={{ margin: 8 }}>🧢 Rap</button>
          <div style={{ marginTop: 30 }}>
  <h3 style={{ color: "#aaa", display: "flex", alignItems: "center", gap: "8px", justifyContent: "center" }}>
  <img
    src="https://flagcdn.com/w40/pl.png"
    alt="PL"
    width={22}
    height={16}
    style={{ display: "inline-block", verticalAlign: "middle" }}
  />
  Polskie
</h3>
            <button onClick={() => selectCategory("polish_all")} style={{ margin: 8 }}>🎧 Polskie</button>
            <button onClick={() => selectCategory("polish_pop")} style={{ margin: 8 }}>🎤 Polski Pop</button>
            <button onClick={() => selectCategory("polish_rock")} style={{ margin: 8 }}>🎸 Polski Rock</button>
            <button onClick={() => selectCategory("polish_rap")} style={{ margin: 8 }}>🧢 Polski Rap</button>
          </div>
          <button onClick={startDaily} style={{ background: "#8b5cf6", color: "white", padding: "10px 16px", borderRadius: 10, fontWeight: "bold", border: "none", cursor: "pointer", marginTop: 30 }}>🎯 Daily Challenge</button>
          {noDaily && <p style={{ color: "#ff5555" }}>Brak daily na dziś 😢</p>}
        </div>
      )}

      {(mode === "category" || mode === "daily") && currentSong && (
        <>
          {dailyComplete ? (
            <div style={{ marginTop: 100 }}>
              <h2>✅ Daily ukończone!</h2>
              <button onClick={() => setMode("menu")} style={{ background: "#555", color: "white", padding: "10px 16px", borderRadius: 10, border: "none", cursor: "pointer" }}>⬅ Wróć</button>
            </div>
          ) : (
           <GameView 
            title={mode === "daily" ? `🎯 Daily ${dailyIndex + 1}/${dailySongs.length} — ${currentSong.dailyCategory}` : `🎵 ${CATEGORY_NAMES[category]} Mode`}
            onBack={() => { setMode("menu"); clearTimers(); }}
            {...{ currentSong, snippetIndex, displayedTime, LEVELS, audioRef, isPlaying, playSnippet, stopSnippet, skipToNext, giveUp, wrongAnswers, isCorrect, gameOver, userGuess, setUserGuess, handleGuess, isFullPlaying, playFullSong, stopFullSong, startNewSong: mode === "daily" ? nextDailySong : () => startNewSong(), stats }}
            volume={volume}
            setVolume={setVolume}
            currentTime={currentTime}
            hasPlayedCurrentLevel={hasPlayedCurrentLevel}
            fullCurrentTime={fullCurrentTime}
            setFullCurrentTime={setFullCurrentTime}
            fullDuration={fullDuration}
            setFullDuration={setFullDuration}
/>
          )}
        </>
      )}
    </div>
  );
}

function TimelineBar({ LEVELS, currentTime }) {

  const MAX_TIME = LEVELS[LEVELS.length - 1].time;
  const progress = Math.min(currentTime / MAX_TIME, 1) * 100;

  return (
    <div style={{ width: 420, margin: "18px auto 28px auto" }}>

      <div
        style={{
          position: "relative",
          height: 14,
          background: "#1e1e1e",
          borderRadius: 10,
          overflow: "hidden",
          boxShadow: "inset 0 0 6px rgba(0,0,0,0.6)"
        }}
      >

        {/* progress */}
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            background: "linear-gradient(90deg,#666,#999)",
            transition: "width 0.05s linear"
          }}
        />

        {/* markers */}
        {LEVELS.map((lvl, i) => {
          const pos = (lvl.time / MAX_TIME) * 100;

          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: `${pos}%`,
                top: 0,
                bottom: 0,
                width: 2,
                background: "#2f2f2f"
              }}
            />
          );
        })}

      </div>

    </div>
  );
}
function GameView({ title, onBack, currentSong, snippetIndex, displayedTime, LEVELS, audioRef, isPlaying, playSnippet, stopSnippet, skipToNext, giveUp, wrongAnswers, isCorrect, gameOver, userGuess, setUserGuess, handleGuess, isFullPlaying, playFullSong, stopFullSong, startNewSong, stats, volume, setVolume,currentTime,hasPlayedCurrentLevel,fullCurrentTime,setFullCurrentTime,fullDuration,setFullDuration}) {
  const seekFullSong = (time) => {
  if (!audioRef.current) return;
  audioRef.current.currentTime = time;
  setFullCurrentTime(time);
};

const formatTime = (time) => {
  const m = Math.floor(time / 60);
  const s = Math.floor(time % 60);
  return `${m}:${s.toString().padStart(2,"0")}`;
};
  return (
    <>
      <audio
  ref={audioRef}
  src={currentSong.snippet}
  onLoadedMetadata={(e) => setFullDuration(e.target.duration)}
  onTimeUpdate={(e) => {
    if (isFullPlaying) {
      setFullCurrentTime(e.target.currentTime);
    }
  }}
/>

      <button
        onClick={onBack}
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          background: "#555",
          border: "none",
          color: "white",
          padding: "6px 10px",
          borderRadius: 8,
          cursor: "pointer"
        }}
      >
        ⬅ Wróć
      </button>

      <h2 style={{ marginBottom: 10, color: "#ccc" }}>{title}</h2>

      {!isCorrect && !gameOver ? (
        <>
          <h3>
            Fragment: <strong>{LEVELS[snippetIndex].label}</strong>
          </h3>
 <div style={{ marginBottom: 10 }}>
  <TimelineBar
    LEVELS={LEVELS}
    currentTime={currentTime}
  />
  <div
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginTop: 10,
    fontSize: "1rem",
    fontWeight: "600",
    letterSpacing: "0.5px"
  }}
>
  <span style={{ color: "#aaa" }}>⏱</span>

  <span style={{ color: "#ffffff" }}>
    {displayedTime.toFixed(1)}
  </span>

  <span style={{ color: "#666" }}>/</span>

  <span style={{ color: "#4caf50" }}>
    {LEVELS[snippetIndex].displayTime}s
  </span>
</div>
</div>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 35 }}>
            <button style={btnDark} onClick={isPlaying ? stopSnippet : playSnippet}>
              {isPlaying ? "⏹ Stop" : "▶️ Play"}
            </button>
            <button style={btnDark} onClick={skipToNext}>
              ⏭ Skip
            </button>
          </div>
<div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 20 }}>
  <span style={{ color: "#aaa", fontWeight: "bold" }}>🔊 Volume</span>
  <input
    type="range"
    min="0"
    max="1"
    step="0.01"
    value={volume}
    onChange={(e) => {
      const v = parseFloat(e.target.value);
      setVolume(v);
      if (audioRef.current) audioRef.current.volume = v;
    }}
    style={{
      width: 200,
      height: 8,
      borderRadius: 8,
      background: '#2b2b2b',
      accentColor: '#4caf50',
      cursor: 'pointer'
    }}
  />
  <span style={{
    color: "#4caf50",
    width: 35,           // STAŁA szerokość
    textAlign: "right",  // wyrównanie do prawej
    fontWeight: "bold"
  }}>
    {Math.round(volume * 100)}%
  </span>
</div>

          {/* JEDYNY WAŻNY WRAPPER */}
          <div style={{ width: "100%", maxWidth: 420, margin: "0 auto" }}>
            <SearchBar onSelectSong={(t, a) => setUserGuess(`${t} - ${a}`)} />

            <button
              onClick={handleGuess}
              style={{
                width: "100%",
                marginTop: 12,
                background: "#4caf50",
                color: "white",
                padding: "16px 0",
                borderRadius: 14,
                border: "none",
                fontWeight: "bold",
                fontSize: "1.2rem",
                cursor: "pointer"
              }}
            >
              Submit
            </button>
          </div>

          <div style={{ marginTop: 25 }}>
            {wrongAnswers.map((ans, i) => (
              <div
                key={i}
                style={{
                  marginTop: 8,
                  borderRadius: 8,
                  padding: "8px 15px",
                  backgroundColor: ans.artistCorrect ? "#ffd54f" : "#ef5350",
                  color: "black",
                  display: "inline-block",
                  minWidth: 250
                }}
              >
                ❌ {ans.title}
              </div>
            ))}
          </div>

          {snippetIndex === LEVELS.length - 1 && (
            <button
              onClick={giveUp}
              style={{
                background: "#ff5555",
                color: "white",
                border: "none",
                padding: "8px 15px",
                borderRadius: 8,
                marginTop: 20
              }}
            >
              Give Up
            </button>
          )}
        </>
      ) : (
        <div style={{ marginTop: 16 }}>
          {isCorrect ? (
            <h2 style={{ color: "#4caf50" }}>✅ Correct!</h2>
          ) : (
            <h2 style={{ color: "#ff5555" }}>❌ Game Over</h2>
          )}

          <p style={{ fontSize: "1.4rem", margin: "10px 0" }}>
            <strong>{currentSong.title}</strong>
          </p>
          <p style={{ fontSize: "1.1rem", color: "#aaa" }}>{currentSong.artist}</p>

          <img
            src={currentSong.cover}
            alt="cover"
            width={220}
            style={{
              borderRadius: 15,
              marginTop: 15,
              boxShadow: "0 10px 20px rgba(0,0,0,0.5)"
            }}
          />

          <GuessChart stats={stats} currentLevel={isCorrect ? LEVELS[snippetIndex].label : "fail"} />

      <div style={{ marginTop: 25 }}>

  <button
    style={{ ...btnDark, marginRight: 10 }}
    onClick={isFullPlaying ? stopFullSong : playFullSong}
  >
    {isFullPlaying ? "⏹ Stop Full" : "▶️ Play Full"}
  </button>

  {/* SEEK BAR */}
  {isFullPlaying && (
    <div style={{ width: 420, margin: "20px auto" }}>

      <div style={{
        display: "flex",
        justifyContent: "space-between",
        fontSize: 12,
        color: "#aaa"
      }}>
        <span>{formatTime(fullCurrentTime)}</span>
        <span>{formatTime(fullDuration)}</span>
      </div>

      <input
        type="range"
        min="0"
        max={fullDuration || 0}
        step="0.1"
        value={fullCurrentTime}
        onChange={(e) => seekFullSong(parseFloat(e.target.value))}
        style={{
          width: "100%",
          marginTop: 5,
          accentColor: "#4caf50",
          cursor: "pointer"
        }}
      />

      {/* 🔊 SUWAK GŁOŚNOŚCI */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        marginTop: 10
      }}>

        <span style={{ color: "#aaa" }}>🔊</span>

        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => {
            const v = parseFloat(e.target.value);
            setVolume(v);
            if (audioRef.current) audioRef.current.volume = v;
          }}
          style={{
            width: 160,
            accentColor: "#4caf50",
            cursor: "pointer"
          }}
        />

        <span style={{
          width: 35,
          textAlign: "right",
          color: "#4caf50",
          fontWeight: "bold"
        }}>
          {Math.round(volume * 100)}%
        </span>

      </div>

    </div>
  )}

  <button
    onClick={startNewSong}
    style={{
      background: "#fff",
      color: "#000",
      padding: "12px 30px",
      borderRadius: 10,
      fontWeight: "bold",
      border: "none",
      cursor: "pointer"
    }}
  >
    Next Song →
  </button>

</div>
        </div>
      )}
    </>
  );
}

const btnDark = {
  background: "#333",
  color: "white",
  border: "none",
  padding: "10px 25px",
  borderRadius: 10,
  cursor: "pointer"
};
