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
    "2026-01-20": [
    {
      title: "Mr. Saxobeat",
      artist: "Alexandra Stan",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/90/91/83/909183ff-bc63-8cfc-4f0f-ac742912286c/0617465300950.jpg/600x600bb.jpg",
      snippet: "/songs/pop/alexandra_stan_mr_saxobeat_radio_edit.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "September",
      artist: "Earth, Wind & Fire",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/ab/31/40/ab314083-718f-b292-2c3e-982c166257e0/mzi.ioethdgk.jpg/600x600bb.jpg",
      snippet: "/songs/rock/earth_wind_fire_september_live.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "It Was A Good Day",
      artist: "Ice Cube",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/69/2f/1a/692f1a70-dc15-3a30-6a33-84623a9c49b8/23UM1IM17850.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/rap/ice_cube_it_was_a_good_day.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-01-21": [
    {
      title: "Sugar",
      artist: "Maroon 5",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/b7/25/76/b72576f1-072e-3da2-60d5-2724a9bccf4a/14UMGIM31673.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/pop/maroon_5_sugar.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Coming Undone",
      artist: "Korn",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/05/87/ad/0587ad45-51e5-f00c-48a4-941452a65d85/5054526859951.jpg/600x600bb.jpg",
      snippet: "/songs/rock/korn_coming_undone.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "rockstar (feat. 21 Savage)",
      artist: "Post Malone",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/55/9f/fb/559ffb75-3c00-abd6-7b1f-8b6b1518b173/18UMGIM22101.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/rap/post_malone_rockstar_feat_21_savage.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-01-22": [
    {
      title: "Astronomia",
      artist: "Vicetone & Tony Igy",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/61/70/24/6170245a-cf39-29a5-a4e4-553f84bb86c4/886446088099.jpg/600x600bb.jpg",
      snippet: "/songs/pop/vicetone_tony_igy_astronomia.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Creep (Acoustic)",
      artist: "Radiohead",
      cover: "/songs/covers/honey.jpg",
      snippet: "/songs/rock/creep.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Can I Kick It?",
      artist: "A Tribe Called Quest",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/f8/28/e9/f828e985-7724-112e-1658-80f9dea61952/dj.zpkqadnl.jpg/600x600bb.jpg",
      snippet: "/songs/rap/a_tribe_called_quest_can_i_kick_it.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-01-23": [
    {
      title: "Everything I Wanted",
      artist: "Billie Eilish",
      cover: "/songs/covers/everythingwanted.jpg",
      snippet: "/songs/pop/everything_wanted.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Summer of '69",
      artist: "Bryan Adams",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/e4/9b/c2/e49bc283-607b-9f0b-d7d4-adaba6cd3ff3/14UMGIM34434.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/rock/bryan_adams_summer_of_69.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "BILLIE EILISH.",
      artist: "Armani White",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/89/db/38/89db38db-1dfc-3fd7-cb0d-fcb95b8bdb37/22UMGIM62666.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/rap/armani_white_billie_eilish.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-01-24": [
    {
      title: "Sports Car",
      artist: "Tate McRae",
      cover: "/songs/covers/so_close_to_what.jpg",
      snippet: "/songs/pop/sports_car.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Mr. Blue Sky",
      artist: "Electric Light Orchestra",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/a3/6e/74/a36e7450-3818-f2c1-a137-d4ef5934c119/827969448922.jpg/600x600bb.jpg",
      snippet: "/songs/rock/electric_light_orchestra_mr_blue_sky.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Crank That (Soulja Boy)",
      artist: "Soulja Boy Tell 'Em",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/ec/4e/2f/ec4e2f2a-d74c-8d6d-3ec1-b8fe83eb8053/07UMGIM13400.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/rap/soulja_boy_tell_em_crank_that_soulja_boy.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-01-25": [
    {
      title: "As It Was",
      artist: "Harry Styles",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/2a/19/fb/2a19fb85-2f70-9e44-f2a9-82abe679b88e/886449990061.jpg/600x600bb.jpg",
      snippet: "/songs/pop/harry_styles_as_it_was.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Yellow",
      artist: "Coldplay",
      cover: "/songs/covers/parachutes.jpg",
      snippet: "/songs/pop/yellow.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "goosebumps",
      artist: "Travis Scott",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/b8/e5/27/b8e527c8-aaf4-c7b7-5562-c479458ed7d9/886446092645.jpg/600x600bb.jpg",
      snippet: "/songs/rap/travis_scott_goosebumps.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-01-26": [
    {
      title: "Let Me Entertain You",
      artist: "Robbie Williams",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/70/87/d6/7087d62d-f751-c9c3-5c5c-d3fe7caa307b/13UABIM56247.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/pop/robbie_williams_let_me_entertain_you.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Welcome To The Jungle",
      artist: "Guns N' Roses",
      cover: "/songs/covers/appetite.jpg",
      snippet: "/songs/rock/welcome_jungle.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Ice Ice Baby",
      artist: "Vanilla Ice",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/a1/6f/fb/a16ffb26-747f-5509-1233-2e472c293a89/13UABIM50850.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/rap/vanilla_ice_ice_ice_baby.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-01-27": [
    {
      title: "Beautiful Things",
      artist: "Benson Boone",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/54/f4/92/54f49210-e260-b519-ebbd-f4f40ee710cd/054391342751.jpg/600x600bb.jpg",
      snippet: "/songs/pop/benson_boone_beautiful_things.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Psycho Killer",
      artist: "Talking Heads",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music/y2004/m08/d17/h21/s06.xwrnkppg.jpg/600x600bb.jpg",
      snippet: "/songs/rock/talking_heads_psycho_killer.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "The Time Is Now",
      artist: "John Cena & Tha Trademarc",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/f7/1a/1b/f71a1bce-ebf2-66cc-e1c8-b2563719dc22/mzi.nzichsfo.jpg/600x600bb.jpg",
      snippet: "/songs/rap/john_cena_tha_trademarc_the_time_is_now.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-01-28": [
    {
      title: "Harder Better Faster Stronger",
      artist: "Daft Punk",
      cover: "/songs/covers/discovery.jpg",
      snippet: "/songs/pop/harder_better.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Jerk It Out",
      artist: "Caesars",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music6/v4/36/08/55/36085508-0a77-329e-5d72-f340b9020c58/0724358368659_1401x1401_300dpi.jpg/600x600bb.jpg",
      snippet: "/songs/pop/caesars_jerk_it_out.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Babydoll",
      artist: "Dominic Fike",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/2d/37/18/2d3718e9-8620-b603-d3cc-f34ce817070d/886447290170.jpg/600x600bb.jpg",
      snippet: "/songs/rock/dominic_fike_babydoll.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-01-29": [
    {
      title: "My All",
      artist: "Mariah Carey",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/b8/fb/9b/b8fb9b86-32ab-5f6a-0e50-35b0e991ee44/mzi.stdlgspm.jpg/600x600bb.jpg",
      snippet: "/songs/rock/chris_isaak_wicked_game.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Wicked Game",
      artist: "Chris Isaak",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/d0/34/9b/d0349b33-35fb-8913-8755-08b6a1bdd382/21UMGIM47740.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/rock/chris_isaak_wicked_game.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "So Sick",
      artist: "Ne-Yo",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/3c/0e/86/3c0e86f7-60bd-6c3d-024f-a4877b16b0e3/06UMGIM17731.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/pop/ne_yo_so_sick.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
   "2026-01-30": [
    {
      title: "Disturbia",
      artist: "Rihanna",
      cover: "/songs/covers/goodgirl.jpg",
      snippet: "/songs/pop/disturbia.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Wind of Change",
      artist: "Scorpions",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/65/29/ca/6529cad4-827a-8aa5-ebbc-f9de2ea33af2/00602567825265.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/rock/scorpions_wind_of_change.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Candy Shop (feat. Olivia)",
      artist: "50 Cent",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/b6/50/07/b650079b-15db-74fb-5395-ff7ef7c5a45e/17UMGIM93593.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/rap/50_cent_candy_shop_feat_olivia.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-01-31": [
    {
      title: "Good Luck, Babe!",
      artist: "Chappell Roan",
      cover: "/songs/covers/goodluck.jpg",
      snippet: "/songs/pop/good_luck_babe.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Today",
      artist: "The Smashing Pumpkins",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/3a/dc/08/3adc08b0-e98c-b5dd-943e-a37c7ed06205/13UABIM03615.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/rock/the_smashing_pumpkins_today.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Lemonade (feat. NAV)",
      artist: "Internet Money, Gunna & Don Toliver",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/6f/6e/5f/6f6e5f75-7a2c-91c0-6ecc-5ed0c93e89e1/842812133862.jpg/600x600bb.jpg",
      snippet: "/songs/rap/internet_money_gunna_don_toliver_lemonade_feat_nav.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-02-01": [
    {
      title: "Abracadabra",
      artist: "Lady Gaga",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/54/64/2c/54642c8f-4c6c-5e55-45ea-475f98cf74b4/25UMGIM06790.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/pop/lady_gaga_abracadabra.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "The Emptiness Machine (Instrumental)",
      artist: "Linkin Park",
      cover: "/songs/covers/fromzero.jpg",
      snippet: "/songs/rock/emptiness_machine.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Luther",
      artist: "Kendrick Lamar",
      cover: "/songs/covers/gnx.jpg",
      snippet: "/songs/rap/luther.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-02-02": [
    {
      title: "Video Games",
      artist: "Lana Del Rey",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/5f/d9/63/5fd96387-45fa-6b94-afd8-7b2c4a24a93b/11UMGIM38959.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/rock/lana_del_rey_video_games.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Scar Tissue",
      artist: "Red Hot Chili Peppers",
      cover: "/songs/covers/califo.jpg",
      snippet: "/songs/rock/scar_tissue.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "WAP (feat. Megan Thee Stallion)",
      artist: "Cardi B",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/ec/f5/45/ecf545c0-24bd-90de-7639-3069e648c51d/075679804938.jpg/600x600bb.jpg",
      snippet: "/songs/rap/cardi_b_wap_feat_megan_thee_stallion.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-02-03": [
    {
      title: "I'm Still Standing",
      artist: "Elton John",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/45/e5/b4/45e5b409-0564-a7a3-186c-1dc116c3ffb7/06UMGIM49712.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/pop/elton_john_i_m_still_standing.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Vienna",
      artist: "Billy Joel",
      cover: "/songs/covers/stranger.jpg",
      snippet: "/songs/rock/vienna.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Roses",
      artist: "Outkast",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/71/ae/6a/71ae6a46-99a6-e9d8-d7f3-41c0f2df45c4/196872579123.jpg/600x600bb.jpg",
      snippet: "/songs/rap/outkast_roses.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-02-04": [
    {
      title: "Man I Need",
      artist: "Olivia Dean",
      cover: "/songs/covers/artloving.jpg",
      snippet: "/songs/pop/man_need.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Going Under",
      artist: "Evanescence",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/10/4c/21/104c21e6-9ef0-4d3a-d1bd-d47167f121e5/00601501406300.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/rock/evanescence_going_under.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Mamushi (feat. Yuki Chiba)",
      artist: "Megan Thee Stallion",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/74/98/bc/7498bce2-125d-a550-401e-71a2a4c354a6/075679642578.jpg/600x600bb.jpg",
      snippet: "/songs/rap/megan_thee_stallion_mamushi_feat_yuki_chiba.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-02-05": [
    {
      title: "Prayer in C (Robin Schulz Radio Edit)",
      artist: "Lilly Wood & The Prick and Robin Schulz",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/2b/55/c2/2b55c258-0f75-bdee-dfce-abdee319a134/825646217687.jpg/600x600bb.jpg",
      snippet: "/songs/pop/lilly_wood_the_prick_and_robin_schulz_prayer_in_c_robin_schulz_radio_edit.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "ballad of a homeschooled girl",
      artist: "Olivia Rodrigo",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/9b/d8/9c/9bd89c9e-b44d-ad25-1516-b9b30f64fd2a/23UMGIM71510.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/pop/olivia_rodrigo_ballad_of_a_homeschooled_girl.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "C.R.E.A.M. (feat. Method Man, Raekwon, Inspectah Deck & Buddha Monk)",
      artist: "Wu-Tang Clan",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/7c/58/b1/7c58b153-2525-d47f-ab7a-9c9fe6882826/888880400017.jpg/600x600bb.jpg",
      snippet: "/songs/rap/wu_tang_clan_c_r_e_a_m_cash_rules_everything_around_me_a_cappella.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
   "2026-02-06": [
    {
      title: "Gabriela",
      artist: "KATSEYE",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/ad/92/ca/ad92ca90-90f5-eb46-7a56-e7b6b88584f7/25UMGIM37394.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/pop/katseye_gabriela.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Fly Away",
      artist: "Lenny Kravitz",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/e6/e6/2b/e6e62b8d-3616-dc96-b65e-9ff31eddecd3/13UABIM59279.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/rock/lenny_kravitz_fly_away.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Money In My Pocket (MOMO)",
      artist: "MISAMO",
      cover: "a",
      snippet: "/songs/pop/dennis_brown_money_in_my_pocket.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-02-07": [
    {
      title: "Material Girl",
      artist: "Madonna",
      cover: "/songs/covers/likevirgin.jpg",
      snippet: "/songs/pop/material_girl.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Stricken",
      artist: "Disturbed",
      cover: "/songs/covers/tenfists.jpg",
      snippet:"/songs/rock/stricken.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Lollipop (feat. Static Major)",
      artist: "Lil Wayne",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/ad/59/2b/ad592bdf-0fd7-857f-3ca5-12f1d4861e3e/08UMGIM15512.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/rap/lil_wayne_lollipop_feat_static_major.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-02-08": [
    {
      title: "Faded",
      artist: "Alan Walker",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/1f/48/c0/1f48c0ab-7710-1724-e737-b2f6e106a747/7333236909117.png/600x600bb.jpg",
      snippet: "/songs/pop/alan_walker_fade.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "That's All",
      artist: "Genesis",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/8b/7b/ce/8b7bcee5-4c31-aab1-7a65-82e757057e83/mzi.ykiyfzna.jpg/600x600bb.jpg",
      snippet:"/songs/rock/genesis_that_s_all.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Lean Back",
      artist: "Terror Squad",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/59/6b/86/596b86a4-6dd1-70e3-5a57-4539c11a137a/00602498627518.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/rap/terror_squad_lean_back.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
    "2026-02-09": [
    {
      title: "More Than You Know",
      artist: "Axwell Λ Ingrosso",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Features126/v4/ac/cb/f3/accbf323-a631-12eb-3977-0563254dd89e/mza_8588403352509644499.png/600x600bb.jpg",
      snippet: "/songs/pop/axwell_ingrosso_more_than_you_know_mixed.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Welcome to the Black Parade",
      artist: "My Chemical Romance",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/7e/ac/69/7eac6998-7fa4-f1ab-9601-e8b791c736fa/mzi.fbpszunc.jpg/600x600bb.jpg",
      snippet: "/songs/rock/my_chemical_romance_welcome_to_the_black_parade.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Yeah! (feat. Lil Jon & Ludacris)",
      artist: "USHER",
      cover: "a",
      snippet: "/songs/rap/houch30_usher_yeah.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-02-10": [
    {
      title: "Work from Home (feat. Ty Dolla $ign)",
      artist: "Fifth Harmony",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/5e/35/68/5e3568b7-3e08-cdac-d0d9-122fc0429f08/886445883091.jpg/600x600bb.jpg",
      snippet: "/songs/pop/fifth_harmony_work_from_home_feat_ty_dolla_ign.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Stayin' Alive",
      artist: "Bee Gees",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music113/v4/45/db/1d/45db1dac-fe00-3681-b216-266deea6e4cc/17UM1IM26789.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/pop/bee_gees_stayin_alive.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Wild Thoughts (feat. Rihanna & Bryson Tiller)",
      artist: "DJ Khaled",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/42/7c/23/427c23ba-78dc-5a27-78c4-1a0e5f0e40da/886446557731.jpg/600x600bb.jpg",
      snippet: "/songs/rap/dj_khaled_wild_thoughts_feat_rihanna_bryson_tiller.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-02-11": [
    {
      title: "On the Floor (feat. Pitbull)",
      artist: "Jennifer Lopez",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/83/5c/53/835c5395-2138-8f92-70d9-f12819d5885c/11UMGIM10446.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/pop/jennifer_lopez_on_the_floor_feat_pitbull.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Mary On A Cross",
      artist: "Ghost",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/20/72/d3/2072d3b2-238c-1ac2-1f6f-21f683fdc41b/24CRGIM45902.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/rock/ghost_mary_on_a_cross.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Day 'N' Nite",
      artist: "Kid Cudi",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/36/78/1e/36781ee4-be7e-1c54-5a4a-a262faa3a245/09UMGIM33419.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/rap/kid_cudi_day_n_nite_nightmare.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-02-12": [
    {
      title: "Heart of Glass",
      artist: "Blondie",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/2f/0b/25/2f0b252d-838e-4f19-3c08-91e49b269564/15UMGIM18445.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/pop/blondie_heart_of_glass.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "I-E-A-I-A-I-O (Clean Version)",
      artist: "System Of A Down",
      cover: "/songs/covers/steal.jpg",
      snippet: "/songs/rock/ieio.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Hot In Here",
      artist: "Nelly",
      cover: "a",
      snippet: "/songs/pop/rascal_flatts_hot_in_here.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-02-14": [
    {
      title: "Lovely",
      artist: "Billie Eilish & Khalid",
      cover: "/songs/covers/lovely.jpg",
      snippet: "/songs/pop/lovely.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "I Just Called to Say I Love You",
      artist: "Stevie Wonder",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/29/3a/92/293a9224-329d-3ede-ed4c-caba1c045e97/00602547215086.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/pop/stevie_wonder_i_just_called_to_say_i_love_you_single_version.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Love Me (feat. Drake & Future)",
      artist: "Lil Wayne",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/33/55/5c/33555c2f-df24-dd08-b680-d92473948262/603497804955.jpg/600x600bb.jpg",
      snippet: "/songs/pop/madonna_revolver_feat_lil_wayne.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-02-15": [
    {
      title: "Single Ladies (Put a Ring on It)",
      artist: "Beyoncé",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/35/0f/55/350f55da-2104-162a-5872-cb35fef30410/mzi.morbeoaw.jpg/600x600bb.jpg",
      snippet: "/songs/pop/beyonc_single_ladies_put_a_ring_on_it.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Alone",
      artist: "Heart",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/2b/d4/d5/2bd4d595-6839-5d35-a601-a74045f1f7b1/00724352680351.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/rock/heart_alone.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Solo",
      artist: "Future",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/17/e0/ba/17e0ba58-4d11-a4df-7502-d4479b179c0a/886446604046.jpg/600x600bb.jpg",
      snippet: "/songs/rap/future_solo.mp3",
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
