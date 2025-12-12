import React, { useState, useRef, useEffect } from "react";
import songsData from "./songs.json";
import SearchBar from "./components/SearchBar";

// 🟢 RĘCZNIE DEFINIOWANE DAILY
const manualDaily = {

  "2025-12-06": [
    {
      title: "Santa Tell Me",
      artist: "Ariana Grande",
      cover: "/songs/covers/santatell.png",
      snippet: "/songs/pop/santa_tell.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Snow (Hey Oh)",
      artist: "Red Hot Chili Peppers",
      cover: "/songs/covers/stadium.jpg",
      snippet: "/songs/rock/snow.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Coldest Winter",
      artist: "Kanye West",
      cover: "/songs/covers/heartbreak.jpg",
      snippet: "/songs/rap/coldest_winter.mp3",
      categories: ["rap"],
      dailyCategory: "Rap", 
    },
  ],
  "2025-12-07": [
    {
      title: "Summertime Sadness",
      artist: "Lana Del Rey",
      cover: "/songs/covers/borndie.jpg",
      snippet: "/songs/pop/zamiataj_sedes.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Mascara",
      artist: "Deftones",
      cover: "/songs/covers/a.jpg",
      snippet: "/songs/rock/masacra.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "The Next Episode (feat. Snoop Dogg)",
      artist: "Dr. Dre",
      cover: "/songs/covers/a.jpg",
      snippet: "/songs/rap/episode.mp3",
      categories: ["rap"],
      dailyCategory: "Rap", 
    },
  ],
   "2025-12-08": [
    {
      title: "Believer",
      artist: "Imagine Dragons",
      cover: "/songs/covers/evolve.jpg",
      snippet: "/songs/pop/believer.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Heroes",
      artist: "David Bowie",
      cover: "/songs/covers/heroesbowie.jpg",
      snippet: "/songs/rock/heroes.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Better Now",
      artist: "Post Malone",
      cover: "/songs/covers/beerbongs.jpg",
      snippet: "/songs/rap/betternow.mp3",
      categories: ["rap"],
      dailyCategory: "Rap", 
    },
  ],
  "2025-12-09": [
    {
      title: "Hips Don't Lie (feat. Wyclef Jean)",
      artist: "Shakira",
      cover: "/songs/covers/oral.jpg",
      snippet: "/songs/pop/hips_lie.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Light My Fire",
      artist: "The Doors",
      cover: "/songs/covers/doors.jpg",
      snippet: "/songs/rock/light_fire.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Small Worlds",
      artist: "Mac Miller",
      cover: "/songs/covers/swimming.jpg",
      snippet: "/songs/rap/small_wordls.mp3",
      categories: ["rap"],
      dailyCategory: "Rap", 
    },
  ],
  "2025-12-10": [
    {
      title: "Smooth Criminal",
      artist: "Michael Jackson",
      cover: "/songs/covers/bad.jpg",
      snippet: "/songs/pop/smooth_criminal.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Smooth Criminal",
      artist: "Alien Ant Farm",
      cover: "/songs/covers/ant.jpg",
      snippet: "/songs/rock/smooth_criminal.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Poland",
      artist: "Lil Yachty",
      cover: "/songs/covers/poland.jpg",
      snippet: "/songs/rap/poland.mp3",
      categories: ["rap"],
      dailyCategory: "Rap", 
    },
  ],
  "2025-12-11": [
    {
      title: "Sweater Weather",
      artist: "The Neighbourhood",
      cover: "/songs/covers/loveyou.jpg",
      snippet: "/songs/pop/weather.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "It's the End of the World As We Know It (And I Feel Fine)",
      artist: "R.E.M.",
      cover: "/songs/covers/document5.jpg",
      snippet: "/songs/rock/end_world.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "All Eyez On Me (feat. Big Syke)",
      artist: "2pac",
      cover: "/songs/covers/eyez.jpg",
      snippet: "/songs/rap/eyez.mp3",
      categories: ["rap"],
      dailyCategory: "Rap", 
    },
  ],
  "2025-12-12": [
    {
      title: "Daddy Cool",
      artist: "Bobey M.",
      cover: "/songs/covers/getheart.jpg",
      snippet: "/songs/pop/daddy_cool.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Walk Of Life",
      artist: "Dire Straits",
      cover: "/songs/covers/brothersarms.jpg",
      snippet: "/songs/rock/walk_life.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Old Town Road",
      artist: "Lil Nas X",
      cover: "/songs/covers/7.jpg",
      snippet: "/songs/rap/old_town.mp3",
      categories: ["rap"],
      dailyCategory: "Rap", 
    },
  ],
  "2025-12-13": [
    {
      title: "Lush Life",
      artist: "Zara Larsson",
      cover: "/songs/covers/sogood.jpg",
      snippet: "/songs/pop/lush_life.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "In Too Deep",
      artist: "Sum 41",
      cover: "/songs/covers/allkiller.jpg",
      snippet: "/songs/rock/too_deep.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Drama",
      artist: "Aespa",
      cover: "/songs/covers/drama.jpg",
      snippet: "/songs/pop/drama.mp3",
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
};


// 🟡 Pobiera ręczne daily zdefiniowane na dziś (czas Polski)
function getManualDailySongs() {
  const today = new Date();

  // oblicz czas UTC +1 (Polska, niezależnie od miejsca użytkownika)
  const polandTime = new Date(today.toLocaleString("en-US", { timeZone: "Europe/Warsaw" }));

  const dateKey = polandTime.toISOString().split("T")[0];
  return manualDaily[dateKey] || null;
}

export default function App() {
  const [mode, setMode] = useState("menu"); // "menu" | "category" | "daily"
  const [category, setCategory] = useState(null);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [snippetIndex, setSnippetIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [userGuess, setUserGuess] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [canReplayFull, setCanReplayFull] = useState(false);
  const [isFullPlaying, setIsFullPlaying] = useState(false);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [dailySongs, setDailySongs] = useState([]);
  const [dailyIndex, setDailyIndex] = useState(0);
  const [dailyComplete, setDailyComplete] = useState(false);
  const [noDaily, setNoDaily] = useState(false);

  const audioRef = useRef(null);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  const clearTimers = () => {
    clearInterval(intervalRef.current);
    clearTimeout(timeoutRef.current);
  };

  const startNewSong = (songsList) => {
    if (!songsList.length) return;
    const idx = Math.floor(Math.random() * songsList.length);
    const song = songsList[idx];
    setCurrentSong(song);
    setSnippetIndex(0);
    setIsCorrect(false);
    setGameOver(false);
    setCanReplayFull(false);
    setIsPlaying(false);
    setWrongAnswers([]);
    clearTimers();
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const selectCategory = (cat) => {
    const filtered =
      cat === "all"
        ? songsData
        : songsData.filter((s) =>
            s.categories.some((c) => c.toLowerCase().includes(cat))
          );
    setCategory(cat);
    setFilteredSongs(filtered);
    setMode("category");
    startNewSong(filtered);
  };

  const startDaily = () => {
    const todayDaily = getManualDailySongs();
    if (!todayDaily) {
      setNoDaily(true);
      return;
    }
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
    intervalRef.current = setInterval(() => setCurrentTime((t) => t + 0.1), 100);
    timeoutRef.current = setTimeout(() => stopSnippet(), level.time * 1000);
  };

  const stopSnippet = () => {
    if (audioRef.current) audioRef.current.pause();
    setIsPlaying(false);
    clearTimers();
  };

  const handleGuess = () => {
    const [title, artist = ""] = userGuess
      .split(" - ")
      .map((x) => x.trim().toLowerCase());
    const correctTitle = currentSong.title.toLowerCase();
    const correctArtist = currentSong.artist.toLowerCase();

    if (title === correctTitle && artist === correctArtist) {
      setIsCorrect(true);
      stopSnippet();
      setCanReplayFull(true);
    } else {
      const artistMatches =
        artist && correctArtist.includes(artist.toLowerCase());
      setWrongAnswers((prev) => [
        ...prev,
        { title: userGuess, artistCorrect: artistMatches },
      ]);
      skipToNext();
    }
    setUserGuess("");
  };

  const skipToNext = () => {
    stopSnippet();
    if (snippetIndex < LEVELS.length - 1) setSnippetIndex((i) => i + 1);
    else {
      setGameOver(true);
      setCanReplayFull(true);
    }
  };

  const giveUp = () => {
    stopSnippet();
    setGameOver(true);
    setCanReplayFull(true);
  };

  const playFullSong = () => {
    const audio = audioRef.current;
    audio.currentTime = 0;
    audio.play();
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
      setCanReplayFull(false);
      setWrongAnswers([]);
    } else setDailyComplete(true);
  };

  const displayedTime = (() => {
    const level = LEVELS[snippetIndex];
    const scale = level.displayTime / level.time;
    const scaled = currentTime * scale;
    return scaled > level.displayTime ? level.displayTime : scaled;
  })();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        minHeight: "100vh",
        color: "white",
        background: "#222",
        padding: 20,
      }}
    >
      <h1 style={{ fontSize: "2.5rem", marginBottom: 20 }}>🎵 SongGuess 🎵</h1>

      {mode === "menu" && (
        <>
          <h2>Wybierz kategorię:</h2>
          <div style={{ marginTop: 20 }}>
            <button onClick={() => selectCategory("all")} style={{ margin: 8 }}>
              🎧 All
            </button>
            <button onClick={() => selectCategory("pop")} style={{ margin: 8 }}>
              🎤 Pop
            </button>
            <button onClick={() => selectCategory("rock")} style={{ margin: 8 }}>
              🎸 Rock
            </button>
            <button onClick={() => selectCategory("rap")} style={{ margin: 8 }}>
              🧢 Rap
            </button>

            <div style={{ marginTop: 30 }}>
              {/* 🟣 DAILY BUTTON */}
              <button
                onClick={startDaily}
                style={{
                  background: "#8b5cf6",
                  color: "white",
                  padding: "10px 16px",
                  borderRadius: 10,
                  fontWeight: "bold",
                }}
              >
                🎯 Daily Challenge
              </button>
            </div>
            {noDaily && <p style={{ color: "#ff5555" }}>Brak daily na dziś 😢</p>}
          </div>
        </>
      )}

      {/* 🟢 NORMAL CATEGORY TRYB */}
      {mode === "category" && currentSong && (
        <GameView
          title={`🎵 ${CATEGORY_NAMES[category]} Mode`}
          onBack={() => {
            setMode("menu");
            setCategory(null);
            clearTimers();
          }}
          {...{
            currentSong,
            snippetIndex,
            displayedTime,
            LEVELS,
            audioRef,
            isPlaying,
            playSnippet,
            stopSnippet,
            skipToNext,
            giveUp,
            wrongAnswers,
            isCorrect,
            gameOver,
            userGuess,
            setUserGuess,
            handleGuess,
            isFullPlaying,
            playFullSong,
            stopFullSong,
            startNewSong: () => startNewSong(filteredSongs),
          }}
        />
      )}

      {mode === "daily" && currentSong && (
  <>
    {!dailyComplete ? (
      <GameView
        title={`🎯 Daily ${dailyIndex + 1} / ${dailySongs.length} — ${currentSong.dailyCategory}`}
        onBack={() => setMode("menu")}
        {...{
          currentSong,
          snippetIndex,
          displayedTime,
          LEVELS,
          audioRef,
          isPlaying,
          playSnippet,
          stopSnippet,
          skipToNext,
          giveUp,
          wrongAnswers,
          isCorrect,
          gameOver,
          userGuess,
          setUserGuess,
          handleGuess,
          isFullPlaying,
          playFullSong,
          stopFullSong,
          startNewSong: nextDailySong,
        }}
      />
    ) : (
      <div style={{ marginTop: 100, textAlign: "center" }}>
        <h2 style={{ fontSize: "2rem", marginBottom: 20 }}>
          ✅ Daily ukończone!
        </h2>
        <button
          onClick={() => setMode("menu")}
          style={{
            background: "#555",
            color: "white",
            padding: "10px 16px",
            borderRadius: 10,
            fontWeight: "bold",
          }}
        >
          ⬅ Wróć na stronę główną
        </button>
      </div>
    )}
  </>
)}

    </div>
  );
}

// 🔹 Komponent wspólny dla gry
function GameView({
  title,
  onBack,
  currentSong,
  snippetIndex,
  displayedTime,
  LEVELS,
  audioRef,
  isPlaying,
  playSnippet,
  stopSnippet,
  skipToNext,
  giveUp,
  wrongAnswers,
  isCorrect,
  gameOver,
  userGuess,
  setUserGuess,
  handleGuess,
  isFullPlaying,
  playFullSong,
  stopFullSong,
  startNewSong,
}) {
  return (
    <>
      <button
        onClick={onBack}
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          background: "#555",
          padding: "6px 10px",
          borderRadius: 8,
        }}
      >
        ⬅ Wróć
      </button>

      <h2 style={{ marginBottom: 10, color: "#ccc" }}>{title}</h2>
      <h3>
        Fragment: <strong>{LEVELS[snippetIndex].label}</strong>
      </h3>
      <p>
        ⏱ {displayedTime.toFixed(1)}s / {LEVELS[snippetIndex].displayTime}s
      </p>
      <audio ref={audioRef} src={currentSong.snippet} />

      {!isCorrect && !gameOver && (
        <>
          <div>
            {!isPlaying ? (
              <button onClick={playSnippet}>▶️ Play</button>
            ) : (
              <button onClick={stopSnippet}>⏹ Stop</button>
            )}
            <button onClick={skipToNext} style={{ marginLeft: 8 }}>
              ⏭ Skip
            </button>
          </div>

          <div style={{ marginTop: 12 }}>
            <SearchBar
              onSelectSong={(title, artist) =>
                setUserGuess(`${title} - ${artist}`)
              }
            />
            <button
              onClick={handleGuess}
              style={{
                marginLeft: 8,
                background: "#4caf50",
                color: "white",
                padding: "6px 10px",
                borderRadius: 6,
              }}
            >
              Submit
            </button>
          </div>

          <div style={{ marginTop: 20 }}>
            {wrongAnswers.map((ans, i) => (
              <div
                key={i}
                style={{
                  marginTop: 8,
                  borderRadius: 8,
                  padding: "6px 10px",
                  border: "1px solid #444",
                  backgroundColor: ans.artistCorrect ? "#ffd54f" : "#ef5350",
                  color: "black",
                  display: "inline-block",
                  minWidth: 200,
                }}
              >
                ❌ {ans.title}
              </div>
            ))}
          </div>

          {snippetIndex === LEVELS.length - 1 && (
            <div style={{ marginTop: 12 }}>
              <button
                onClick={giveUp}
                style={{
                  background: "#ff5555",
                  color: "white",
                  padding: "6px 10px",
                }}
              >
                Give Up
              </button>
            </div>
          )}
        </>
      )}

      {(isCorrect || gameOver) && (
        <div style={{ marginTop: 16 }}>
          {isCorrect ? (
            <h2>✅ Correct!</h2>
          ) : (
            <h2 style={{ color: "red" }}>❌ Nie udało się</h2>
          )}
          <p>
            <strong>Tytuł:</strong> {currentSong.title}
            <br />
            <strong>Artysta:</strong> {currentSong.artist}
          </p>

          {currentSong.cover && (
            <img
              src={currentSong.cover}
              alt="cover"
              width={220}
              style={{ borderRadius: 12, marginTop: 10 }}
            />
          )}

          <div style={{ marginTop: 10 }}>
            {isFullPlaying ? (
              <button onClick={stopFullSong}>⏹ Stop Full</button>
            ) : (
              <button onClick={playFullSong}>▶️ Play Full</button>
            )}
          </div>

          <button onClick={() => startNewSong()} style={{ marginTop: 16 }}>
            Next →
          </button>
        </div>
      )}
    </>
  );
}
