export interface BadgeDefinition {
  id: string;
  title: string;
  description: string;
  emoji: string;
  requiredPoints: number;
}

export const badgeDefinitions: BadgeDefinition[] = [
  {
    id: "first-task",
    title: "İlk Adım",
    description: "İlk adım görevini tamamlayınca kazanılır.",
    emoji: "🏆",
    requiredPoints: 1,
  },
  {
    id: "fifty-points",
    title: "50 Puan",
    description: "Toplam 50 puana ulaÅŸtÄ±ÄŸÄ±nda kazanÄ±lÄ±r.",
    emoji: "😎",
    requiredPoints: 50,
  },

  {
    id: "hundred-points",
    title: "GeliÅŸim Yolcusu",
    description: "Toplam 100 puana ulaÅŸtÄ±ÄŸÄ±nda kazanÄ±lÄ±r.",
    emoji: "ðŸ†",
    requiredPoints: 100,
  },

  {
    id: "two-hundred-points",
    title: "200 Puan",
    description: "Toplam 200 puana ulaÅŸtÄ±ÄŸÄ±nda kazanÄ±lÄ±r.",
    emoji: "ðŸ†",
    requiredPoints: 200,
  },
];

export function getUnlockedBadges(
  totalPoints: number,
  storedBadgeIds: string[] = [],
) {
  return badgeDefinitions.filter(
    (badge) =>
      storedBadgeIds.includes(badge.id) || totalPoints >= badge.requiredPoints,
  );
}
