import React, { useState, useRef, useEffect } from "react";
import songsData from "./songs.json";
import SearchBar from "./components/SearchBar";

// 🟢 RĘCZNIE DEFINIOWANE DAILY
const manualDaily = {
  "2025-12-28": [
    {
      title: "Moves Like Jagger (feat. Christina Aguilera)",
      artist: "Maroon 5",
      cover: "/songs/covers/handsover.jpg",
      snippet: "/songs/pop/moves_jagger.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Hypnotize",
      artist: "System Of A Down",
      cover: "/songs/covers/hypnotize.jpg",
      snippet: "/songs/rock/hypnotize.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Smack That (feat. Eminem)",
      artist: "Akon featuring Eminem",
      cover: "/songs/covers/smack.jpg",
      snippet: "/songs/rap/smack_that.mp3",
      categories: ["rap"],
      dailyCategory: "Rap", 
    },
  ],
  "2025-12-29": [
    {
      title: "APT.",
      artist: "ROSÉ & Bruno Mars",
      cover: "/songs/covers/rosie.jpg",
      snippet: "/songs/pop/apt.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "I Was Made for Lovin' You",
      artist: "Kiss",
      cover: "/songs/covers/dynasty.jpg",
      snippet: "/songs/rock/made_lovin.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Gucci Gang",
      artist: "Lil Pump",
      cover: "/songs/covers/pump.jpg",
      snippet: "/songs/rap/gucci_gang.mp3",
      categories: ["rap"],
      dailyCategory: "Rap", 
    },
  ],
  "2025-12-30": [
    {
      title: "Mambo No. 5 (a Little Bit of...)",
      artist: "Lou Bega",
      cover: "/songs/covers/mambo.jpg",
      snippet: "/songs/pop/mambo5.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Uptown Girl",
      artist: "Billy Joel",
      cover: "/songs/covers/innocent.jpg",
      snippet: "/songs/rock/uptown_girl2.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Watch Me (Whip / Nae Nae)",
      artist: "Silentó",
      cover: "/songs/covers/watchme.jpg",
      snippet: "/songs/rap/watch_me.mp3",
      categories: ["rap"],
      dailyCategory: "Rap", 
    },
  ],
  "2025-12-31": [
    {
      title: "Firework",
      artist: "Katy Perry",
      cover: "/songs/covers/teenagedream.jpg",
      snippet: "/songs/pop/firework.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Africa",
      artist: "Toto",
      cover: "/songs/covers/toto.jpg",
      snippet: "/songs/rock/africa.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "I Like It",
      artist: "Cardi B, Bad Bunny & J Balvin",
      cover: "/songs/covers/privacy.jpg",
      snippet: "/songs/rap/like_it.mp3",
      categories: ["rap"],
      dailyCategory: "Rap", 
    },
  ],
  "2026-01-01": [
    {
      title: "Likey",
      artist: "Twice",
      cover: "/songs/covers/twicetagram.jpg",
      snippet: "/songs/pop/likey.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "New Year's Day",
      artist: "U2",
      cover: "/songs/covers/bestof.jpg",
      snippet: "/songs/rock/new_years.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Like Jennie",
      artist: "Jennie",
      cover: "/songs/covers/ruby.jpg",
      snippet: "/songs/pop/jennie.mp3",
      categories: ["rap"],
      dailyCategory: "Rap", 
    },
  ],
  "2026-01-02": [
    {
      title: "Hall of Fame (feat. will.i.am)",
      artist: "The Script",
      cover: "/songs/covers/3deluxe.jpg",
      snippet: "/songs/pop/hall_fame.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "End of Beginning",
      artist: "Djo",
      cover: "/songs/covers/decide.jpg",
      snippet: "/songs/rock/End_Beginning.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Ni**as in Paris",
      artist: "Kanye West & JAY-Z",
      cover: "/songs/covers/watchthrone.jpg",
      snippet: "/songs/rap/niggas.mp3",
      categories: ["rap"],
      dailyCategory: "Rap", 
    },
  ],
  "2026-01-03": [
    {
      title: "Risk",
      artist: "Gracie Abrams",
      cover: "/songs/covers/secretus.jpg",
      snippet: "/songs/pop/risk.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "This Charming Man",
      artist: "The Smiths",
      cover: "/songs/covers/smiths.jpg",
      snippet: "/songs/rock/charming_man.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Sum 2 Prove",
      artist: "Lil Baby",
      cover: "/songs/covers/sum2.jpg",
      snippet: "/songs/rap/sum_prove.mp3",
      categories: ["rap"],
      dailyCategory: "Rap", 
    },
  ],
  "2026-01-04": [
    {
      title: "Running In the 90's",
      artist: "Max Coveri",
      cover: "/songs/covers/initialdelta.jpg",
      snippet: "/songs/pop/running_90s.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Linger",
      artist: "The Cranberries",
      cover: "/songs/covers/everybodyelse.jpg",
      snippet: "/songs/rock/linger.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Ridin' (feat. Krayzie Bone)",
      artist: "Chamillionaire",
      cover: "/songs/covers/soundrevenge.jpg",
      snippet: "/songs/rap/ridin.mp3",
      categories: ["rap"],
      dailyCategory: "Rap", 
    },
  ],
  "2026-01-05": [
    {
      title: "So What",
      artist: "P!nk",
      cover: "/songs/covers/funhouse.jpg",
      snippet: "/songs/pop/so_what.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Enjoy the Silence",
      artist: "Depeche Mode",
      cover: "/songs/covers/violator.jpg",
      snippet: "/songs/rock/silence2.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Fight The Power",
      artist: "Public Enemy",
      cover: "/songs/covers/blackplanet.jpg",
      snippet: "/songs/rap/fight_power.mp3",
      categories: ["rap"],
      dailyCategory: "Rap", 
    },
  ],
  "2026-01-06": [
    {
      title: "I Wanna Be Yours",
      artist: "Arctic Monkeys",
      cover: "/songs/covers/am.jpg",
      snippet: "/songs/rock/wanna_yours.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "I Bet You Look Good on the Dancefloor",
      artist: "Arctic Monkeys",
      cover: "/songs/covers/peoplesay.jpg",
      snippet: "/songs/rock/good_dancefloor.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Surround Sound (feat. 21 Savage & Baby Tate)",
      artist: "JID",
      cover: "/songs/covers/foreverstory.jpg",
      snippet: "/songs/rap/surround_sound.mp3",
      categories: ["rap"],
      dailyCategory: "Rap", 
    },
  ],
  "2026-01-07": [
    {
      title: "Gimme! Gimme! Gimme! (A Man After Midnight)",
      artist: "Abba",
      cover: "/songs/covers/voulez.jpg",
      snippet: "/songs/pop/gimme.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Everybody Wants to Rule the World",
      artist: "Tears for Fears",
      cover: "/songs/covers/bigchair.jpg",
      snippet: "/songs/rock/rule_world.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Mi Gente",
      artist: "J Balvin & Willy William",
      cover: "/songs/covers/vibras.jpg",
      snippet: "/songs/rap/mi_gente.mp3",
      categories: ["rap"],
      dailyCategory: "Rap", 
    },
  ],
  "2026-01-08": [
    {
      title: "Wicked Games",
      artist: "The Weeknd",
      cover: "/songs/covers/trilogy.jpg",
      snippet: "/songs/pop/wicked_games.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Paint It Black",
      artist: "The Rolling Stones",
      cover: "/songs/covers/aftermath.jpg",
      snippet: "/songs/rock/paint_black.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Dance in the Water",
      artist: "Danny Brown",
      cover: "/songs/covers/atrocity.jpg",
      snippet: "/songs/rap/dance_water.mp3",
      categories: ["rap"],
      dailyCategory: "Rap", 
    },
  ],
  "2026-01-09": [
    {
      title: "Tom's Diner (7\" A)",
      artist: "Suzanne Vega & DNA",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/df/a9/8c/dfa98c94-bbe5-99fb-e4e6-782c300823e8/00075021536326.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/rock/suzanne_vega_dna_tom_s_diner_7_a.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Centuries",
      artist: "Fall Out Boy",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/ea/5f/87/ea5f87ea-4bc3-0e01-456c-37401a4268f2/14UMGIM60337.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/rock/fall_out_boy_centuries.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Young, Wild & Free (feat. Bruno Mars)",
      artist: "Snoop Dogg & Wiz Khalifa",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/b1/cc/48/b1cc4833-4fcc-7c21-2c31-25c7bd18daa1/mzi.rviprhvj.jpg/600x600bb.jpg",
      snippet: "/songs/pop/snoop_dogg_wiz_khalifa_young_wild_free_feat_bruno_mars.mp3",
      categories: ["rap"],
      dailyCategory: "Rap", 
    },
  ],
  "2026-01-10": [
    {
      title: "Rolling in the Deep",
      artist: "Adele",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/d8/e3/f9/d8e3f9ea-d6fe-9a1b-9f13-109983d3062e/191404113868.png/600x600bb.jpg",
      snippet: "/songs/pop/adele_rolling_in_the_deep.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "High Hopes",
      artist: "Pink Floyd",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/f7/47/bf/f747bf4c-6a88-c26f-9545-f0ffed0b8992/886445627572.jpg/600x600bb.jpg",
      snippet: "/songs/rock/pink_floyd_high_hopes.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "tv off (feat. Lefty Gunplay)",
      artist: "Kendrick Lamar",
      cover: "/songs/covers/gnx.jpg",
      snippet: "/songs/rap/tv_off.mp3",
      categories: ["rap"],
      dailyCategory: "Rap", 
    },
  ],
  "2026-01-11": [
    {
      title: "Locked Out of Heaven",
      artist: "Bruno Mars",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/e0/a4/7c/e0a47c6f-005a-9f9f-ce29-8e858e2bcfcb/075679957283.jpg/600x600bb.jpg",
      snippet: "/songs/pop/bruno_mars_locked_out_of_heaven.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Child In Time",
      artist: "Deep Purple",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music/70/0e/2f/mzi.gdbiuzww.jpg/600x600bb.jpg",
      snippet: "/songs/rock/deep_purple_child_in_time_live.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Rolex",
      artist: "Ayo & Teo",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/04/57/2b/04572be8-c471-9f50-4a20-a8f4b10a80dc/886446429465.jpg/600x600bb.jpg",
      snippet: "/songs/rap/ayo_teo_rolex.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
   "2026-01-12": [
    {
      title: "Like a G6",
      artist: "Far East Movement, The Cataracs & Dev",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/5f/69/26/5f6926ea-5a7f-17d9-25ce-dbcddfbc14d8/10UMGIM25431.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/pop/far_east_movement_the_cataracs_dev_like_a_g6.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "In the Shadows",
      artist: "The Rasmus",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music113/v4/46/f0/9d/46f09d24-2f25-876c-af34-8fa3e22827bf/cover.jpg/600x600bb.jpg",
      snippet: "/songs/pop/the_rasmus_lost_frequencies_in_the_shadows_lost_frequencies_remake.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Feather (feat. Cise Starr & Akin)",
      artist: "Nujabes",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/ad/18/6b/ad186b39-cd19-fa4d-abe0-bf6860cd8d9d/POCS-30003_jkt.jpg/600x600bb.jpg",
      snippet: "/songs/rap/nujabes_feather_feat_cise_starr_akin.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-01-13": [
    {
      title: "The One That Got Away",
      artist: "Katy Perry",
      cover: "/songs/covers/teenagedream.jpg",
      snippet: "/songs/pop/the_one_that.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Call Me",
      artist: "Blondie",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/72/73/8f/72738f62-d8a1-f1f9-e84d-244ff697d1db/13UABIM56926.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/pop/blondie_call_me.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Hit 'Em Up",
      artist: "2Pac",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/72/00/89/720089d8-c063-a323-e0cc-de921e50b968/00602527051789.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/rap/2pac_hit_em_up.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-01-14": [
    {
      title: "The A Team",
      artist: "Ed Sheeran",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Features115/v4/65/fb/84/65fb8432-f539-d67d-0670-b1358d16e5af/contsched.zkbwdtfj.jpg/600x600bb.jpg",
      snippet: "/songs/pop/ed_sheeran_the_a_team.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Lady Writer",
      artist: "Dire Straits",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/cc/bb/a0/ccbba061-8408-8735-8ef3-c2e62b474af5/dj.ohdjbqez.jpg/600x600bb.jpg",
      snippet: "/songs/pop/dire_straits_lady_writer.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Remember the Name (feat. Styles of Beyond)",
      artist: "Fort Minor",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/ab/03/ab/ab03ab77-c4f1-d740-8561-3cb3042b61c4/093624906988.jpg/600x600bb.jpg",
      snippet: "/songs/rap/fort_minor_remember_the_name_feat_styles_of_beyond.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
   "2026-01-15": [
    {
      title: "Stronger (What Doesn't Kill You)",
      artist: "Kelly Clarkson",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music/68/81/4f/mzi.wrtaopaz.jpg/600x600bb.jpg",
      snippet: "/songs/pop/kelly_clarkson_stronger_what_doesn_t_kill_you.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "In the Air Tonight",
      artist: "Phil Collins",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/e2/64/d1/e264d18c-2b20-051d-3fc3-68b3424f8cde/603497880249.jpg/600x600bb.jpg",
      snippet: "/songs/rock/phil_collins_in_the_air_tonight.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "No Role Modelz",
      artist: "J. Cole",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/ee/28/67/ee286794-6c33-a8c2-5c37-c04f1cb5e8a6/21UM1IM54415.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/rap/j_cole_no_role_modelz.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-01-16": [
    {
      title: "My Head & My Heart",
      artist: "Ava Max",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/94/74/1e/94741ee9-bb3c-4c9f-da27-e04d9878faae/075679797032.jpg/600x600bb.jpg",
      snippet: "/songs/pop/ava_max_my_head_my_heart.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Shape of My Heart",
      artist: "Sting",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/59/ac/f4/59acf4db-0ea8-a8e5-5607-01e931bb2d58/06UMGIM49867.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/rock/sting_shape_of_my_heart.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Praise The Lord (Da Shine) [feat. Skepta]",
      artist: "A$AP Rocky",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/d3/91/9c/d3919c54-3426-07a2-91a4-b4e46b2a8d34/886447076453.jpg/600x600bb.jpg",
      snippet: "/songs/rap/a_ap_rocky_praise_the_lord_da_shine_feat_skepta.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-01-17": [
    {
      title: "Wrecking Ball",
      artist: "Miley Cyrus",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/e3/e0/84/e3e08400-2d03-75f9-6b8b-a3345452aa98/886444197816.jpg/600x600bb.jpg",
      snippet: "/songs/pop/miley_cyrus_wrecking_ball.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Have You Ever Seen the Rain?",
      artist: "Creedence Clearwater Revival",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/fb/93/81/fb938141-0ec9-ff80-3b57-3d3d0979e4b3/00888072356085.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/rock/creedence_clearwater_revival_have_you_ever_seen_the_rain.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Sound of da Police",
      artist: "KRS-One",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/8e/38/c8/8e38c8c0-b0de-82c3-87a5-1e4c23fa4963/dj.ryotsuac.jpg/600x600bb.jpg",
      snippet: "/songs/rap/krs_one_sound_of_da_police.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-01-18": [
    {
      title: "How You Like That",
      artist: "Blackpink",
      cover: "/songs/covers/album.jpg",
      snippet: "/songs/pop/how_you_like_that.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Can't Stop",
      artist: "Red Hot Chili Peppers",
      cover: "/songs/covers/byway.jpg",
      snippet: "/songs/rock/cant_stop.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Hotline Bling",
      artist: "Drake",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/f2/0d/8b/f20d8bff-a927-ae98-6784-20a1f51cb23e/16UMGIM27642.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/rap/drake_hotline_bling.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-01-19": [
    {
      title: "Dandelions",
      artist: "Ruth B.",
      cover: "/songs/covers/dandelions.jpg",
      snippet: "/songs/pop/dandelions.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Rollin' (Air Raid Vehicle)",
      artist: "Limp Bizkit",
      cover: "/songs/covers/chocolate.jpg",
      snippet: "/songs/rock/rollin.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Airplanes (feat. Hayley Williams)",
      artist: "B.o.B feat. Hayley Williams",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/bc/f8/ed/bcf8ed12-42b0-b50f-9dab-e9124d26137a/mzi.rklkakdk.jpg/600x600bb.jpg",
      snippet: "/songs/rap/b_o_b_feat_hayley_williams_airplanes_feat_hayley_williams.mp3",
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
  // Jeśli funkcja została wywołana bez argumentu (np. przyciskiem "Next"),
  // użyj aktualnie przefiltrowanych piosenek ze stanu.
  const list = songsList || filteredSongs;

  if (!list || list.length === 0) {
    console.error("Brak piosenek do losowania!");
    return;
  }
  
  const idx = Math.floor(Math.random() * list.length);
  const song = list[idx];
  
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
  if (!songsData) return;

  // Obsługa tablicy bezpośredniej (tak jak masz w aaaa.txt)
  const allSongs = Array.isArray(songsData) ? songsData : songsData.songs;

  const filtered = cat === "all"
    ? allSongs
    : allSongs.filter((s) => {
        // ZABEZPIECZENIE: Sprawdzamy czy s istnieje, czy ma categories i czy to tablica
        return s && s.categories && Array.isArray(s.categories) && 
               s.categories.some((c) => c && c.toLowerCase().includes(cat.toLowerCase()));
      });

  if (!filtered || filtered.length === 0) {
    console.error("Nie znaleziono piosenek dla kategorii:", cat);
    return;
  }

  setCategory(cat);
  setFilteredSongs(filtered);
  setMode("category");

  // WAŻNE: Przekazujemy 'filtered', bo stan 'filteredSongs' nie odświeża się natychmiast
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
