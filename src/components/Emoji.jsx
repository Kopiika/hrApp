import { Icon } from "@iconify/react";

//Map animal names to emojis (Iconify: npm install @iconify/react)
export default function Emoji({ animal, size = 24 }) {
  if (!animal) return null;
  const map = {
    Owl: "🦉",
    Cat: "🐱",
    Dog: "🐶",
    Fox: "🦊",
    Bear: "🐻",
    Tiger: "🐯",
    Elephant: "🐘",
    Lion: "🦁",
    Rabbit: "🐰",
    Dolphin: "🐬",
    Penguin: "🐧",
    Horse: "🐴",
    Raven: "🐦‍⬛",
  };

  if (map[animal]) return <span style={{ fontSize: size, lineHeight: 1 }}>{map[animal]}</span>;

  return <Icon icon={`twemoji:${animal.toLowerCase()}`} width={size} height={size} />;
}