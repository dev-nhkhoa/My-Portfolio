export type AiImage = {
  file: string;
  alt: string;
  width: number;
  height: number;
};

export const DONT_LEAVE_ME_ALONE_YOUTUBE_ID = "5fGhoAoDTnE";

export const AI_VIDEOS = {
  concerts: {
    src: "/ai/concerts.mp4",
    poster: "/ai/img/concerts-poster.webp",
  },
  hotels: {
    src: "/ai/hotels.mp4",
    poster: "/ai/img/hotels-poster.webp",
  },
} as const;

export const SPOTIFY_CONCERTS_IMAGES: AiImage[] = [
  { file: "pr-pop", alt: "Phone Spotify: pop", width: 1200, height: 2134 },
  {
    file: "cs-main-mic",
    alt: "Character sheet: main singer",
    width: 1200,
    height: 800,
  },
  { file: "pr-rock", alt: "Phone Spotify: rock", width: 1200, height: 1800 },
  {
    file: "env-bath-green",
    alt: "Bathroom environment",
    width: 1200,
    height: 800,
  },
  {
    file: "cs-rock-dex",
    alt: "Character sheet: Dex, rock guitarist",
    width: 1200,
    height: 800,
  },
  {
    file: "pr-choir",
    alt: "Phone Spotify: ensemble",
    width: 1200,
    height: 1800,
  },
  {
    file: "three-men-dance",
    alt: "Three men dancing",
    width: 1200,
    height: 800,
  },
  {
    file: "cs-choir",
    alt: "Character sheet: The Quiet Ensemble",
    width: 1200,
    height: 800,
  },
  {
    file: "choir-window-final",
    alt: "Ensemble near the window",
    width: 1200,
    height: 800,
  },
  { file: "room-sheet", alt: "Room sheet", width: 1200, height: 800 },
  {
    file: "main-singer-focus",
    alt: "Main singer close-up",
    width: 1200,
    height: 800,
  },
];

export const SPOTIFY_WERO_IMAGES: AiImage[] = [
  { file: "kf-sh01", alt: "Keyframe 01: room, wide", width: 1200, height: 675 },
  {
    file: "kf-sh02",
    alt: "Keyframe 02: face close-up",
    width: 1200,
    height: 675,
  },
  {
    file: "kf-sh03",
    alt: "Keyframe 03: screen, finger hovers",
    width: 1200,
    height: 675,
  },
  {
    file: "kf-sh05",
    alt: "Keyframe 05: cursor on Rock",
    width: 1200,
    height: 670,
  },
  {
    file: "img-laptop-search",
    alt: "Laptop with Spotify Browse all",
    width: 1200,
    height: 675,
  },
  { file: "env-jazz", alt: "Environment: jazz bar", width: 1200, height: 675 },
  {
    file: "env-rock",
    alt: "Environment: rock rehearsal room",
    width: 1200,
    height: 675,
  },
  {
    file: "env-opera",
    alt: "Environment: grand theatre hall",
    width: 1200,
    height: 675,
  },
];

export const DONT_LEAVE_ME_ALONE_IMAGES: AiImage[] = [
  {
    file: "dla-thumb-169",
    alt: "DON'T LEAVE ME ALONE: YouTube thumbnail",
    width: 1200,
    height: 675,
  },
  {
    file: "dla-thumb-916",
    alt: "DON'T LEAVE ME ALONE: vertical cover",
    width: 1200,
    height: 2134,
  },
  {
    file: "dla-master-seating",
    alt: "Master seating shot",
    width: 1200,
    height: 675,
  },
  {
    file: "dla-jane-sheet",
    alt: "Character sheet: Jane",
    width: 1200,
    height: 800,
  },
  {
    file: "dla-noah-sheet",
    alt: "Character sheet: Noah",
    width: 1200,
    height: 800,
  },
  {
    file: "dla-scale-lineup",
    alt: "Character scale lineup: Ellie, Jane, Noah",
    width: 1200,
    height: 800,
  },
  {
    file: "dla-living-room",
    alt: "Environment: living room",
    width: 1200,
    height: 675,
  },
  {
    file: "dla-kitchen",
    alt: "Environment: kitchen",
    width: 1200,
    height: 675,
  },
  {
    file: "dla-bedroom",
    alt: "Environment: bedroom",
    width: 1200,
    height: 675,
  },
  {
    file: "dla-peephole",
    alt: "Environment: view through the peephole",
    width: 1200,
    height: 670,
  },
];
