import React, { useState, useRef, useEffect } from "react";
import songsData from "./songs.json";
import SearchBar from "./components/SearchBar";
import "./App.css";

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
      snippet: "/songs/rap/A$APRocky_Peso.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-03-04": [
    {
      title: "Pon de Replay",
      artist: "Rihanna", 
      cover: "/songs/covers/musicsun.jpg",
      snippet: "/songs/pop/pon_replay.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Sweet Dreams (Are Made of This)",
      artist: "Eurythmics",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Features125/v4/ad/d3/3d/add33dea-0a4d-9509-643b-939ba6735733/dj.vpugapfp.jpg/600x600bb.jpg",
      snippet: "/songs/pop/eurythmics_sweet_dreams_are_made_of_this.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "MONACO",
      artist: "Bad Bunny",
      cover: "/songs/covers/nadie.jpg",
      snippet: "/songs/rap/BadBunny _MONACO.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
   "2026-03-05": [
    {
      title: "Can't Get You Out of My Head",
      artist: "Kylie Minogue",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Features115/v4/2d/27/f4/2d27f445-abf6-f360-f56a-683b65c9b842/dj.hhpuvuwv.jpg/600x600bb.jpg",
      snippet: "/songs/pop/kylie_minogue_can_t_get_you_out_of_my_head.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Let It Happen",
      artist: "Tame Impala", 
      cover: "/songs/covers/currents.jpg",
      snippet: "/songs/pop/let_happen.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "STAY",
      artist: "The Kid LAROI & Justin Bieber",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/89/59/6a/89596ab9-fa3c-8d08-4d95-a6450fa2013c/886449400515.jpg/600x600bb.jpg",
      snippet: "/songs/pop/the_kid_laroi_justin_bieber_stay.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-03-06": [
    {
      title: "Watermelon Sugar",
      artist: "Harry Styles",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/2b/c4/c9/2bc4c9d4-3bc6-ab13-3f71-df0b89b173de/886448022213.jpg/600x600bb.jpg",
      snippet: "/songs/pop/harry_styles_watermelon_sugar.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "War Pigs",
      artist: "Black Sabbath",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/27/d2/22/27d222de-b53e-eafe-c1ed-1d36c5c9ac3f/603497870318.jpg/600x600bb.jpg",
      snippet: "/songs/rock/black_sabbath_war_pigs.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Touch the Sky (feat. Lupe Fiasco)",
      artist: "Kanye West",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/0e/90/3c/0e903c43-9d81-f91b-90f1-727a58f7fb2c/00602498824030.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/rap/kanye_west_touch_the_sky_feat_lupe_fiasco.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
   "2026-03-07": [
    {
      title: "Bailando (Spanish Version) [feat. Descemer Bueno & Gente de Zona]",
      artist: "Enrique Iglesias",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/d4/ec/f5/d4ecf56c-2fb8-d529-b6bd-27ffcd43bb17/00602547230461.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/pop/enrique_iglesias_bailando_feat_sean_paul_descemer_bueno_gente_de_zona_english_version.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Nemo",
      artist: "Nightwish",
      cover: "/songs/covers/once.jpg",
      snippet: "/songs/rock/malcolm_todd_nemo.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Jump Around",
      artist: "House of Pain",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/c5/b7/2f/c5b72ff4-d593-ed4c-f7ed-080fb4d224aa/081227911560.png/600x600bb.jpg",
      snippet: "/songs/rap/house_of_pain_jump_around_pete_rock_remix.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-03-08": [
    {
      title: "Dangerous Woman",
      artist: "Ariana Grande",
      cover: "/songs/covers/woman.jpg",
      snippet: "/songs/pop/dangerous_woman.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "She's Always a Woman",
      artist: "Billy Joel",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/f0/7a/54/f07a54ab-3ebc-6813-e515-86200b8138fc/dj.uthntyfe.jpg/600x600bb.jpg",
      snippet: "/songs/pop/billy_joel_she_s_always_a_woman.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Woman",
      artist: "Doja Cat",
      cover: "/songs/covers/her.jpg",
      snippet: "/songs/pop/woman.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-03-09": [
    {
      title: "Blank Space",
      artist: "Taylor Swift",
      cover: "/songs/covers/1989.jpg",
      snippet: "/songs/pop/blank_space.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Aerials",
      artist: "System Of A Down", 
      cover: "/songs/covers/toxicity.jpg",
      snippet: "/songs/rock/aerials.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Stargazing",
      artist: "Travis Scott",
      cover: "/songs/covers/astro.jpg",
      snippet: "/songs/rap/stargazing.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-03-10": [
    {
      title: "When I Was Your Man",
      artist: "Bruno Mars",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/e0/a4/7c/e0a47c6f-005a-9f9f-ce29-8e858e2bcfcb/075679957283.jpg/600x600bb.jpg",
      snippet: "/songs/pop/bruno_mars_when_i_was_your_man.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Man On the Moon",
      artist: "R.E.M.",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/97/1a/9b/971a9bf7-b6dc-8712-ac3a-1d4351512c8b/17CRGIM03466.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/rock/r_e_m_man_on_the_moon.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Moonlight",
      artist: "XXXTENTACION",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/93/49/bb/9349bb3b-317d-57c3-966a-71fa25247dc2/19UMGIM41705.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/pop/xxxtentacion_moonlight_instrumental.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-03-11": [
    {
      title: "Material Girl",
      artist: "Madonna",
      cover: "/songs/covers/likevirgin.jpg",
      snippet: "/songs/pop/material_girl.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Englishman In New York",
      artist: "Sting",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/42/b7/db/42b7dbe1-d13f-c600-5b78-daa57c5d0f08/06UMGIM50761.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/rock/sting_englishman_in_new_york.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Wonderbread",
      artist: "Danny Brown",
      cover: "/songs/covers/old.jpg",
      snippet: "/songs/rap/DannyBrown_Wonderbread.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
   "2026-03-12": [
    {
      title: "7 rings",
      artist: "Ariana Grande",
      cover: "/songs/covers/thanku.jpg",
      snippet: "/songs/pop/7rings.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Man In the Box",
      artist: "Alice In Chains",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music/2f/47/fa/mzi.effcotrm.jpg/600x600bb.jpg",
      snippet: "/songs/rock/alice_in_chains_man_in_the_box_live.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Stronger",
      artist: "Kanye West",
      cover: "/songs/covers/graduation.jpg",
      snippet: "/songs/rap/stronger.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-03-13": [
    {
      title: "SexyBack (feat. Timbaland)",
      artist: "Justin Timberlake",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/4c/44/30/4c4430dd-150b-d393-ec70-4894975f4b16/888880422095.jpg/600x600bb.jpg",
      snippet: "/songs/pop/justin_timberlake_sexyback_feat_timbaland.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "You're Gonna Go Far, Kid",
      artist: "The Offspring",
      cover: "/songs/covers/risefall.jpg",
      snippet: "/songs/rock/far_kid.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Numb / Encore",
      artist: "JAY-Z & LINKIN PARK",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/13/44/05/134405bd-9e27-a678-8953-b5f724201f95/093624948988.jpg/600x600bb.jpg",
      snippet: "/songs/rock/linkin_park_numb.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-03-14": [
    {
      title: "S&M",
      artist: "Rihanna",
      cover: "/songs/covers/loud.jpg",
      snippet: "/songs/pop/sm.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "California Dreamin'",
      artist: "The Mamas & The Papas",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music/8f/88/74/mzi.rvuonofp.jpg/600x600bb.jpg",
      snippet: "/songs/rock/the_mamas_the_papas_california_dreamin_live.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Low (feat. T-Pain)",
      artist: "Flo Rida", 
      cover: "/songs/covers/mail.jpg",
      snippet: "/songs/rap/low.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-03-15": [
    {
      title: "Vampire",
      artist: "Olivia Rodrigo",
      cover: "/songs/covers/guts.jpg",
      snippet: "/songs/pop/vampire.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Dreams",
      artist: "Fleetwood Mac",
      cover: "/songs/covers/rumours.jpg",
      snippet: "/songs/rock/dreams.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Money Trees (feat. Jay Rock)",
      artist: "Kendrick Lamar",
      cover: "/songs/covers/gkmd.jpg",
      snippet: "/songs/rap/money_trees.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-03-16": [
    {
      title: "Narcotic",
      artist: "Liquido",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/9f/b9/7b/9fb97b71-aa99-2d0a-cb53-69443c427bd7/859784003444_cover.jpg/600x600bb.jpg",
      snippet: "/songs/pop/bryce_savage_narcotic.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Ruby",
      artist: "Kaiser Chiefs",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music128/v4/c5/e6/83/c5e6833f-f0c8-a2e1-13b2-ba7e9a170eb5/00602547151865.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/rock/kaiser_chiefs_ruby.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Empire State Of Mind (feat. Alicia Keys)",
      artist: "JAŸ-Z",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/17/4a/a7/174aa7ea-0116-6240-1187-1efb51552833/00602527586502.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/rap/ja_z_empire_state_of_mind_feat_alicia_keys.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-03-17": [
    {
      title: "Best Day of My Life",
      artist: "American Authors",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/fe/6c/79/fe6c7944-593e-43b8-5ca2-3ca61cdbd393/14UMGIM01329.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/rock/american_authors_best_day_of_my_life_acoustic.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Beautiful Day",
      artist: "U2",
      cover: "/songs/covers/cantleave.jpg",
      snippet: "/songs/rock/beautiful_day.mp3",
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
  "2026-03-18": [
    {
      title: "Where Is The Love",
      artist: "Black Eyed Peas", 
      cover: "/songs/covers/elephunk.jpg",
      snippet: "/songs/pop/where_love.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Still Waiting",
      artist: "Sum 41",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/59/bb/db/59bbdb07-a7f5-0d57-1277-86cda40ac95e/So_Tuff_So_Cute_EDCLV22.png/600x600bb.jpg",
      snippet: "/songs/pop/sum_41_still_waiting_mixed.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "WAIT FOR U (feat. Drake & Tems)",
      artist: "Future",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/c8/4c/fa/c84cfa03-1916-89f1-5362-03425fbe2ff9/196589073709.jpg/600x600bb.jpg",
      snippet: "/songs/rap/future_wait_for_u_feat_drake_tems.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-03-19": [
    {
      title: "Friends",
      artist: "Marshmello & Anne-Marie",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/43/4d/a2/434da25b-fa20-9454-96c7-c23f236f3876/0.jpg/600x600bb.jpg",
      snippet: "/songs/pop/ssstas_marshmello_anne_marie_friends_remix.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Smooth Operator",
      artist: "Sade",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/4d/d5/a1/4dd5a1b7-7134-f0ec-b55c-54ac47cc88a5/886448655886.jpg/600x600bb.jpg",
      snippet: "/songs/pop/sade_smooth_operator.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Man's Not Hot",
      artist: "Big Shaq",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/4a/54/3e/4a543e0a-fdda-4d89-4dc0-b67c7743c18f/00602567083108.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/rap/big_shaq_man_s_not_hot.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-03-20": [
    {
      title: "Wrecking Ball",
      artist: "Miley Cyrus",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/e3/e0/84/e3e08400-2d03-75f9-6b8b-a3345452aa98/886444197816.jpg/600x600bb.jpg",
      snippet: "/songs/pop/miley_cyrus_wrecking_ball.mp3",
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
      title: "Like Jennie",
      artist: "Jennie",
      cover: "/songs/covers/ruby.jpg",
      snippet: "/songs/pop/jennie.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-03-21": [
    {
      title: "Rasputin",
      artist: "Boney M.",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/b7/86/45/b786452a-a723-eaed-8170-cdc261367eb7/886443575578.jpg/600x600bb.jpg",
      snippet: "/songs/pop/boney_m_rasputin.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "To Hell and Back",
      artist: "Sabaton",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/21/b8/41/21b84170-87e6-d667-599a-c8a6ab0a9f8b/cover.jpg/600x600bb.jpg",
      snippet: "/songs/rock/sabaton_to_hell_and_back.mp3",
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
   "2026-03-23": [
    {
      title: "Applause",
      artist: "Lady Gaga",
      cover: "/songs/covers/pinkpop.jpg",
      snippet:"/songs/pop/applause.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Are You Gonna Go My Way",
      artist: "Lenny Kravitz",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/9e/34/ce/9e34ced5-4d33-fbe0-1ddc-192593c827a9/13UABIM49119.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/rock/lenny_kravitz_are_you_gonna_go_my_way.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Forgot About Dre (feat. Eminem)",
      artist: "Dr. Dre",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/07/d4/d9/07d4d90d-704e-c10e-2203-2b18318a2064/00606949057121.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/rap/dr_dre_forgot_about_dre_feat_eminem_instrumental.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-03-24": [
    {
      title: "Rather Be (feat. Jess Glynne)",
      artist: "Clean Bandit",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/19/e0/1b/19e01b5f-0fd5-85f1-f347-461d4130309a/825646029594.jpg/600x600bb.jpg",
      snippet: "/songs/pop/clean_bandit_rather_be_feat_jess_glynne.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "People Are Strange",
      artist: "The Doors",
      cover: "/songs/covers/strange.jpg",
      snippet: "/songs/rock/strange_people.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Subway Sexists",
      artist: "Yung Spinach Cumshot",
      cover: "/songs/covers/szpinak.jpg",
      snippet: "/songs/rap/Subway_Sexists.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-03-25": [
    {
      title: "Rude Boy",
      artist: "Rihanna",
      cover: "/songs/covers/rated.jpg",
      snippet: "/songs/pop/rude_boy.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "The Passenger",
      artist: "Iggy Pop",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/fb/2c/56/fb2c56ca-05ad-f73f-a1b7-9917081db1b9/17UMGIM08423.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/rock/iggy_pop_the_passenger.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Jocelyn Flores",
      artist: "XXXTENTACION",
      cover: "/songs/covers/17.jpg",
      snippet: "/songs/pop/lrn_slime_shiloh_dynasty_jocelyn_flores.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-03-27": [
    {
      title: "Oops!…I Did It Again",
      artist: "Britney Spears",
      cover: "/songs/covers/oops.jpg",
      snippet: "/songs/pop/oops_again.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Kryptonite",
      artist: "3 Doors Down",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/61/2a/58/612a58ca-af10-cc8f-07ef-b3368ebc9564/07UMGIM12238.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/rock/3_doors_down_kryptonite.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Smack That (feat. Eminem)",
      artist: "Akon featuring Eminem",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/b7/88/33/b78833e4-30eb-739b-d5de-09d2d7db84b3/06UMGIM19420.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/rap/akon_featuring_eminem_smack_that_feat_eminem.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-03-28": [
    {
      title: "Worth It (feat. Kid Ink)",
      artist: "Fifth Harmony",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/98/e0/57/98e0573f-52c5-b8bf-f2cf-6246d055c60d/dj.kmbgqmzy.jpg/600x600bb.jpg",
      snippet: "/songs/pop/fifth_harmony_worth_it_feat_kid_ink.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Still Loving You",
      artist: "Scorpions",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/8d/a4/f9/8da4f95f-4162-9d31-7131-fe49337a1689/00731453478626.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/rock/scorpions_no_one_like_you.mp3",
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
   "2026-03-29": [
    {
      title: "Pink Pony Club",
      artist: "Chappell Roan",
      cover: "/songs/covers/princess.jpg",
      snippet: "/songs/pop/pink_pony.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Like a Stone",
      artist: "Audioslave",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Features115/v4/9c/b6/c2/9cb6c246-3626-7789-26a9-79b787e5668d/dj.owymmnty.jpg/600x600bb.jpg",
      snippet: "/songs/rock/audioslave_like_a_stone.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Fancy (feat. Charli XCX)",
      artist: "Iggy Azalea",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/32/64/0d/32640dc0-879a-2771-cfe7-91ea4568436a/14UMGIM08058.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/rap/iggy_azalea_fancy_feat_charli_xcx.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-03-30": [
    {
      title: "Manchild",
      artist: "Sabrina Carpenter",
      cover: "/songs/covers/mansbest.jpg",
      snippet: "/songs/pop/manchild.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Fear Of The Dark",
      artist: "Iron Maiden", 
      cover: "/songs/covers/feardark.jpg",
      snippet: "/songs/rock/fear_dark.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Helicopter",
      artist: "A$AP Rocky",
      cover: "/songs/covers/dontdumb.jpg",
      snippet: "/songs/rap/goodie_mob_cell_therapy.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
   "2026-03-31": [
    {
      title: "Sweden",
      artist: "C418",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/08/11/31/08113125-d66e-1f90-65d9-08e28000495c/859705593825_cover.jpg/600x600bb.jpg",
      snippet: "/songs/pop/c418_sweden.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "The Winner Takes It All",
      artist: "Abba", 
      cover: "/songs/covers/trouper.jpg",
      snippet: "/songs/pop/winner.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Poland",
      artist: "Lil Yachty",
      cover: "/songs/covers/pzpn.jpg",
      snippet: "/songs/rap/poland.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-04-01": [
    {
      title: "Pop Out",
      artist: "Playboi Carti",
      cover: "/songs/covers/music.jpg",
      snippet: "/songs/pop/the_weeknd_playboi_carti_timeless.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Rock That Body",
      artist: "Black Eyed Peas",
      cover: "/songs/covers/end.jpg",
      snippet: "/songs/pop/rock_body.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Rapapara",
      artist: "Łydka Grubasa",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/64/04/ed/6404edeb-6540-b9b1-8175-1c5bd9b0a99e/cover.jpg/600x600bb.jpg",
      snippet: "/songs/Polskie/lydka_grubasa_rapapara.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-04-02": [
    {
      title: "Alors on danse",
      artist: "Stromae",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/a8/69/90/a869906a-dd48-b772-785b-871459b36df2/10UMGIM03438.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/pop/stromae_alors_on_danse.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Hoppípolla",
      artist: "Sigur Rós",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/ce/3e/b8/ce3eb805-fb13-0200-5856-081ed0014e13/190296926952.jpg/600x600bb.jpg",
      snippet: "/songs/rock/sigur_ros_hopp_polla.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Right Round (feat. Ke$ha)",
      artist: "Flo Rida",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/4e/62/be/4e62be48-6e99-1dbe-622d-8ac2cf92467a/mzi.sngplwsl.jpg/600x600bb.jpg",
      snippet: "/songs/rap/flo_rida_right_round_feat_ke_ha.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-04-03": [
    {
      title: "Happy",
      artist: "Pharrell Williams",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/76/ff/5e/76ff5ee0-7ab4-2ac2-2598-486a9ccc06e1/886444516877.jpg/600x600bb.jpg",
      snippet: "/songs/pop/pharrell_williams_happy_from_despicable_me_2.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Shiny Happy People",
      artist: "R.E.M.",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/05/ae/86/05ae8650-7bce-2377-8959-78ea033a99d9/00888072013711.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/rock/r_e_m_shiny_happy_people.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Wow.",
      artist: "Post Malone",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/6c/13/27/6c13279a-399b-2631-3cb2-6233a91d7a53/19UMGIM78325.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/rap/post_malone_wow.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-04-04": [
    {
      title: "Fame Is A Gun",
      artist: "Addison Rae",
      cover: "/songs/covers/addison.jpg",
      snippet: "/songs/pop/fame_gun.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Mama, I'm Coming Home",
      artist: "Ozzy Osbourne",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/8e/ef/44/8eef4402-508e-860e-a3c0-9be46cf2379e/696998524828.jpg/600x600bb.jpg",
      snippet: "/songs/rock/ozzy_osbourne_mama_i_m_coming_home.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Check the Rhime",
      artist: "A Tribe Called Quest",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/e0/14/c8/e014c80a-425b-e01a-1124-cee985bcb5e6/dj.qafpkddz.jpg/600x600bb.jpg",
      snippet: "/songs/rap/a_tribe_called_quest_check_the_rhime.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
   "2026-04-05": [
    {
      title: "There's Nothing Holdin' Me Back",
      artist: "Shawn Mendes",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/5c/57/e4/5c57e46a-0950-7ebd-8010-28453c1c0055/16UMGIM51723.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/pop/shawn_mendes_there_s_nothing_holdin_me_back.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Sunday Bloody Sunday",
      artist: "U2",
      cover: "/songs/covers/war.jpg",
      snippet: "/songs/rock/bloody_sunday.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Come Back to Earth",
      artist: "Mac Miller",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/e3/38/b5/e338b529-da3f-b4b9-b8f9-1fae428e7a23/093624905899.jpg/600x600bb.jpg",
      snippet: "/songs/rap/mac_miller_come_back_to_earth.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
   "2026-04-06": [
    {
      title: "Set Fire to the Rain",
      artist: "Adele",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/d8/e3/f9/d8e3f9ea-d6fe-9a1b-9f13-109983d3062e/191404113868.png/600x600bb.jpg",
      snippet: "/songs/pop/adele_set_fire_to_the_rain.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Have You Ever Seen the Rain",
      artist: "Creedence Clearwater Revival",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/fb/93/81/fb938141-0ec9-ff80-3b57-3d3d0979e4b3/00888072356085.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/rock/creedence_clearwater_revival_have_you_ever_seen_the_rain.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Water",
      artist: "Tyla",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/1e/c9/5b/1ec95bbc-a56f-cbef-070c-ddec9f4fdd3c/196871296205.jpg/600x600bb.jpg",
      snippet: "/songs/pop/tyla_water.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-04-07": [
    {
      title: "I Love it (feat. Charli XCX)",
      artist: "Icona Pop",
      cover: "/songs/covers/loveit.jpg",
      snippet: "/songs/pop/i_love_it.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Last Nite",
      artist: "The Strokes",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Features115/v4/ea/04/d4/ea04d45d-6f5d-ede6-fb64-71f3e6a6e62f/dj.ojkzzidd.jpg/600x600bb.jpg",
      snippet: "/songs/rock/the_strokes_last_nite.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Panda",
      artist: "Desiigner",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/a1/f1/f9/a1f1f914-6e61-21eb-d787-2d4020654aab/16UMGIM11380.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/rap/desiigner_panda.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-04-08": [
    {
      title: "Back To Black",
      artist: "Amy Winehouse",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music128/v4/cd/6c/11/cd6c11b3-6300-0a29-d211-855847ed2c8c/00602547505040.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/pop/amy_winehouse_back_to_black_original_demo.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Where Is My Mind?",
      artist: "Pixies",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/68/b7/c0/68b7c018-dc15-f44a-2611-be10237fc9a5/652637080308.png/600x600bb.jpg",
      snippet: "/songs/rock/pixies_where_is_my_mind_2007_remaster.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "The Spins",
      artist: "Mac Miller",
      cover: "/songs/covers/kids.jpg",
      snippet: "/songs/pop/mac_miller_the_spins_ben_gerrans_remix_mixed.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-04-09": [
    {
      title: "On My Mind",
      artist: "Ellie Goulding",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/c4/5f/26/c45f26ac-1bd4-1481-ce51-8a4c10bcd757/15UMGIM48135.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/pop/ellie_goulding_on_my_mind.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "I Can't Dance",
      artist: "Genesis",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music/2f/5e/61/mzi.fornxdla.jpg/600x600bb.jpg",
      snippet: "/songs/rock/genesis_i_can_t_dance.mp3",
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
  "2026-04-10": [
    {
      title: "Lover Girl",
      artist: "Laufey",
      cover: "/songs/covers/mattertime.jpg",
      snippet: "/songs/pop/lover_girl.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Every Breath You Take",
      artist: "The Police",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/42/b7/db/42b7dbe1-d13f-c600-5b78-daa57c5d0f08/06UMGIM50761.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/rock/the_police_every_breath_you_take.mp3",
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
  "2026-04-11": [
    {
      title: "Thunder",
      artist: "Imagine Dragons",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/11/7a/b8/117ab805-6811-8929-18b9-0fad7baf0c25/17UMGIM98210.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/rock/imagine_dragons_thunder.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "This Must Be the Place (Naive Melody)",
      artist: "Talking Heads",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music/y2004/m08/d17/h21/s06.xwrnkppg.jpg/600x600bb.jpg",
      snippet: "/songs/rock/talking_heads_this_must_be_the_place_naive_melody.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Mockingbird",
      artist: "Eminem",
      cover: "/songs/covers/encore.jpg",
      snippet: "/songs/rap/bird.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-04-12": [
    {
      title: "Hearthstone Main Theme",
      artist: "Geek Music",
      cover: "/songs/covers/hs.jpg",
      snippet: "/songs/pop/lucasgitanofamily_hearthstone_main_theme_from_heroes_of_warcraft_flamenco_guitar.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Sultans of Swing",
      artist: "Dire Straits",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music/47/c3/21/mzi.ciyzkqao.jpg/600x600bb.jpg",
      snippet: "/songs/rock/dire_straits_sultans_of_swing.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Doo Wop (That Thing)",
      artist: "Lauryn Hill",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/09/6b/55/096b55c4-ee8f-23bd-df8f-0ca0821f3028/886446727189.jpg/600x600bb.jpg",
      snippet:  "/songs/pop/lauryn_hill_doo_wop_that_thing.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-04-13": [
    {
      title: "Torn",
      artist: "Natalie Imbruglia",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/11/5d/f1/115df15e-e05f-b0f1-ae66-3ad2c5e969b4/mzi.ihaejhxb.jpg/600x600bb.jpg",
      snippet: "/songs/pop/natalie_imbruglia_torn.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Heart-Shaped Box",
      artist: "Nirvana",
      cover: "/songs/covers/utero.jpg",
      snippet: "/songs/rock/heart_box.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "I'll Be Missing You (feat. Faith Evans, 112)",
      artist: "Puff Daddy & Faith Evans",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/09/6b/55/096b55c4-ee8f-23bd-df8f-0ca0821f3028/886446727189.jpg/600x600bb.jpg",
      snippet:  "/songs/rap/puff_daddy_faith_evans_i_ll_be_missing_you_feat_faith_evans_112.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-04-14": [
    {
      title: "Please Please Please",
      artist: "Sabrina Carpenter",
      cover: "/songs/covers/short_sweet.jpg",
      snippet: "/songs/pop/ppp.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Rhiannon",
      artist: "Fleetwood Mac",
      cover: "/songs/covers/fleetwood.jpg",
      snippet: "/songs/rock/rhiannon.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Rockstar",
      artist: "Lisa",
      cover: "/songs/covers/alterego.jpg",
      snippet:  "/songs/pop/rockstar_l.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-04-15": [
    {
      title: "Whiplash",
      artist: "Aespa", 
      cover: "/songs/covers/whiplash.jpg",
      snippet: "/songs/pop/whiplash.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Stairway to Heaven",
      artist: "Led Zeppelin", 
      cover: "/songs/covers/zeppelin4.jpg",
      snippet: "/songs/rock/stairway_heaven.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Just a Lil Bit",
      artist: "50 Cent",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/df/10/7c/df107c5d-0a02-8122-f554-7da8b746ef9c/4ad62e53-745e-4db3-94d5-1f7ee80e8bb9.png/600x600bb.jpg",
      snippet:  "/songs/rap/50_cent_just_a_lil_bit_mixed.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-04-16": [
    {
      title: "Bubblegum Bitch",
      artist: "Marina",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/a1/66/cb/a166cb1e-64b5-c1e5-8664-47755c1ae2d7/26027.jpg/600x600bb.jpg",
      snippet: "/songs/pop/leana_mask_bubblegum_bitch.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Day Of The Dead",
      artist: "Hollywood Undead",
      cover: "/songs/covers/daydead.jpg",
      snippet: "/songs/rock/day_dead.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Drop It Like It's Hot (feat. Pharrell Williams)",
      artist: "Snoop Dogg",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/a3/75/27/a3752707-e88a-cf93-423f-c6134156962a/00075021034518.rgb.jpg/600x600bb.jpg",
      snippet:  "/songs/rap/snoop_dogg_drop_it_like_it_s_hot_feat_pharrell_williams.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-04-17": [
    {
      title: "Drop Dead",
      artist: "Olivia Rodrigo",
      cover: "/songs/covers/Drop_Dead.png",
      snippet: "/songs/pop/Olivia_Rodrigo_drop_dead.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Here Comes The Sun",
      artist: "The Beatles",
      cover: "/songs/covers/abbey.jpg",
      snippet: "/songs/rock/here_comes_sun.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "ROCKSTAR (feat. Roddy Ricch)",
      artist: "DaBaby",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/1b/63/04/1b630400-490e-245b-a26f-0120f6f253c8/20UMGIM28168.rgb.jpg/600x600bb.jpg",
      snippet:  "/songs/rap/dababy_rockstar_feat_roddy_ricch.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-04-18": [
    {
      title: "High Hopes",
      artist: "Panic! At the Disco",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/3b/92/c7/3b92c7e4-92eb-dd0f-68d5-b8b5bd357ec6/075679875136.jpg/600x600bb.jpg",
      snippet: "/songs/rock/panic_at_the_disco_high_hopes.mp3",
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
      title: "Hope",
      artist: "XXXTENTACION",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/9f/ed/83/9fed8304-a865-af85-8d99-6d063cd60c93/dj.ipmigxtf.jpg/600x600bb.jpg",
      snippet:  "/songs/pop/xxxtentacion_bad.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-04-19": [
    {
      title: "Vogue",
      artist: "Madonna",
      cover: "/songs/covers/imma.jpg",
      snippet: "/songs/pop/vogue.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "London Calling",
      artist: "The Clash",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/45/d7/17/45d71740-b204-de23-3f9e-f2f823296f1d/886443520721.jpg/600x600bb.jpg",
      snippet: "/songs/rock/the_clash_london_calling.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Drowning (feat. Kodak Black)",
      artist: "A Boogie wit da Hoodie",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/59/a9/f1/59a9f19a-cc4b-dca9-44c5-5de8368d1d1b/075679887757.jpg/600x600bb.jpg",
      snippet:  "/songs/rap/a_boogie_wit_da_hoodie_drowning_feat_kodak_black.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-04-20": [
    {
      title: "When The Party's Over",
      artist: "Billie Eilish",
      cover: "/songs/covers/when_we_all_fall.jpg",
      snippet: "/songs/pop/when_partys.mp3",
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
      title: "Creepin'",
      artist: "Metro Boomin, The Weeknd & 21 Savage",
      cover: "/songs/covers/heroes.jpg",
      snippet:  "/songs/rap/creepin.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-04-21": [
    {
      title: "Never Gonna Give You Up",
      artist: "Rick Astley",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/de/eb/63/deeb63c1-7bc0-9153-cfa3-fd9e4929aacf/4050538826562.jpg/600x600bb.jpg",
      snippet: "/songs/pop/rick_astley_never_gonna_give_you_up_2022_remaster.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Take Me Out",
      artist: "Franz Ferdinand",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/83/c6/54/83c6541f-3b90-b46a-b46a-17bf8fd9af16/5034202113645.png/600x600bb.jpg",
      snippet: "/songs/pop/franz_ferdinand_take_me_out.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Houdini",
      artist: "Eminem",
      cover: "/songs/covers/dead_slim.jpg",
      snippet:  "/songs/rap/houdini_e.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-04-22": [
    {
      title: "Locked Out of Heaven",
      artist: "Bruno Mars",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/e0/a4/7c/e0a47c6f-005a-9f9f-ce29-8e858e2bcfcb/075679957283.jpg/600x600bb.jpg",
      snippet: "/songs/pop/bruno_mars_locked_out_of_heaven.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Cigarette Daydreams",
      artist: "Cage the Elephant",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/02/d2/e2/02d2e290-82c9-bcf4-73fa-4cd06f65f4b9/886444143073.jpg/600x600bb.jpg",
      snippet: "/songs/rock/cage_the_elephant_cigarette_daydreams.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Anxiety",
      artist: "Doechii",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/ad/65/7d/ad657de9-2dab-d086-84c3-e6b8363b984e/25UMGIM39878.rgb.jpg/600x600bb.jpg",
      snippet:  "/songs/rap/doechii_anxiety.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-04-23": [
    {
      title: "Daddy Cool",
      artist: "Boney M.",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music4/v4/aa/23/e3/aa23e3a1-de3e-5aa7-870b-a1403afb2b10/886444503273.jpg/600x600bb.jpg",
      snippet: "/songs/pop/boney_m_daddy_cool.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Zazdrość",
      artist: "Hey",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music5/v4/5f/92/7e/5f927ef0-f182-3746-cdab-e6104df55608/602547377401.jpg/600x600bb.jpg",
      snippet: "/songs/Polskie/hey_zazdrosc.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Praise The Lord (Da Shine) [feat. Skepta]",
      artist: "A$AP Rocky",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/d3/91/9c/d3919c54-3426-07a2-91a4-b4e46b2a8d34/886447076453.jpg/600x600bb.jpg",
      snippet:  "/songs/rap/a_ap_rocky_praise_the_lord_da_shine_feat_skepta.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-04-24": [
    {
      title: "Pompeii",
      artist: "Bastille",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/e6/d8/61/e6d86177-ae8c-e84e-dfcc-0042687066ed/13UAAIM41955.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/rock/bastille_pompeii.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Song 2",
      artist: "Blur",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/19/c2/31/19c2313f-9f18-a923-e10f-150c73f4f3ef/5059460328020.jpg/600x600bb.jpg",
      snippet: "/songs/rock/blur_song_2.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Mo Bamba",
      artist: "Schek Wes",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music118/v4/3a/29/12/3a2912d6-e230-bd23-718f-f67e4323cb71/artwork.jpg/600x600bb.jpg",
      snippet:  "/songs/pop/blkd_out_mo_bamba.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
   "2026-04-25": [
    {
      title: "Sign of the Times",
      artist: "Harry Styles",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/3d/5e/aa/3d5eaaa3-9a86-c264-5cd5-7fac83f99a59/886446451978.jpg/600x600bb.jpg",
      snippet: "/songs/pop/harry_styles_sign_of_the_times.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Fat Lip",
      artist: "Sum 41",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/59/17/4d/59174d33-7211-9fb1-5952-5895c94e06d4/09UMGIM03043.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/rock/sum_41_fat_lip.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Antidote",
      artist: "Travis Scott",
      cover: "/songs/covers/rodeo.png",
      snippet:  "/songs/rap/antidote.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
   "2026-04-26": [
    {
      title: "Hall of Fame (feat. will.i.am)",
      artist: "The Script",
      cover: "/songs/covers/3deluxe.jpg",
      snippet: "/songs/pop/hall_fame.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Black Dog",
      artist: "Led Zeppelin", 
      cover: "/songs/covers/zeppelin4.jpg",
      snippet: "/songs/rock/black_dog.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Swimming Pools (Drank)",
      artist: "Kendrick Lamar",
      cover: "/songs/covers/gkmd.jpg",
      snippet:  "/songs/rap/swimming_pools.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-04-27": [
    {
      title: "So Easy (To Fall In Love)",
      artist: "Olivia Dean",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/08/e2/21/08e22164-7c0b-1522-818f-e0e74f62dc49/25UMGIM69703.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/pop/olivia_dean_so_easy_to_fall_in_love.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Money",
      artist: "Pink Floyd", 
      cover: "/songs/covers/beethoven.jpg",
      snippet: "/songs/rock/money.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Ciągle tutaj jestem (diss na raka)",
      artist: "Bedoes 2115, Maja Mecan, Fundacja Cancer Fighters",
      cover: "/songs/covers/rak.jpg",
      snippet:  "/songs/Polskie/dawid_bischoff_jestem.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-04-28": [
    {
      title: "Nocturne in E-Flat Major, Op. 9 No. 2",
      artist: "Frederic Chopin",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/08/e2/21/08e22164-7c0b-1522-818f-e0e74f62dc49/25UMGIM69703.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/Polskie/smile_melody_baby_music_chopin_chopin_nocturne_e_flat_major_op_9_no_2.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Spring - Four Seasons",
      artist: "Antonio Vivaldi",
      cover: "/songs/covers/spring.jpg",
      snippet: "/songs/pop/jonathan_carney_royal_philharmonic_orchestra_seasons_spring_i_allegro.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Beethoven",
      artist: "Kenndog",
      cover: "/songs/covers/beethoven.jpg",
      snippet: "/songs/rap/Kenndog_Beethoven.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-04-29": [
    {
      title: "Fancy",
      artist: "Twice",
      cover: "/songs/covers/fancytwice.jpg",
      snippet: "/songs/pop/fancy.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Papercut",
      artist: "Linkin Park",
      cover: "/songs/covers/hybrid.jpg",
      snippet: "/songs/rock/papercut.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Ridin' (feat. Krayzie Bone)",
      artist: "Chamillionaire",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/8b/d4/0f/8bd40f66-f9a7-963c-c327-79980e91445f/06UMGIM17125.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/rap/chamillionaire_ridin_feat_krayzie_bone.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-04-30": [
    {
      title: "Wuthering Heights",
      artist: "Kate Bush",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/c4/64/67/c46467fc-099e-a2f0-d165-f684c12d7cf8/cover.jpg/600x600bb.jpg",
      snippet: "/songs/pop/kate_bush_wuthering_heights_2018_remaster.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Dani California",
      artist: "Red Hot Chili Peppers",  
      cover: "/songs/covers/stadium.jpg",
      snippet: "/songs/rock/dani.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Butterfly",
      artist: "Crazy Town",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/b8/5e/16/b85e1612-0b86-efe5-d6e2-a53a7244e558/mzi.xsnqpqgt.jpg/600x600bb.jpg",
      snippet: "/songs/rock/crazy_town_butterfly.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-05-01": [
    {
      title: "Disturbia",
      artist: "Rihanna",
      cover: "/songs/covers/goodgirl.jpg",
      snippet: "/songs/pop/disturbia.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Holiday",
      artist: "Green Day",
      cover: "/songs/covers/idiot.jpg",
      snippet: "/songs/rock/holiday.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Love the Way You Lie (feat. Rihanna)",
      artist: "Eminem",
      cover: "/songs/covers/recovery.jpg",
      snippet: "/songs/rap/love_way.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
   "2026-05-02": [
    {
      title: "Gimme! Gimme! Gimme! (A Man After Midnight)",
      artist: "Abba",
      cover: "/songs/covers/voulez.jpg",
      snippet: "/songs/pop/gimme.mp3",
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
      title: "Drama",
      artist: "Aespa",
      cover: "/songs/covers/drama.jpg",
      snippet: "/songs/pop/drama.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-05-04": [
    {
      title: "The Fate Of Ophelia",
      artist: "Taylor Swift", 
      cover: "/songs/covers/showgirl.jpg",
      snippet: "/songs/pop/ophelia.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Psychosocial",
      artist: "Slipknot",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/1c/bf/46/1cbf46b8-c549-f3f2-010c-06d6e7627115/016861752200.jpg/600x600bb.jpg",
      snippet: "/songs/rock/slipknot_psychosocial.mp3",
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
  "2026-05-05": [
    {
      title: "Stressed Out",
      artist: "Twenty One Pilots",  
      cover: "/songs/covers/blurry.jpg",
      snippet: "/songs/pop/stressed.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Please Please Please Let Me Get What I Want",
      artist: "The Smiths",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/fb/73/d5/fb73d503-8e0a-c17f-7f34-ac5a566a192d/825646642847.jpg/600x600bb.jpg",
      snippet: "/songs/rock/the_smiths_please_please_please_let_me_get_what_i_want.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "THATS WHAT I WANT",
      artist: "Lil Nas X",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/4b/42/21/4b422136-2cfd-222c-ca7c-7573bf23139c/886449537204.jpg/600x600bb.jpg",
      snippet: "/songs/pop/lil_nas_x_thats_what_i_want.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
   "2026-05-06": [
    {
      title: "Gangnam Style",
      artist: "PSY",  
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/7c/52/87/7c5287bc-818f-55ed-e607-08b052963632/12UMGIM50914.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/pop/psy_gangnam_style.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Shoot to Thrill",
      artist: "AC/DC",
      cover: "/songs/covers/backblack.jpg",
      snippet: "/songs/rock/shoot_thrill.mp3",
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
   "2026-05-07": [
    {
      title: "Don't Let Me Down (feat. Daya)",
      artist: "The Chainsmokers",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music20/v4/40/1d/0a/401d0a4f-6afe-1548-f4c8-6e8de3ff1e2b/886446009742.jpg/600x600bb.jpg",
      snippet: "/songs/pop/the_chainsmokers_don_t_let_me_down_feat_daya_illenium_remix.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Borderline",
      artist: "Tame Impala", 
      cover: "/songs/covers/slowrush.jpg",
      snippet: "/songs/pop/borderline.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "All Girls Are the Same",
      artist: "Juice WRLD",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/07/2b/a4/072ba4fa-7f4c-f478-6f22-13f9e62ac1be/21UMGIM53733.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/rap/juice_wrld_all_girls_are_the_same.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-05-08": [
    {
      title: "Shooting Stars",
      artist: "Bag Raiders",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/16/1a/e7/161ae7fa-026b-453a-e443-626924179812/00602527174396.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/rock/bag_raiders_shooting_stars.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Hail to the King",
      artist: "Avenged Sevenfold",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/c3/8f/cb/c38fcb39-bbca-3e38-4b5d-1add583d2e92/093624942214.jpg/600x600bb.jpg",
      snippet: "/songs/rock/avenged_sevenfold_hail_to_the_king.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Homecoming (feat. Chris Martin)",
      artist: "Kanye West", 
      cover: "/songs/covers/graduation.jpg",
      snippet: "/songs/rap/homecoming.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-05-09": [
    {
      title: "Stronger (What Doesn't Kill You)",
      artist:"Kelly Clarkson",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music/68/81/4f/mzi.wrtaopaz.jpg/600x600bb.jpg",
      snippet: "/songs/pop/kelly_clarkson_stronger_what_doesn_t_kill_you.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Soul Kitchen",
      artist: "The Doors",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Features115/v4/03/c6/2d/03c62d8a-487f-78c3-8416-488cfac664eb/dj.sboowgda.jpg/600x600bb.jpg",
      snippet: "/songs/rock/the_doors_soul_kitchen.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Kitty (MOMO)",
      artist: "MISAMO",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/5b/04/f4/5b04f4a5-cd9d-c82c-2594-6ea28eed92c5/5026854408385.jpg/600x600bb.jpg",
      snippet: "/songs/pop/misamo_kitty_momo.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-05-10": [
    {
      title: "Image",
      artist: "Magdalena Bay",
      cover: "/songs/covers/imaginal.jpg",
      snippet: "/songs/pop/image.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Barracuda",
      artist: "Heart",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/1b/83/f2/1b83f233-20c6-c876-ab7a-15757ad397b1/074643479929.jpg/600x600bb.jpg",
      snippet: "/songs/rock/heart_barracuda.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Sugar On My Tongue",
      artist: "Tyler, The Creator", 
      cover: "/songs/covers/tapglass.jpg",
      snippet: "/songs/rap/sugar_tongue.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-05-11": [
    {
      title: "Make You Mine",
      artist: "Madison Beer",
      cover: "/songs/covers/makemine.png",
      snippet: "/songs/pop/make_mine.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "You Can Call Me Al",
      artist: "Paul Simon",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/92/0c/8c/920c8c14-cf08-a973-e4c1-8792f1e9183c/886443445680.jpg/600x600bb.jpg",
      snippet: "/songs/pop/paul_simon_you_can_call_me_al.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Timber",
      artist: "Pitbull & Kesha", 
      cover: "/songs/covers/globalwarn.jpg",
      snippet: "/songs/pop/timber.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-05-12": [
    {
      title: "Tattoo",
      artist: "Loreen",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/50/32/fd/5032fddc-e486-956d-a503-7ec6d17af848/22UM1IM46463.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/pop/loreen_tattoo.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Hard Rock Hallelujah",
      artist: "Lordi",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music/c7/6a/a5/mzi.kzwrzrrs.jpg/600x600bb.jpg",
      snippet: "/songs/pop/lordi_hard_rock_hallelujah.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Soldi",
      artist: "Mahmood",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/a5/6c/d4/a56cd43e-ffbd-68ab-6b12-12fcd85e5106/00602577534782.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/pop/mahmood_soldi.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-05-13": [
    {
      title: "This Is For",
      artist: "Twice",
      cover: "/songs/covers/thisfor.jpg",
      snippet: "/songs/pop/this_for.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Crushcrushcrush",
      artist: "Paramore",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/9a/3a/26/9a3a2608-29a7-5585-f990-cdfeb10b7394/075679955005.jpg/600x600bb.jpg",
      snippet: "/songs/rock/paramore_crushcrushcrush.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "MOVE LIKE THAT (MOMO)",
      artist: "Twice", 
      cover: "/songs/covers/momo.jpg",
      snippet: "/songs/pop/move_that.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-05-14": [
    {
      title: "Satellite",
      artist: "Lena",
      cover: "/songs/covers/lena.jpg",
      snippet: "/songs/pop/Satellite_Lena.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "I Wanna Be Your Slave",
      artist: "Maneskin",
      cover: "/songs/covers/slave.jpg",
      snippet: "/songs/pop/chris_brown_i_wanna_be.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title:  "Cha Cha Cha",
      artist: "Käärijä",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music123/v4/3c/df/e9/3cdfe9ff-b790-8be5-fae7-a3c9812f79a1/5054197498510.jpg/600x600bb.jpg",
      snippet: "/songs/rap/k_rij_cha_cha_cha.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-05-15": [
    {
      title: "Memories (feat. Kid Cudi)",
      artist: "David Guetta",
      cover: "/songs/covers/onelove.jpg",
      snippet: "/songs/pop/memories.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Pneuma",
      artist: "Tool",
      cover: "/songs/covers/inocolum.jpg",
      snippet: "/songs/rock/pneuma.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title:  "All The Stars",
      artist: "Kendrick Lamar, SZA",
      cover: "/songs/covers/panter.jpg",
      snippet: "/songs/rap/all_stars.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-05-16": [
    {
      title: "Solo",
      artist: "Blanka",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/d7/3f/a8/d73fa82a-86e7-3b51-0f42-6a016404bc16/5054197363047.jpg/600x600bb.jpg",
      snippet: "/songs/pop/blanka_solo.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "ZITTI E BUONI",
      artist: "Måneskin",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/5e/76/14/5e761416-1c55-1b56-e8c3-177fb475bef2/886449160334.jpg/600x600bb.jpg", 
      snippet: "/songs/rock/m_neskin_zitti_e_buoni_eurovision_version.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title:  "Stefania",
      artist: "KALUSH Orchestra",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/74/8e/cd/748ecd2c-0475-9733-7829-4a2226f42bf0/22UMGIM34750.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/pop/kalush_stefania_kalush_orchestra_eurovision_2022_ukraine_karaoke_version.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-05-17": [
    {
      title: "That’s So True",
      artist: "Gracie Abrams",
      cover: "/songs/covers/secretus2.jpg",
      snippet: "/songs/pop/thats_true.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "all-american bitch",
      artist: "Olivia Rodrigo",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/9e/0d/17/9e0d17e0-c068-fbd9-fd85-610cc87c86aa/23UMGIM71511.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/pop/olivia_rodrigo_all_american_bitch.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title:  "Antidote",
      artist: "Travis Scott",
      cover: "/songs/covers/rodeo.png",
      snippet: "/songs/rap/antidote.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-05-18": [
    {
      title: "Rude",
      artist: "MAGIC!",
      cover:  "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/2a/46/74/2a4674c2-889f-4f6b-e4e9-b3693f8ee962/886444607650.jpg/600x600bb.jpg",
      snippet: "/songs/pop/magic_rude.mp3",
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
      title: "Ambitionz Az A Ridah",
      artist: "2Pac",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/55/e5/7c/55e57cf2-8325-a088-7d54-3aeedad1143f/21UM1IM16263.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/rap/2pac_ambitionz_az_a_ridah.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-05-19": [
    {
      title: "We Are Young (feat. Janelle Monáe)",
      artist: "Fun.",
      cover:  "https://is1-ssl.mzstatic.com/image/thumb/Features115/v4/b2/df/a3/b2dfa32c-ea54-7983-0da1-6964e60a1bd7/dj.aqphuayl.jpg/600x600bb.jpg",
      snippet: "/songs/rock/fun_we_are_young_feat_janelle_mon_e.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "The Reason",
      artist: "Hoobastank",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/17/00/ae/1700ae0f-ba70-bf48-df89-12ab614c83f2/10UMGIM21716.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/rock/hoobastank_the_reason.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "The Spins",
      artist: "Mac Miller",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/fa/86/c6/fa86c648-146e-02a0-09f5-166dfb07b076/Long_Story_Short_Apple.png/600x600bb.jpg",
      snippet: "/songs/pop/mac_miller_the_spins_ben_gerrans_remix_mixed.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
   "2026-05-21": [
    {
      title: "Birds of a Feather",
      artist: "Billie Eilish",
      cover:  "/songs/covers/hit_me_hard.jpg",
      snippet: "/songs/pop/birds_of_a_feather.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Just Can't Get Enough",
      artist: "Depeche Mode", 
      cover: "/songs/covers/speak.jpg",
      snippet: "/songs/rock/just_get_enough.mp3",
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
  "2026-05-22": [
    {
      title: "The Cure",
      artist: "Olivia Rodrigo",
      cover:  "/songs/covers/cure.png",
      snippet: "/songs/pop/Olivia_Rodrigo_the_cure.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Just Like Heaven",
      artist: "The Cure", 
      cover: "/songs/covers/kissme.jpg",
      snippet: "/songs/rock/just_like_heaven.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Sucker For Pain (with Logic, Ty Dolla $ign & X Ambassadors)",
      artist: "Lil Wayne, Wiz Khalifa & Imagine Dragons",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/ea/7b/3a/ea7b3a69-b589-603a-037c-b161f328afb1/075679910462.jpg/600x600bb.jpg",
      snippet: "/songs/rap/lil_wayne_wiz_khalifa_imagine_dragons_sucker_for_pain_with_logic_ty_dolla_ign_x_ambassadors.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-05-23": [
    {
      title: "Dernière danse",
      artist: "Indila",
      cover:  "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/49/58/30/49583018-308b-431d-c691-4a28e78be8cd/14UMGIM01109.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/pop/indila_derni_re_danse.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Listen To Your Heart",
      artist: "Roxette",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/c5/0f/58/c50f58cd-b6d8-3e90-d3a6-dbd17977597a/5021732590466.jpg/600x600bb.jpg",
      snippet: "/songs/pop/roxette_listen_to_your_heart.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "After the Storm (feat. Tyler, The Creator & Bootsy Collins)",
      artist: "Kali Uchis",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/de/e1/8b/dee18be4-276a-1e90-7aec-883c91a5a43e/17UM1IM08185.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/pop/kali_uchis_after_the_storm_feat_tyler_the_creator_bootsy_collins2.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-05-24": [
    {
      title: "Super Trouper",
      artist: "Abba",
      cover:  "/songs/covers/trouper.jpg",
      snippet: "/songs/pop/trouper.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Some Nights",
      artist: "Fun.",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/43/99/62/43996219-f524-b168-461e-233d3005a4a6/075679954497.jpg/600x600bb.jpg",
      snippet: "/songs/rock/fun_some_nights.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Sundrees",
      artist:"A$ap Rocky",
      cover:"/songs/covers/sundress.jpg",
      snippet: "/songs/rap/sundress.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-05-25": [
    {
      title: "Despacito",
      artist: "Luis Fonsi & Daddy Yankee",
      cover:  "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/e2/ef/f0/e2eff0bc-c51d-7de5-9280-6891ddcee71b/18UMGIM85289.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/pop/luis_fonsi_daddy_yankee_despacito_feat_justin_bieber_remix.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "I Was Made for Lovin' You",
      artist: "Kiss",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/a3/30/54/a33054b1-d501-b7ea-5eb3-3ed36201c4ba/06UMGIM15802.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/rock/kiss_i_was_made_for_lovin_you.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "In My Feelings",
      artist: "Drake",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/bb/6d/8f/bb6d8f67-6d04-10b5-dd62-eb5809ac54fc/00602567879152.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/rap/drake_in_my_feelings.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-05-26": [
    {
      title: "Ain't Your Mama",
      artist: "Jennifer Lopez",
      cover:  "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/25/be/1a/25be1a95-0bad-0ed5-e2bc-ae0046d52c8e/886445849073.jpg/600x600bb.jpg",
      snippet: "/songs/pop/jennifer_lopez_ain_t_your_mama.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Mama, I'm Coming Home",
      artist: "Ozzy Osbourne",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/8e/ef/44/8eef4402-508e-860e-a3c0-9be46cf2379e/696998524828.jpg/600x600bb.jpg",
      snippet: "/songs/rock/ozzy_osbourne_mama_i_m_coming_home.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Dear Mama",
      artist: "2Pac",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/72/00/89/720089d8-c063-a323-e0cc-de921e50b968/00602527051789.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/rap/2pac_dear_mama.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-05-27": [
    {
      title: "Rasputin",
      artist: "Boney M.",
      cover:  "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/b7/86/45/b786452a-a723-eaed-8170-cdc261367eb7/886443575578.jpg/600x600bb.jpg",
      snippet: "/songs/pop/boney_m_rasputin.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Angie",
      artist: "The Rolling Stones", 
      cover: "/songs/covers/goats.jpg", 
      snippet: "/songs/rock/angie.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Juicy",
      artist: "The Notorious B.I.G.",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Features115/v4/08/66/e3/0866e3ef-c111-c0a2-f18e-a10035a5bb07/dj.hpsoegav.jpg/600x600bb.jpg",
      snippet: "/songs/rap/the_notorious_b_i_g_juicy.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-05-28": [
    {
      title: "Mr. Saxobeat",
      artist: "Alexandra Stan",
      cover:  "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/90/91/83/909183ff-bc63-8cfc-4f0f-ac742912286c/0617465300950.jpg/600x600bb.jpg",
      snippet: "/songs/pop/alexandra_stan_mr_saxobeat_radio_edit.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Everlong",
      artist: "Foo Fighters",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/68/f5/86/68f586ca-a375-9965-a864-9e227e77ef5b/884977570328.jpg/600x600bb.jpg",
      snippet: "/songs/rock/foo_fighters_everlong.mp3",
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
  "2026-05-29": [
    {
      title: "7 rings",
      artist: "Ariana Grande",
      cover:  "/songs/covers/thanku.jpg",
      snippet: "/songs/pop/7rings.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Dirty Old Town",
      artist: "The Pogues",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music/01/f0/52/mzi.gtcocruw.jpg/600x600bb.jpg",
      snippet: "/songs/rock/the_pogues_dirty_old_town.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Armageddon",
      artist: "Aespa",
      cover: "/songs/covers/arma.jpg",
      snippet: "/songs/pop/armageddon.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-05-30": [
    {
      title: "Whiplash",
      artist: "Aespa",
      cover:  "/songs/covers/whiplash.jpg",
      snippet: "/songs/pop/whiplash.mp3",
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
      title: "Metallica 808",
      artist: "TACONAFIDE, Quebonafide & Taco Hemingway",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/4d/bc/56/4dbc56e0-bce7-a1db-ae86-9c774ea4cb36/23UMGIM28916.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/Polskie/taconafide_quebonafide_taco_hemingway_metallica_808.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-05-31": [
    {
      title: "Last Friday Night (T.G.I.F.)",
      artist: "Katy Perry",
      cover:  "/songs/covers/teenagedream.jpg",
      snippet: "/songs/pop/last_friday.mp3",
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
      title: "Starships",
      artist: "Nicki Minaj",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/a5/c4/90/a5c490a1-d914-9943-7e02-32f8320e5840/12UMGIM12516.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/rap/nicki_minaj_starships.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-06-02": [
    {
      title: "Shake It Off",
      artist: "Taylor Swift", 
      cover:  "/songs/covers/1989.jpg",
      snippet: "/songs/pop/shake_off.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
     {
      title: "Wake Me Up When September Ends",
      artist: "Green Day",
      cover: "/songs/covers/idiot.jpg",
      snippet: "/songs/rock/september_end.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Forgot About Dre (feat. Eminem)",
      artist: "Dr. Dre",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/07/d4/d9/07d4d90d-704e-c10e-2203-2b18318a2064/00606949057121.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/rap/dr_dre_forgot_about_dre_feat_eminem_instrumental.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-06-03": [
    {
      title: "Hard Times",
      artist: "Paramore",
      cover:  "/songs/covers/laughter.jpg",
      snippet: "/songs/pop/hard_times.mp3",
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
      title: "Impact (feat. xaviersobased)",
      artist: "Nettspend",
      cover: "/songs/covers/xd.jpg",
      snippet: "/songs/rap/NETTSPEND_impact.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-06-04": [
    {
      title: "What Was That",
      artist: "Lorde",
      cover:  "/songs/covers/virgin.jpg",
      snippet: "/songs/pop/what_was_that.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
     {
      title: "I Bet You Look Good On the Dancefloor",
      artist: "Arctic Monkeys",
      cover: "/songs/covers/peoplesay.jpg",
      snippet: "/songs/rock/good_dancefloor.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Take A Look Around",
      artist: "Limp Bizkit",
      cover: "/songs/covers/chocolate.jpg",
      snippet: "/songs/rock/take_look.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
   "2026-06-06": [
    {
      title: "10:35",
      artist: "Tiësto & Tate McRae",
      cover:  "/songs/covers/drive.jpg",
      snippet: "/songs/pop/1035.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
     {
      title: "Run To The Hills",
      artist: "Iron Maiden", 
      cover: "/songs/covers/numberbeast.jpg",
      snippet:  "/songs/rock/run_hills.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "White Ferrari",
      artist: "Frank Ocean",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/bb/45/68/bb4568f3-68cd-619d-fbcb-4e179916545d/BlondCover-Final.jpg/600x600bb.jpg",
      snippet: "/songs/pop/frank_ocean_white_ferrari.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-06-07": [
    {
      title: "Bags",
      artist: "Clairo",
      cover:  "/songs/covers/immunity.jpg",
      snippet: "/songs/pop/bags.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
     {
      title: "Fields of Gold",
      artist: "Sting",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/59/ac/f4/59acf4db-0ea8-a8e5-5607-01e931bb2d58/06UMGIM49867.rgb.jpg/600x600bb.jpg",
      snippet:  "/songs/rock/sting_fields_of_gold.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "I'll Be Missing You (feat. Faith Evans, 112)",
      artist: "Puff Daddy & Faith Evans",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/db/2c/2d/db2c2dc7-18cd-f64e-3580-52eae12bccc0/dj.izjbcsws.jpg/600x600bb.jpg",
      snippet: "/songs/rap/puff_daddy_faith_evans_i_ll_be_missing_you_feat_faith_evans_112.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
   "2026-06-08": [
    {
      title: "FATTY BOOM BOOM",
      artist: "Die Antwoord",
      cover:  "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/c3/7d/96/c37d967b-031a-980a-137d-c53ff075972c/20CRGIM20692.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/rap/die_antwoord_fatty_boom_boom_instrumental.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
     {
      title: "Schism",
      artist: "Tool",
      cover: "/songs/covers/lateralus.jpg",
      snippet:  "/songs/rock/schism.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Goat",
      artist: "Lil Tjay",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/be/0c/64/be0c6448-b0fc-a1eb-3e33-4456d58d33de/886449049059.jpg/600x600bb.jpg",
      snippet: "/songs/rap/lil_tjay_6lack_calling_my_phone.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-06-09": [
    {
      title: "Habits (Stay High)",
      artist: "Tove Lo",
      cover:  "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/b9/2d/20/b92d205d-f9fc-13cc-c714-14aed93081b4/15UMGIM46170.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/rock/tove_lo_habits_stay_high.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
     {
      title: "Like a Stone",
      artist: "Audioslave",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Features115/v4/9c/b6/c2/9cb6c246-3626-7789-26a9-79b787e5668d/dj.owymmnty.jpg/600x600bb.jpg",
      snippet:  "/songs/rock/audioslave_like_a_stone.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "The Real Slim Shady",
      artist: "Eminem", 
      cover: "/songs/covers/marshall.jpg",
      snippet: "/songs/rap/real_slim.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-06-10": [
    {
      title: "Hello",
      artist: "Adele",
      cover:  "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/08/8c/24/088c2405-2e33-801b-5c38-e967f2c01e69/191404113974.png/600x600bb.jpg",
      snippet: "/songs/pop/adele_hello.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
     {
      title: "My Way",
      artist: "Limp Bizkit",
      cover: "/songs/rock/my_way.mp3",
      snippet:  "/songs/covers/chocolate.jpg",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Bandycka Jazda",
      artist: "Fagata",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/f8/14/48/f814481e-d8b7-bf76-d23c-7508fe22ba4d/artwork.jpg/600x600bb.jpg",
      snippet: "/songs/Polskie/roadtofreedom_fagata_bandycka_jazda_ale_to_cover_w_stylu_lat_50.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-06-11": [
    {
      title: "Waka Waka (This Time for Africa)",
      artist: "Shakira",
      cover:  "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/3e/3a/73/3e3a73da-e19e-b26c-ec19-9da6a5da93fa/mzi.ixhiugev.jpg/600x600bb.jpg",
      snippet: "/songs/pop/shakira_waka_waka_this_time_for_africa_the_official_2010_fifa_world_cup_tm_song_feat_freshlyground_single.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
     {
      title: "We Are the Champions",
      artist: "Queen",
      cover: "/songs/covers/news.jpg",
      snippet:  "/songs/rock/champions.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "We Are One (Ole Ola) [The Official 2014 FIFA World Cup Song] [feat. Jennifer Lopez & Cláudia Leitte]",
      artist: "Pitbull",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music4/v4/9d/30/bd/9d30bdd8-fa07-5193-3163-804fb2ae5305/886444556958.jpg/600x600bb.jpg",
      snippet: "/songs/pop/pitbull_we_are_one_ole_ola_the_official_2014_fifa_world_cup_song_feat_jennifer_lopez_cl_udia_leitte_olodum_mix.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-06-12": [
    {
      title: "stupid song",
      artist: "Olivia Rodrigo",
      cover:  "/songs/covers/Olivia_Rodrigo_-_You_Seem_Pretty_Sad_for_a_Girl_So_in_Love.jpg",
      snippet: "/songs/pop/stupid_song_olivka.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
     {
      title: "my way",
      artist: "Olivia Rodrigo",
      cover: "/songs/covers/Olivia_Rodrigo_-_You_Seem_Pretty_Sad_for_a_Girl_So_in_Love.jpg",
      snippet: "/songs/pop/my_way_olivia.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Best Day of My Life",
      artist: "American Authors",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/fe/6c/79/fe6c7944-593e-43b8-5ca2-3ca61cdbd393/14UMGIM01329.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/rock/american_authors_best_day_of_my_life_acoustic.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-06-13": [
    {
      title: "Bang Bang",
      artist:  "Jessie J, Ariana Grande & Nicki Minaj",
      cover:  "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/ce/81/a0/ce81a0d7-6beb-16bc-2b98-a6b6a9b0faff/14UMGIM31140.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/pop/jessie_j_ariana_grande_nicki_minaj_bang_bang.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
     {
      title: "Uprising",
      artist: "Muse",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/53/13/26/531326a2-b93d-9ab8-30cc-e4a9392e7b86/825646092666.jpg/600x600bb.jpg",
      snippet: "/songs/rock/muse_uprising.mp3",
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
  "2026-06-14": [
    {
      title: "Set Fire to the Rain",
      artist:  "Adele",
      cover:  "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/d8/e3/f9/d8e3f9ea-d6fe-9a1b-9f13-109983d3062e/191404113868.png/600x600bb.jpg",
      snippet: "/songs/pop/adele_set_fire_to_the_rain.mp3",
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
      title: "HUMBLE.",
      artist: "Kendrick Lamar",
      cover: "/songs/covers/pride.jpg",
      snippet: "/songs/rap/humble.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-06-15": [
    {
      title: "Man I Need",
      artist:  "Olivia Dean", 
      cover:  "/songs/covers/artloving.jpg",
      snippet: "/songs/pop/man_need.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
     {
      title: "You're Gonna Go Far, Kid",
      artist: "The Offspring", 
      cover: "/songs/covers/risefall.jpg",
      snippet: "/songs/rock/far_kid.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Touch the Sky (feat. Lupe Fiasco)",
      artist: "Kanye West",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/0e/90/3c/0e903c43-9d81-f91b-90f1-727a58f7fb2c/00602498824030.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/rap/kanye_west_touch_the_sky_feat_lupe_fiasco.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-06-16": [
    {
      title: "Cool for the Summer",
      artist:  "Demi Lovato",
      cover:  "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/ea/08/9e/ea089eb7-9e3c-a442-8656-7cac2da0309f/00050087335120.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/pop/demi_lovato_cool_for_the_summer.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
     {
      title: "Sir Duke",
      artist: "Stevie Wonder",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music118/v4/eb/1f/12/eb1f12ec-474c-63aa-43af-09282f423b9d/00602537004737.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/pop/stevie_wonder_sir_duke.mp3",
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
   "2026-06-17": [
    {
      title: "Another Love",
      artist:  "Tom Odell",
      cover:  "/songs/covers/longway.jpg",
      snippet: "/songs/pop/tom_odell_ti_sto_another_love_ti_sto_remix.mp3",
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
      title: "Airplanes (feat. Hayley Williams)",
      artist: "B.o.B feat. Hayley Williams",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/bc/f8/ed/bcf8ed12-42b0-b50f-9dab-e9124d26137a/mzi.rklkakdk.jpg/600x600bb.jpg",
      snippet: "/songs/rap/b_o_b_feat_hayley_williams_airplanes_feat_hayley_williams.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
    "2026-06-18": [
    {
      title: "Perfect Places",
      artist:  "Lorde",
      cover:  "/songs/covers/melodrama.jpg",
      snippet: "/songs/pop/perfect_places.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
     {
      title: "Sweet Caroline",
      artist: "Neil Diamond",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/ef/46/dc/ef46dc23-467a-7a23-aefb-c3baf4ccdbbc/14UMGIM25084.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/pop/neil_diamond_sweet_caroline_single_version.mp3",
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
   "2026-06-19": [
    {
      title: "Youngblood",
      artist:  "5 Seconds of Summer",
      cover:  "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/dc/98/51/dc9851bd-9521-6fcb-c4b7-499f23b05498/18UMGIM09114.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/pop/5_seconds_of_summer_youngblood.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
     {
      title: "Hold the Line",
      artist: "Toto",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/a1/a9/ea/a1a9eaef-2d81-c2c6-9a03-82c3cbc9e598/074643531726.jpg/600x600bb.jpg",
      snippet: "/songs/rock/toto_hold_the_line.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Rather Lie (feat. The Weeknd)",
      artist: "Playboi Carti",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/2a/aa/b4/2aaab42a-a4cb-a600-4a25-d78961495960/18UMGIM17204.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/pop/the_weeknd_try_me.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-06-20": [
    {
      title: "S&M",
      artist:  "Rihanna",
      cover:  "/songs/covers/loud.jpg",
      snippet: "/songs/pop/sm.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
     {
      title: "Lullaby",
      artist: "The Cure",
      cover: "/songs/covers/disint.jpg",
      snippet: "/songs/rock/lullaby.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Jump Around",
      artist: "House of Pain",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/c5/b7/2f/c5b72ff4-d593-ed4c-f7ed-080fb4d224aa/081227911560.png/600x600bb.jpg",
      snippet: "/songs/rap/house_of_pain_jump_around_pete_rock_remix.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-06-21": [
    {
      title: "Wake Me Up Before You Go-Go",
      artist:  "Wham!",
      cover:  "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/ee/49/ac/ee49accc-78bd-bcdb-1aff-c40c1ac3ccc4/074643959520.jpg/600x600bb.jpg",
      snippet: "/songs/pop/wham_wake_me_up_before_you_go_go.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
     {
      title: "I Write Sins Not Tragedies",
      artist: "Panic! At the Disco",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/cb/a8/ee/cba8ee59-48f6-13f5-6c26-fbb1790a1d04/5059460399082.jpg/600x600bb.jpg",
      snippet: "/songs/rock/panic_at_the_disco_i_write_sins_not_tragedies.mp3",
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
   "2026-06-22": [
    {
      title: "Symphony (feat. Zara Larsson)",
      artist:  "Clean Bandit", 
      cover:  "/songs/covers/symphony.jpg",
      snippet: "/songs/pop/symphony.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
     {
      title: "Jessie's Girl",
      artist: "Rick Springfield",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music113/v4/52/1e/e8/521ee88b-8fcc-0d53-345d-3b82d910a554/828768486726.jpg/600x600bb.jpg",
      snippet: "/songs/rock/rick_springfield_jessie_s_girl.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Gettin' Jiggy Wit It",
      artist: "Will Smith",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/96/47/9d/96479d49-1ccd-ea1a-7bee-6750a73f363f/mzi.haxmzhnz.jpg/600x600bb.jpg",
      snippet: "/songs/rap/will_smith_gettin_jiggy_wit_it.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-06-23": [
    {
      title: "Daddy Cool",
      artist:  "Boney M.",
      cover:  "https://is1-ssl.mzstatic.com/image/thumb/Music4/v4/aa/23/e3/aa23e3a1-de3e-5aa7-870b-a1403afb2b10/886444503273.jpg/600x600bb.jpg",
      snippet: "/songs/pop/boney_m_daddy_cool.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
     {
      title: "Last Resort",
      artist: "Papa Roach",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/c2/c6/81/c2c6818b-0b09-9378-caf3-608cc6fe36d7/19UM1IM12014.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/rock/papa_roach_last_resort.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Father Stretch My Hands, Pt. 1",
      artist: "Kanye West", 
      cover: "/songs/covers/pablo.jpg",
      snippet: "/songs/rap/father_strech.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-06-24": [
    {
      title: "Cold Heart (PNAU Remix)",
      artist:  "Elton John & Dua Lipa",
      cover:  "/songs/covers/coldheart.jpg",
      snippet: "/songs/pop/cold_heart.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
     {
      title: "Johnny B. Goode",
      artist: "Chuck Berry",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/67/c8/33/67c83356-08b8-e3c0-34cd-ee084db91f59/06UMGIM60693.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/pop/chuck_berry_johnny_b_goode.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "My Name Is",
      artist: "Eminem",
      cover:  "/songs/covers/slim_shady.jpg",
      snippet: "/songs/rap/my_name.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-06-25": [
    {
      title: "Maps",
      artist:  "Maroon 5",
      cover:  "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/0d/f0/8b/0df08b64-3743-4ae0-f3cc-1314716d841d/14UMGIM31675.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/pop/maroon_5_maps.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
     {
      title: "Ironic",
      artist: "Alanis Morissette",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Features124/v4/5f/3b/ca/5f3bca60-024c-d4aa-d638-6d58e7e81461/mza_1406686761081396977.jpg/600x600bb.jpg",
      snippet: "/songs/rock/alanis_morissette_ironic.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "INDUSTRY BABY",
      artist: "Lil Nas X & Jack Harlow",
      cover:  "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/4d/f2/df/4df2dfcc-a2a5-de63-9885-cd77efa6d26c/886449661831.jpg/600x600bb.jpg",
      snippet: "/songs/rap/lil_nas_x_jack_harlow_industry_baby.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
   "2026-06-26": [
    {
      title: "Girl On Fire",
      artist:  "Alicia Keys",
      cover:  "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/a7/66/bd/a766bd53-e015-62e7-fbbc-ab7dd628a989/886443653634.jpg/600x600bb.jpg",
      snippet:"/songs/pop/alicia_keys_girl_on_fire.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
     {
      title: "Shiny Happy People",
      artist: "R.E.M.",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/05/ae/86/05ae8650-7bce-2377-8959-78ea033a99d9/00888072013711.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/rock/r_e_m_shiny_happy_people.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "goosebumps",
      artist: "Travis Scott",
      cover:  "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/b8/e5/27/b8e527c8-aaf4-c7b7-5562-c479458ed7d9/886446092645.jpg/600x600bb.jpg",
      snippet: "/songs/rap/travis_scott_goosebumps.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
   "2026-06-27": [
    {
      title: "Flowers",
      artist:  "Miley Cyrus",
      cover:  "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/8c/67/ff/8c67ff91-31c3-3fef-1884-ce3ec89f3af4/196589946874.jpg/600x600bb.jpg",
      snippet: "/songs/pop/miley_cyrus_flowers.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
     {
      title: "Nemo",
      artist: "Nightwish",
      cover: "a",
      snippet: "/songs/rock/malcolm_todd_nemo.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "WAP (feat. Megan Thee Stallion)",
      artist: "Cardi B",
      cover:  "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/ec/f5/45/ecf545c0-24bd-90de-7639-3069e648c51d/075679804938.jpg/600x600bb.jpg",
      snippet: "/songs/rap/cardi_b_wap_feat_megan_thee_stallion.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-06-28": [
    {
      title: "Work from Home (feat. Ty Dolla $ign)",
      artist:  "Fifth Harmony",
      cover:  "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/5e/35/68/5e3568b7-3e08-cdac-d0d9-122fc0429f08/886445883091.jpg/600x600bb.jpg",
      snippet: "/songs/pop/fifth_harmony_work_from_home_feat_ty_dolla_ign.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
     {
      title: "Gimme Chocolate!!",
      artist: "Babymetal", 
      cover: "/songs/covers/babymetal.jpg",
      snippet: "/songs/rock/chocolate.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Just a Lil Bit",
      artist: "50 Cent",
      cover:  "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/df/10/7c/df107c5d-0a02-8122-f554-7da8b746ef9c/4ad62e53-745e-4db3-94d5-1f7ee80e8bb9.png/600x600bb.jpg",
      snippet: "/songs/rap/50_cent_just_a_lil_bit_mixed.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-06-29": [
    {
      title: "Hot N Cold",
      artist:  "Katy Perry",
      cover: "/songs/covers/oneboys.jpg",
      snippet: "/songs/pop/hot_cold.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
     {
      title: "Comin' In Hot",
      artist: "Hollywood Undead", 
      cover: "/songs/covers/tragedy.jpg",
      snippet: "/songs/rock/comin_hot.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Hot In Here",
      artist: "Nelly",
      cover:  "a",
      snippet: "/songs/pop/rascal_flatts_hot_in_here.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-06-30": [
    {
      title: "I Ain't Worried",
      artist:  "OneRepublic",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/e6/14/14/e6141444-6597-4c3a-7ad1-86304528acf4/22UMGIM45569.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/pop/onerepublic_i_ain_t_worried.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
     {
      title: "Rock And Roll",
      artist: "Led Zeppelin",  
      cover: "/songs/covers/zeppelin4.jpg",
      snippet: "/songs/rock/rock_roll.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "No Role Modelz",
      artist: "J. Cole",
      cover:  "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/ee/28/67/ee286794-6c33-a8c2-5c37-c04f1cb5e8a6/21UM1IM54415.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/rap/j_cole_no_role_modelz.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
   "2026-07-01": [
    {
      title: "Wannabe",
      artist:  "Spice Girls",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/e1/92/8f/e1928fcb-0204-ca19-597a-6edaf8e6ebc8/21UMGIM16233.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/pop/spice_girls_wannabe.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
     {
      title: "Norwegian Wood (This Bird Has Flown)",
      artist: "The Beatles", 
      cover: "/songs/covers/wood.png",
      snippet: "/songs/rock/norwegian_wood.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "N.Y. State of Mind",
      artist: "Nas",
      cover:  "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/b9/eb/cc/b9ebccbc-5ba4-2cdb-5332-b065739abd9a/886444567619.jpg/600x600bb.jpg",
      snippet: "/songs/rap/nas_n_y_state_of_mind.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-07-02": [
    {
      title: "Drive By",
      artist:  "Train",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/08/a0/0e/08a00ef4-fa4d-8338-77cf-b6d82f66e4f4/886443385948.jpg/600x600bb.jpg",
      snippet: "/songs/pop/train_drive_by.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
     {
      title: "Piano Man",
      artist: "Billy Joel",  
      cover: "/songs/covers/piano.jpg",
      snippet: "/songs/rock/piano_man.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Ni**as in Paris",
      artist: "Kanye West & JAY-Z",  
      cover:  "/songs/covers/watchthrone.jpg",
      snippet: "/songs/rap/niggas.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-07-03": [
     {
      title: "The Cure",
      artist: "Olivia Rodrigo",
      cover:  "/songs/covers/cure.png",
      snippet: "/songs/pop/Olivia_Rodrigo_the_cure.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
     {
      title: "Everlong",
      artist: "Foo Fighters",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/68/f5/86/68f586ca-a375-9965-a864-9e227e77ef5b/884977570328.jpg/600x600bb.jpg",
      snippet: "/songs/rock/foo_fighters_everlong.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Stargazing",
      artist: "Travis Scott",
      cover: "/songs/covers/astro.jpg",
      snippet: "/songs/rap/stargazing.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-07-04": [
    {
      title: "Fame Is A Gun",
      artist: "Addison Rae",
      cover: "/songs/covers/addison.jpg",
      snippet: "/songs/pop/fame_gun.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
     {
      title: "Walk",
      artist: "Pantera",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music/v4/c0/4c/ef/c04cef86-b722-22d3-761d-e8375dcaaa9f/603497931897.jpg/600x600bb.jpg",
      snippet: "/songs/rock/pantera_walk_cervical_edit.mp3",
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
  "2026-07-05": [
    {
      title: "Illegal",
      artist: "PinkPantheress",
      cover: "/songs/covers/fancy.jpg",
      snippet: "/songs/pop/illegal.mp3",
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
      title: "Anxiety",
      artist: "Doechii",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/ad/65/7d/ad657de9-2dab-d086-84c3-e6b8363b984e/25UMGIM39878.rgb.jpg/600x600bb.jpg",
      snippet:  "/songs/rap/doechii_anxiety.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
   "2026-07-06": [
    {
      title: "Lush Life",
      artist: "Zara Larsson",
      cover: "/songs/covers/sogood.jpg",
      snippet: "/songs/pop/lush_life.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
     {
      title: "Red Right Hand",
      artist: "Nick Cave & The Bad Seeds",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music118/v4/7b/c4/a9/7bc4a9bb-7061-1b0c-6da7-2f75185b0285/5099909572058.jpg/600x600bb.jpg",
      snippet: "/songs/rock/nick_cave_the_bad_seeds_red_right_hand_2011_remaster.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Jeremy Sochan",
      artist: "Oki",
      cover: "a",
      snippet:  "/songs/Polskie/OKI_JEREMYSOCHAN.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-07-07": [
    {
      title: "I Love You I'm Sorry",
      artist: "Gracie Abrams",
      cover: "/songs/covers/secretus.jpg",
      snippet: "/songs/pop/love_you_sorry.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
     {
      title: "Kashmir",
      artist: "Led Zeppelin",
      cover: "/songs/covers/physical.jpg",
      snippet: "/songs/rock/kashmir.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Panda",
      artist: "Desiigner",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/a1/f1/f9/a1f1f914-6e61-21eb-d787-2d4020654aab/16UMGIM11380.rgb.jpg/600x600bb.jpg",
      snippet:  "/songs/rap/desiigner_panda.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
   "2026-07-08": [
    {
      title: "Upside Down",
      artist: "Diana Ross",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/4b/68/94/4b68944b-e875-5729-e97f-c781fc9e0c1e/06UMGIM11291.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/pop/diana_ross_upside_down.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
     {
      title: "I-E-A-I-A-I-O",
      artist: "System Of A Down",
      cover: "/songs/covers/steal.jpg",
      snippet: "/songs/rock/ieio.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Shut Down",
      artist: "Blackpink",
      cover: "/songs/covers/bornpink.jpg",
      snippet:  "/songs/pop/shut_down.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-07-09": [
    {
      title: "Like a G6",
      artist: "Far East Movement, The Cataracs & Dev",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/5f/69/26/5f6926ea-5a7f-17d9-25ce-dbcddfbc14d8/10UMGIM25431.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/pop/far_east_movement_the_cataracs_dev_like_a_g6.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
     {
      title: "Rosanna",
      artist: "Toto",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/69/ce/d2/69ced240-07a7-2a04-bbab-2afbacf30809/074643772822.jpg/600x600bb.jpg",
      snippet: "/songs/rock/toto_rosanna.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Houdini",
      artist: "Eminem", 
      cover: "/songs/covers/dead_slim.jpg",
      snippet:  "/songs/rap/houdini_e.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
   "2026-07-10": [
    {
      title: "Despacito",
      artist: "Luis Fonsi & Daddy Yankee",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/e2/ef/f0/e2eff0bc-c51d-7de5-9280-6891ddcee71b/18UMGIM85289.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/pop/luis_fonsi_daddy_yankee_despacito_feat_justin_bieber_remix.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
     {
      title: "Don't Bring Me Down",
      artist: "Electric Light Orchestra",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/a3/6e/74/a36e7450-3818-f2c1-a137-d4ef5934c119/827969448922.jpg/600x600bb.jpg",
      snippet: "/songs/rock/electric_light_orchestra_don_t_bring_me_down.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Mask Off",
      artist: "Future",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/ea/43/5e/ea435e5e-78fe-d4a9-aedf-fbc3cf8cfc50/886446597119.jpg/600x600bb.jpg",
      snippet:  "/songs/rap/future_mask_off.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
   "2026-07-11": [
    {
      title: "Around The World",
      artist: "Daft Punk", 
      cover: "/songs/covers/homework.jpg",
      snippet: "/songs/pop/around_world.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
     {
      title: "21 guns",
      artist: "Green Day", 
      cover: "/songs/covers/21centurygreen.jpg",
      snippet: "/songs/rock/21guns.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "U Can't Touch This",
      artist: "MC Hammer",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/12/3b/cc/123bccfe-4d2e-20bb-f703-9d2b27000992/17UM1IM10688.rgb.jpg/600x600bb.jpg",
      snippet:  "/songs/rap/mc_hammer_u_can_t_touch_this.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
   "2026-07-12": [
    {
      title: "Exes",
      artist: "Tate McRae",
      cover: "/songs/covers/think_later.jpg",
      snippet: "/songs/pop/exes.mp3",
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
      title: "Jump",
      artist: "Kris Kross",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/ea/03/30/ea033079-3254-3a3c-e2a6-504b30095ca6/dj.wutawrld.jpg/600x600bb.jpg",
      snippet: "/songs/rap/kris_kross_jump.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-07-13": [
    {
      title: "Sign of the Times",
      artist: "Harry Styles",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/3d/5e/aa/3d5eaaa3-9a86-c264-5cd5-7fac83f99a59/886446451978.jpg/600x600bb.jpg",
      snippet: "/songs/pop/harry_styles_sign_of_the_times.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Soul Kitchen",
      artist: "The Doors",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Features115/v4/03/c6/2d/03c62d8a-487f-78c3-8416-488cfac664eb/dj.sboowgda.jpg/600x600bb.jpg",
      snippet: "/songs/rock/the_doors_soul_kitchen.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "ROCKSTAR (feat. Roddy Ricch)",
      artist: "DaBaby",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/1b/63/04/1b630400-490e-245b-a26f-0120f6f253c8/20UMGIM28168.rgb.jpg/600x600bb.jpg",
      snippet:  "/songs/rap/dababy_rockstar_feat_roddy_ricch.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-07-14": [
    {
      title: "Manchild",
      artist: "Sabrina Carpenter",
      cover: "/songs/covers/mansbest.jpg",
      snippet: "/songs/pop/manchild.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Smooth Operator",
      artist: "Sade",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/4d/d5/a1/4dd5a1b7-7134-f0ec-b55c-54ac47cc88a5/886448655886.jpg/600x600bb.jpg",
      snippet: "/songs/pop/sade_smooth_operator.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Sundrees",
      artist:"A$ap Rocky",
      cover:"/songs/covers/sundress.jpg",
      snippet: "/songs/rap/sundress.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
   "2026-07-15": [
     {
      title: "Fancy",
      artist: "Twice",
      cover: "/songs/covers/fancytwice.jpg",
      snippet: "/songs/pop/fancy.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Dear Maria, Count Me In",
      artist: "All Time Low",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music/7a/ac/cc/mzi.igvemwis.jpg/600x600bb.jpg",
      snippet: "/songs/rock/all_time_low_dear_maria_count_me_in.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Doo Wop (That Thing)",
      artist: "Lauryn Hill",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/09/6b/55/096b55c4-ee8f-23bd-df8f-0ca0821f3028/886446727189.jpg/600x600bb.jpg",
      snippet:  "/songs/pop/lauryn_hill_doo_wop_that_thing.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
   "2026-07-16": [
     {
      title: "Alors on danse",
      artist: "Stromae",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/a8/69/90/a869906a-dd48-b772-785b-871459b36df2/10UMGIM03438.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/pop/stromae_alors_on_danse.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Where Is My Mind?",
      artist: "Pixies",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/68/b7/c0/68b7c018-dc15-f44a-2611-be10237fc9a5/652637080308.png/600x600bb.jpg",
      snippet: "/songs/rock/pixies_where_is_my_mind_2007_remaster.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Sugar On My Tongue",
      artist: "Tyler, The Creator", 
      cover: "/songs/covers/tapglass.jpg",
      snippet: "/songs/rap/sugar_tongue.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-07-17": [
     {
      title: "...Baby One More Time",
      artist: "Britney Spears",
      cover: "/songs/covers/moretime.jpg",
      snippet: "/songs/pop/baby_more_time.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Fear Of The Dark",
      artist: "Iron Maiden", 
      cover: "/songs/covers/feardark.jpg",
      snippet: "/songs/rock/fear_dark.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Fancy (feat. Charli XCX)",
      artist: "Iggy Azalea",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/32/64/0d/32640dc0-879a-2771-cfe7-91ea4568436a/14UMGIM08058.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/rap/iggy_azalea_fancy_feat_charli_xcx.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-07-18": [
     {
      title: "Falling Behind",
      artist: "Laufey",
      cover: "/songs/covers/everythinglive.jpg",
      snippet: "/songs/pop/falling_behind.mp3",
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
      title: "Water",
      artist: "Tyla",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/1e/c9/5b/1ec95bbc-a56f-cbef-070c-ddec9f4fdd3c/196871296205.jpg/600x600bb.jpg",
      snippet: "/songs/pop/tyla_water.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-07-19": [
     {
      title: "Narcotic",
      artist: "Liquido",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/9f/b9/7b/9fb97b71-aa99-2d0a-cb53-69443c427bd7/859784003444_cover.jpg/600x600bb.jpg",
      snippet: "/songs/pop/bryce_savage_narcotic.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "To Hell and Back",
      artist: "Sabaton",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/21/b8/41/21b84170-87e6-d667-599a-c8a6ab0a9f8b/cover.jpg/600x600bb.jpg",
      snippet: "/songs/rock/sabaton_to_hell_and_back.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "I'll Be Missing You (feat. Faith Evans, 112)",
      artist: "Puff Daddy & Faith Evans",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/09/6b/55/096b55c4-ee8f-23bd-df8f-0ca0821f3028/886446727189.jpg/600x600bb.jpg",
      snippet:  "/songs/rap/puff_daddy_faith_evans_i_ll_be_missing_you_feat_faith_evans_112.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-07-20": [
     {
      title: "Sofia",
      artist: "Alvaro Soler",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/05/d7/e1/05d7e189-c4d5-331f-0327-da3add4bae06/16UMGIM14728.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/pop/alvaro_soler_sofia.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
    {
      title: "Cigarette Daydreams",
      artist: "Cage the Elephant",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/02/d2/e2/02d2e290-82c9-bcf4-73fa-4cd06f65f4b9/886444143073.jpg/600x600bb.jpg",
      snippet: "/songs/rock/cage_the_elephant_cigarette_daydreams.mp3",
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
  "2026-07-22": [
     {
      title: "Wrecking Ball",
      artist: "Miley Cyrus",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/e3/e0/84/e3e08400-2d03-75f9-6b8b-a3345452aa98/886444197816.jpg/600x600bb.jpg",
      snippet: "/songs/pop/miley_cyrus_wrecking_ball.mp3",
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
      title: "Babydoll",
      artist: "Dominic Fike",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/2d/37/18/2d3718e9-8620-b603-d3cc-f34ce817070d/886447290170.jpg/600x600bb.jpg",
      snippet: "/songs/rock/dominic_fike_babydoll.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
   "2026-07-23": [
     {
      title: "Everything I Wanted",
      artist: "Billie Eilish",
      cover: "/songs/covers/everythingwanted.jpg",
      snippet: "/songs/pop/everything_wanted.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
     {
      title: "Sweet Dreams (Are Made of This)",
      artist: "Eurythmics",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Features125/v4/ad/d3/3d/add33dea-0a4d-9509-643b-939ba6735733/dj.vpugapfp.jpg/600x600bb.jpg",
      snippet: "/songs/pop/eurythmics_sweet_dreams_are_made_of_this.mp3",
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
  "2026-07-24": [
     {
      title: "1999",
      artist: "Charli xcx & Troye Sivan",
      cover: "/songs/covers/1999.jpg",
      snippet: "/songs/pop/1999.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
     {
      title: "Rock You Like a Hurricane",
      artist: "Scorpions",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/19/6a/ff/196aff71-fbb8-22f3-ac2c-c12eaf9fb3b1/00602567826019.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/rock/scorpions_rock_you_like_a_hurricane.mp3",
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
  "2026-07-25": [
     {
      title: "Titanium (feat. Sia)",
      artist: "David Guetta",
      cover: "/songs/covers/nothingbeat.jpg",
      snippet: "/songs/pop/titanium.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
     {
      title: "Yellow Submarine",
      artist: "The Beatles",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/b1/94/f3/b194f3c3-3bcf-62f6-a795-093a3d3c0407/00602567725640.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/rock/the_beatles_yellow_submarine.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Greenlight (feat. Flo Rida & LunchMoney Lewis)",
      artist: "Pitbull",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/5e/55/ac/5e55ac3d-ffae-a2b6-a8ef-301785c7e66f/886445996326.jpg/600x600bb.jpg",
      snippet: "/songs/pop/pitbull_greenlight_feat_flo_rida_lunchmoney_lewis.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
   "2026-07-26": [
     {
      title: "Hung Up",
      artist: "Madonna",
      cover: "/songs/covers/dancefloor.jpg",
      snippet: "/songs/pop/hung_up.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
     {
      title: "Gimme! Gimme! Gimme! (A Man After Midnight)",
      artist: "Abba",
      cover: "/songs/covers/voulez.jpg",
      snippet: "/songs/pop/gimme.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "Forever (with Drake, Kanye West & Lil Wayne)",
      artist: "Drake, Kanye West, Lil Wayne & Eminem",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music118/v4/b2/eb/92/b2eb92ce-84f7-9ccd-709f-063c30de71c3/00602527307749.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/rap/drake_kanye_west_lil_wayne_eminem_forever_with_drake_kanye_west_lil_wayne.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-07-27": [
     {
      title: "33 Max Verstappen",
      artist: "Carte Blanq & Maxx Power",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/f9/54/34/f95434f8-831b-773b-4da8-2b12948da718/859753742459.jpg/600x600bb.jpg",
      snippet: "/songs/pop/carte_blanq_maxx_power_33_max_verstappen.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
     {
      title: "Pneuma",
      artist: "Tool", 
      cover: "/songs/covers/inocolum.jpg",
      snippet: "/songs/rock/pneuma.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
    {
      title: "WHISTLE",
      artist: "BLACKPINK",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/66/1f/06/661f06a5-a04a-be0a-8683-4ff5123bda1e/blackpink_fin0807.jpg/600x600bb.jpg",
      snippet: "/songs/pop/blackpink_whistle.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-07-28": [
     {
      title: "Friends",
      artist: "Marshmello & Anne-Marie",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/43/4d/a2/434da25b-fa20-9454-96c7-c23f236f3876/0.jpg/600x600bb.jpg",
      snippet: "/songs/pop/ssstas_marshmello_anne_marie_friends_remix.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
     {
      title: "Hoppípolla",
      artist: "Sigur Rós",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/ce/3e/b8/ce3eb805-fb13-0200-5856-081ed0014e13/190296926952.jpg/600x600bb.jpg",
      snippet: "/songs/rock/sigur_ros_hopp_polla.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
   {
      title: "Money Trees (feat. Jay Rock)",
      artist: "Kendrick Lamar",
      cover: "/songs/covers/gkmd.jpg",
      snippet: "/songs/rap/money_trees.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-07-29": [
     {
      title: "Genie in a Bottle",
      artist: "Christina Aguilera",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/6b/25/9b/6b259bc3-3e53-4339-80b0-5b50131c8901/888880771674.jpg/600x600bb.jpg",
      snippet: "/songs/pop/christina_aguilera_genie_in_a_bottle.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
     {
      title: "The Show Must Go On",
      artist: "Queen", 
      cover: "/songs/covers/innuendo.jpg",
      snippet: "/songs/rock/show_must_go.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
   {
      title: "So Fresh, So Clean",
      artist: "Outkast",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/d6/21/fb/d621fbde-c099-6794-7102-2692f10c4dbb/886448814283.jpg/600x600bb.jpg",
      snippet: "/songs/rap/outkast_so_fresh_so_clean_radio_mix.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
   "2026-07-30": [
     {
      title: "stupid song",
      artist: "Olivia Rodrigo",
      cover:  "/songs/covers/Olivia_Rodrigo_-_You_Seem_Pretty_Sad_for_a_Girl_So_in_Love.jpg",
      snippet: "/songs/pop/stupid_song_olivka.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
     {
      title: "Land of Confusion",
      artist: "Genesis",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/6c/44/66/6c446642-e67c-b19f-e8cb-e084eb549056/mzi.tbamlbgz.jpg/600x600bb.jpg",
      snippet: "/songs/rock/genesis_land_of_confusion_2007_remaster.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
   {
      title: "It's Tricky",
      artist: "Run-DMC",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/00/3f/21/003f21c0-6bc3-dbed-7081-04ffaf172016/078221640824.jpg/600x600bb.jpg",
      snippet: "/songs/rap/run_dmc_it_s_tricky.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
   "2026-07-31": [
     {
      title: "One Last Time",
      artist: "Ariana Grande",
      cover:  "/songs/covers/everything.jpg",
      snippet: "/songs/pop/one_last_time.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
     {
      title: "Nutshell",
      artist: "Alice In Chains",
      cover:  "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/bd/d6/37/bdd6373e-dc26-e86e-1d31-9bb1f7656968/5099747485527.jpg/600x600bb.jpg",
      snippet: "/songs/rock/alice_in_chains_nutshell.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
   {
      title: "Fancy (feat. Charli XCX)",
      artist: "Iggy Azalea",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/32/64/0d/32640dc0-879a-2771-cfe7-91ea4568436a/14UMGIM08058.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/rap/iggy_azalea_fancy_feat_charli_xcx.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
   "2026-08-01": [
     {
      title: "LIKE THAT",
      artist: "BABYMONSTER",
      cover:  "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/fb/68/85/fb68856f-4965-5d30-78ea-fe6bb261f4ff/3000px.jpg/600x600bb.jpg",
      snippet: "/songs/pop/babymonster_like_that.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
     {
      title: "The Middle",
      artist: "Jimmy Eat World",
      cover:  "https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/00/5a/5f/005a5f5a-5e6a-8e41-fc71-009bf75e6e72/842108089668.jpg/600x600bb.jpg",
      snippet: "/songs/rock/jimmy_eat_world_the_middle_live.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
   {
      title: "X Gon' Give It to Ya",
      artist: "DMX",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/7f/03/95/7f039588-d333-8dcb-cfe3-85d4646047e3/07UMGIM08038.rgb.jpg/600x600bb.jpg",
      snippet: "/songs/rap/dmx_x_gon_give_it_to_ya.mp3",
      categories: ["rap"],
      dailyCategory: "Rap",
    },
  ],
  "2026-08-02": [
     {
      title: "Photograph",
      artist: "Ed Sheeran",
      cover:  "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/2d/36/f9/2d36f9a7-2c3e-ce0f-7fb6-036feecb221f/825646974450.jpg/600x600bb.jpg",
      snippet: "/songs/pop/ed_sheeran_photograph.mp3",
      categories: ["pop"],
      dailyCategory: "Pop",
    },
     {
      title: "Rock & Roll Queen (Radio Edit)",
      artist: "The Subways",
      cover:  "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/77/1e/bb/771ebbef-8154-0099-6f75-798671d54961/4050538595840.jpg/600x600bb.jpg",
      snippet: "/songs/rock/the_subways_rock_roll_queen_radio_edit.mp3",
      categories: ["rock"],
      dailyCategory: "Rock",
    },
   {
      title: "What's Your Number? (feat. Tim Armstrong)",
      artist: "Cypress Hill",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/c1/3e/50/c13e5023-a4d9-7df5-8ed9-4ce6f0dafbf5/886444729420.jpg/600x600bb.jpg",
      snippet: "/songs/rap/cypress_hill_what_s_your_number_feat_tim_armstrong.mp3",
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
