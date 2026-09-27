// Central birthday configuration - all user-facing content lives here
// Change env vars for names; change this file for all other content

const personName = process.env.NEXT_PUBLIC_BIRTHDAY_NAME ?? "Sunshine";
const senderName = process.env.NEXT_PUBLIC_SENDER_NAME ?? "Someone Special";

export const birthdayConfig = {
  person: {
    name: personName,
    nickname: personName,
    senderName: senderName,
    age: "22",
  },

  intro: {
    eyebrow: "make a wish...",
    title: "Happy",
    titleLine2: "Birthday",
    dividerText: "—",
    subtitle: "to someone worth celebrating",
    continueText: "Open Your Gift →",
    floatingHearts: true,
  },

  heartTree: {
    eyebrow: "it's officially your day",
    title: `Happy Birthday, ${personName}`,
    subtitle: `and just like that, you're turning ${process.env.NEXT_PUBLIC_BIRTHDAY_NAME === "Ayesha" ? "22" : "another year"} ✨`,
    description:
      "Another year of you being exactly who you are. That's more than enough reason to celebrate.",
    continueText: "Keep going ↓",
  },

  cake: {
    eyebrow: "First things first 🎂",
    subtitle: "Baking something sweet...",
    candleText: "Make a wish!",
    blowText: "Click the candle to blow it out ✨",
    continueText: "Seek",
    postBlowText: "Now for the real gift...",
  },

  balloons: {
    heading: "Pop a balloon!",
    subheading: "Each one holds something I want you to know 🎈",
    allPoppedText: "You found them all ✨",
    continueText: "One more thing...",
  },

  reasons: [
    {
      title: "You make everything brighter",
      message:
        "The way you walk into a room and suddenly everything feels a little lighter — that's you. That's just the energy you carry.",
    },
    {
      title: "Your laugh is contagious",
      message:
        "I dare anyone to hear you laugh and not smile. It's genuinely impossible. You have the best laugh.",
    },
    {
      title: "You remember the little things",
      message:
        "You notice details other people miss. You remember things people said weeks ago. That kind of care is rare.",
    },
    {
      title: "You're stronger than you think",
      message:
        "You've been through more than most people know, and you still show up every single day. That takes real courage.",
    },
    {
      title: "Being around you just feels different",
      message:
        "There's a kind of comfort in your presence that's hard to explain. It just feels like everything is okay when you're around.",
    },
    {
      title: "You inspire without trying",
      message:
        "You don't have to say anything — the way you live and love and show up inspires people around you more than you realize.",
    },
  ],

  letter: {
    title: "One last thing...",
    salutation: `Dear ${personName},`,
    paragraphs: [
      `Happy Birthday. Not just as a formality — genuinely, deeply, happy birthday.`,
      `I've been thinking about what to say, and honestly, words feel small for what I want to express. But I'll try anyway.`,
      `You are one of those rare people who makes the world feel warmer just by existing in it. The way you care, the way you laugh, the way you pay attention — it all matters more than you know.`,
      `On this day, I just want you to feel everything I can't always say out loud. You deserve every good thing. Every soft morning, every beautiful surprise, every moment that makes you feel truly seen.`,
      `Thank you for being you. Exactly as you are. Not a version of you that's more polished or more put-together — just you. That's the person worth celebrating today.`,
      `Here's to your day. Here's to you. 🌸`,
    ],
    closing: `With so much warmth,`,
    signature: senderName,
  },

  final: {
    title: "Happy Birthday",
    name: personName,
    message: `Wishing you a day as beautiful as you are. May this year bring you everything your heart quietly hopes for. 🎂✨`,
    signature: `— ${senderName}`,
    emoji: "🎉",
  },

  audio: {
    enabled: false,
    source: "/audio/birthday.mp3",
  },
} as const;

export type BirthdayConfig = typeof birthdayConfig;
