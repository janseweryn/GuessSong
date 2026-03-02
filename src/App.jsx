import React, { useState, useRef, useEffect } from "react";
import songsData from "./songs.json";
import SearchBar from "./components/SearchBar";
import "./app.css";

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
  "2026-02-23": [
    {
      title: "Cool for the Summer",
      artist: "Demi Lovato",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/ea/08/9e/ea089eb7-9e3c-a442-8656-7cac2da0309f/00050087335120.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/pop/demi_lovato_cool_for_the_summer.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Johnny B. Goode",
      artist: "Chuck Berry",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music123/v4/62/7c/ac/627cac79-3693-dd16-6466-48950746f527/886447924471.jpg/600x600bb.jpg",
      snippet: "/songs/pop/chuck_berry_johnny_b_goode.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "death bed (feat. beabadoobee) [coffee for your head]",
      artist: "Powfu",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/8b/a9/36/8ba936f3-2d8b-1012-89cc-92f75eb76961/886448289180.jpg/600x600bb.jpg",
      snippet: "/songs/rap/powfu_death_bed_feat_beabadoobee_coffee_for_your_head.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-02-24": [
    {
      title: "Cake By the Ocean",
      artist: "DNCE",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/46/dd/0d/46dd0d29-7dbf-7e3a-0f76-1595e18c4b73/16UMGIM68265.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/pop/dnce_cake_by_the_ocean.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "PA PA YA!! (feat. F.HERO)",
      artist: "Babymetal", 
      cover: "/songs/covers/10babymetal.jpg",
      snippet: "/songs/rock/papaya.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Alright",
      artist: "Kendrick Lamar",
      cover: "/songs/covers/butterfly.jpg",
      snippet: "/songs/rap/alright.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-02-25": [
    {
      title: "'I'm An Albatraoz",
      artist: "AronChupa",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/e3/df/72/e3df7264-46c2-f2b2-a586-e7dee1814661/9785.jpg/600x600bb.jpg",
      snippet: "/songs/pop/aronchupa_i_m_an_albatraoz.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Even Flow",
      artist: "Pearl Jam",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music3/v4/31/2b/2b/312b2b48-b634-329b-3ced-552dd997050e/dj.dyrqkvux.jpg/600x600bb.jpg",
      snippet: "/songs/rock/pearl_jam_even_flow_brendan_o_brien_mix.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Flashing Lights",
      artist: "Kanye West",
      cover: "/songs/covers/graduation.jpg",
      snippet: "/songs/rap/flashing_lights.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-02-26": [
    {
      title: "Falling Behind",
      artist: "Laufey",
      cover: "/songs/covers/everythinglive.jpg",
      snippet: "/songs/pop/falling_behind.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Fade To Black",
      artist: "Metallica",
      cover: "/songs/covers/lighting.jpg",
      snippet: "/songs/rock/fade_black.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Hotel Room Service",
      artist: "Pitbull",
      cover: "/songs/covers/pitbull.jpg",
      snippet: "/songs/pop/hotel_room.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
   "2026-02-27": [
    {
      title: "Treasure",
      artist: "Bruno Mars",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/15/63/53/156353b8-d45b-a17d-f553-2d125aeb3cb3/075679957474.jpg/600x600bb.jpg",
      snippet: "/songs/pop/bruno_mars_treasure.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Dark Necessities",
      artist: "Red Hot Chili Peppers",
      cover: "/songs/covers/getaway.jpg",
      snippet: "/songs/rock/dark_nes.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Pink Venom",
      artist: "Blackpink",
      cover: "/songs/covers/bornpink.jpg",
      snippet: "/songs/pop/pink_venom.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-02-28": [
    {
      title: "Rockabye (feat. Sean Paul & Anne-Marie)",
      artist: "Clean Bandit",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music91/v4/17/ad/8f/17ad8f52-e9e5-2858-464b-a40e1b84070b/190295859138.jpg/600x600bb.jpg",
      snippet: "/songs/pop/clean_bandit_rockabye_feat_sean_paul_anne_marie_autograf_remix.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "On Melancholy Hill",
      artist: "Gorillaz",
      cover: "/songs/covers/plastic.jpg",
      snippet: "/songs/rock/melancholy_hill.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "See You Again (feat. Kali Uchis)",
      artist: "Tyler, The Creator",
      cover: "/songs/covers/flowerboy.jpg",
      snippet: "/songs/pop/miley_cyrus_see_you_again.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-03-01": [
    {
      title: "I Ain't Worried",
      artist: "OneRepublic",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/e6/14/14/e6141444-6597-4c3a-7ad1-86304528acf4/22UMGIM45569.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/pop/onerepublic_i_ain_t_worried.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "The Chain",
      artist: "Fleetwood Mac",
      cover: "/songs/covers/rumours.jpg",
      snippet: "/songs/rock/chain.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Donald Trump",
      artist: "Mac Miller",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/7a/fa/81/7afa8155-fa6a-4f68-9459-455f0fd79784/881034789822.jpg/600x600bb.jpg",
      snippet: "/songs/rap/mac_miller_donald_trump.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
   "2026-03-02": [
    {
      title: "Lean On (feat. MØ)",
      artist: "Major Lazer & DJ Snake",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/b9/80/28/b98028a2-1567-1247-6813-d167ef8c99dd/653738277321_Cover.jpg/600x600bb.jpg",
      snippet: "/songs/pop/major_lazer_dj_snake_lean_on_feat_m.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Behind Blue Eyes",
      artist: "Limp Bizkit",
      cover: "/songs/covers/results.jpg",
      snippet: "/songs/rock/behind_eyes.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Rather Lie (feat. The Weeknd)",
      artist: "Playboi Carti",
      cover: "/songs/covers/music.jpg",
      snippet: "/songs/pop/the_weeknd_try_me.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-03-03": [
    {
      title: "Scream & Shout (feat. Britney Spears)",
      artist: "will.i.am",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/84/6d/92/846d926b-8290-3855-b32b-dd903cc9b1ad/13UMGIM26867.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/pop/will_i_am_scream_shout_feat_britney_spears.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Take On Me",
      artist: "a-ha",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/3e/0a/38/3e0a38d9-b138-429a-61e1-aeac2fad3263/mzi.iefykuuf.jpg/600x600bb.jpg",
      snippet: "/songs/pop/a_ha_take_on_me.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Peso",
      artist: "A$AP Rocky",
      cover: "/songs/covers/livelong.jpg",
      snippet: "/songs/rap/A$APRocky _Peso.mp3",
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
            />
          )}
        </>
      )}
    </div>
  );
}

function GameView({ title, onBack, currentSong, snippetIndex, displayedTime, LEVELS, audioRef, isPlaying, playSnippet, stopSnippet, skipToNext, giveUp, wrongAnswers, isCorrect, gameOver, userGuess, setUserGuess, handleGuess, isFullPlaying, playFullSong, stopFullSong, startNewSong, stats }) {
  return (
    <>
      <audio ref={audioRef} src={currentSong.snippet} />

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
          <p>
            ⏱ {displayedTime.toFixed(1)}s / {LEVELS[snippetIndex].displayTime}s
          </p>

          <div style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 35 }}>
            <button style={btnDark} onClick={isPlaying ? stopSnippet : playSnippet}>
              {isPlaying ? "⏹ Stop" : "▶️ Play"}
            </button>
            <button style={btnDark} onClick={skipToNext}>
              ⏭ Skip
            </button>
          </div>

          {/* 🔥 JEDYNY WAŻNY WRAPPER */}
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
            <button style={{ ...btnDark, marginRight: 10 }} onClick={isFullPlaying ? stopFullSong : playFullSong}>
              {isFullPlaying ? "⏹ Stop Full" : "▶️ Play Full"}
            </button>

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
