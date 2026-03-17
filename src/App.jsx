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
      cover: "/songs/covers/cantleave.jpg",
      snippet: "/songs/rock/beautiful_day.mp3",
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
  ]
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
