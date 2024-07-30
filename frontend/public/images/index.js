import flame from './flame.svg';
import next from './next.svg';
import calendar from './calendar.svg';
import star from './star.svg';
import android from './android.svg';
import ios from './ios.svg';
import ps from './ps.svg';
import nintendo from './nintendo.svg';
import dice from './dice.svg';
import controller from './controller.svg';
import played from './played.svg';
import notPlayed from './notPlayed.svg';
import medal from './medal.svg';
import { jwtDecode } from 'jwt-decode';
import { destroyCookie } from 'nookies';
import xbox from './xbox.svg';
import { Cloudinary } from '@cloudinary/url-gen';
import windows from './windows.svg';
export { default as arrowDown } from './arrow-down.svg';
export { default as arrowdown } from './arrowDown.svg';
export { default as arrdown } from './arrdown.svg';
export { default as tick } from './tick.svg';
export { default as iosWhite } from './iosWhite.svg';
export { default as androidWhite } from './androidWhite.svg';
export { default as psWhite } from './psWhite.svg';
export { default as xboxWhite } from './xboxWhite.svg';
export { default as windowsWhite } from './windowsWhite.svg';
export { default as ellipsisWhite } from './ellipsisWhite.svg';
export { default as plusWhite } from './plusWhite.svg';
export { default as giftBox } from './giftBox.svg';
export { default as riot } from './riot.svg';
export { default as pumpkincry } from './pumpkincry.svg';
export { default as pumpkinmeh } from './pumpkinmeh.svg'
export { default as thumbsUp } from './thumbsUp.svg';
export { default as bomb } from './bomb.svg';
export { default as isaac } from './isaac.jpeg';
export { default as grateful } from './grateful.jpg';
export { default as greenplus } from './greenplus.svg';
export { default as x } from './x.svg';
export { default as facebook } from './facebook.svg';
export { default as fb } from './fbchunky.svg';
export { default as cart } from './cart.svg';
export { default as google } from './google.svg';
export { default as vamp } from './vamp.jpg';
export { default as blood } from './blood.jpg';
export { default as alpha } from './alpha.jpg';
export { default as action } from './action.png';
export { default as nintendoWhite } from './nintendoWhite.svg';
export { default as thumbsop } from './thumbsop.svg';
export { default as thumbsDown } from './thumbsDown.svg'
export { default as play } from './play.svg';
export { default as cry } from './cry.svg';
export { default as logout } from './logout.svg';
export { default as email } from './email.svg';
export { default as grass } from './grass.svg';
export { default as login } from './login.svg';
export { default as whiteTick } from './whiteTick.svg';
export { default as medal } from './medal.svg';
export { default as notPlayed } from './notPlayed.svg';
export { default as controller } from './controller.svg';
export { default as dice } from './dice.svg';
export { default as played } from './played.svg';
import guns from './guns.svg';
import action from './action.png';
import rpg from './rpg.png';
import shooter from './shooter.png';
import racing from './racing.png';
import sports from './sports.png';
import strategy from './strategy.png';
import adventure from './adventure.png';
import puzzle from './puzzle.png';
import psWhite from './psWhite.svg';
import windowsWhite from './windowsWhite.svg';
import xboxWhite from './xboxWhite.svg';
import nintendoWhite from './nintendoWhite.svg';
import iosWhite from './iosWhite.svg';
import androidWhite from './androidWhite.svg';
import bomb from './bomb.svg';
import thumbsUp from './thumbsUp.svg';
import thumbsDown from './thumbsDown.svg';
import pumpkincry from './pumpkincry.svg';
import pumpkinmeh from './pumpkinmeh.svg';

export const cld = new Cloudinary({ cloud: { cloudName: 'dntmdehob' } });

export const decodeToken = (token) => {
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
};

export const isLoggedIn = () => {
  const token = localStorage.getItem('token');
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      localStorage.removeItem('token');
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
};

export const tickVariant = {
  initial: {
    scale: 0,
    opacity: 0
  },
  enter: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.2, ease: [0.85, 0, 0.15, 1] }
  },
  exit: {
    scale: 0,
    opacity: 0,
    transition: { duration: 0.2, ease: [0.85, 0, 0.15, 1] }
  }
}

export const newReleases = [
  { image: star, text: "Last 30 days" },
  { image: flame, text: "This week" },
  { image: next, text: "Next week" },
  { image: calendar, text: "Latest releases" }
]

export const gradients = [
  "linear-gradient(to bottom, #FFEBEE 0%, #FF8A65 50%, #D84315 100%)",
  "linear-gradient(to bottom, #FFF3E0 0%, #FFB74D 50%, #F57C00 100%)",
  "linear-gradient(to bottom, #FFE0B2 0%, #FFB74D 50%, #F57C00 100%)",
  "linear-gradient(to bottom, #FFF8E1 0%, #FFCC80 50%, #FF6F00 100%)",
  "linear-gradient(to bottom, #FFE0B2 0%, #FFAB40 50%, #FF5722 100%)",
  "linear-gradient(to bottom, #FFEBEE 0%, #FF7043 50%, #D32F2F 100%)",
  "linear-gradient(to bottom, #FBE9E7 0%, #FF8A65 50%, #F57C00 100%)",
  "linear-gradient(to bottom, #FFF3E0 0%, #FFB74D 50%, #F57C00 100%)",
  "linear-gradient(to bottom, #FFF9C4 0%, #FFEB3B 50%, #FBC02D 100%)",
  "linear-gradient(to bottom, #FFE0B2 0%, #FFB74D 50%, #F57C00 100%)"
];


export const platforms = [
  { image: windows, text: "PC" },
  { image: ps, text: "PlayStation 5" },
  { image: xbox, text: "Xbox One" },
  { image: nintendo, text: "Nintendo Switch" },
  { image: ios, text: "iOS" },
  { image: android, text: "Android" },
]

export const getMiddleDigit = (digit) => {
  const str = digit.toString();
  return Number(str[str.length - 1]);
}


export const genres = [
  { image: action, text: "Action" },
  { image: guns, text: "Guns" },
  { image: shooter, text: "Shooter" },
  { image: rpg, text: "RPG" },
  { image: racing, text: "Racing" },
  { image: adventure, text: "Adventure" },
  { image: sports, text: "Sports" },
  { image: strategy, text: "Strategy" },
  { image: puzzle, text: "Puzzle" }
]

export const comment = {
  "Exceptional": bomb,
  "Recommend": thumbsUp,
  "Meh": pumpkinmeh,
  "Skip": pumpkincry
}

export const panel = [
  {image: dice, mainText: "Uncategorized", spanText: "I'll pick the category later"},
  {image: controller, mainText: "Currently playing", spanText: "I'm playing this game currently"},
  {image: medal, mainText: "Completed", spanText: "I'm done playing this game"},
  {image: played, mainText: "Played", spanText: "I gave up and won't play anymore"},
  {image: notPlayed, mainText: "Not played", spanText: "I'll play it later"}
]

export const quickReview = [
  {image: bomb, span: "Exceptional"},
  {image: thumbsUp, span: "Recommend"},
  {image: pumpkinmeh, span: "Meh"},
  {image: pumpkincry, span: "Skip"}
]

export const platformIcons = {
  PS5: psWhite,
  PC: windowsWhite,
  'Xbox One': xboxWhite,
  'Nintendo Switch': nintendoWhite,
  iOS: iosWhite,
  Android: androidWhite,
};

export const cardArray = [
  "my-videos/boat_tyrkf7",
  "my-videos/kill_qhzkbt",
  "my-videos/switch_muf00v",
  "my-videos/tekken8_fwdock",
  "my-videos/tekken_t2s1md",
  "my-videos/lastepoch_bepih3",
  "my-videos/metalgearsolid_lspadg",
  "my-videos/lastepoch_bepih3",
  "my-videos/cod_znvbzr",
  "my-videos/cod_ttbwyz",
  "my-videos/lastepoch_bepih3",
  "my-videos/switch_muf00v",
  "my-videos/boat_tyrkf7",
  "my-videos/kill_qhzkbt",
  "my-videos/switch_muf00v",
  "my-videos/tekken8_fwdock",
  "my-videos/tekken_t2s1md",
  "my-videos/lastepoch_bepih3",
  "my-videos/metalgearsolid_lspadg",
  "my-videos/lastepoch_bepih3",
  "my-videos/cod_znvbzr",
  "my-videos/cod_ttbwyz",
  "my-videos/lastepoch_bepih3",
  "my-videos/switch_muf00v",
  "my-videos/boat_tyrkf7",
  "my-videos/kill_qhzkbt",
  "my-videos/switch_muf00v",
  "my-videos/tekken8_fwdock",
  "my-videos/tekken_t2s1md",
  "my-videos/lastepoch_bepih3",
  "my-videos/metalgearsolid_lspadg",
  "my-videos/lastepoch_bepih3",
  "my-videos/cod_znvbzr",
  "my-videos/cod_ttbwyz",
  "my-videos/lastepoch_bepih3",
  "my-videos/switch_muf00v",
  "my-videos/boat_tyrkf7",
  "my-videos/kill_qhzkbt",
  "my-videos/switch_muf00v",
  "my-videos/tekken8_fwdock",
  "my-videos/tekken_t2s1md",
  "my-videos/lastepoch_bepih3",
  "my-videos/metalgearsolid_lspadg",
  "my-videos/lastepoch_bepih3",
  "my-videos/cod_znvbzr",
  "my-videos/cod_ttbwyz",
  "my-videos/lastepoch_bepih3",
  "my-videos/switch_muf00v",
  "my-videos/boat_tyrkf7",
  "my-videos/kill_qhzkbt",
  "my-videos/switch_muf00v",
  "my-videos/tekken8_fwdock",
  "my-videos/tekken_t2s1md",
  "my-videos/lastepoch_bepih3",
  "my-videos/metalgearsolid_lspadg",
  "my-videos/lastepoch_bepih3",
  "my-videos/cod_znvbzr",
  "my-videos/cod_ttbwyz",
  "my-videos/lastepoch_bepih3",
  "my-videos/switch_muf00v",
  "my-videos/boat_tyrkf7",
  "my-videos/kill_qhzkbt",
  "my-videos/switch_muf00v",
  "my-videos/tekken8_fwdock",
  "my-videos/tekken_t2s1md",
  "my-videos/lastepoch_bepih3",
  "my-videos/metalgearsolid_lspadg",
  "my-videos/lastepoch_bepih3",
  "my-videos/cod_znvbzr",
  "my-videos/cod_ttbwyz",
  "my-videos/lastepoch_bepih3",
  "my-videos/switch_muf00v",
]








