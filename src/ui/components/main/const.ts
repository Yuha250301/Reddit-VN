export const enum Section {
  HOME = "home",
  FORUM = "forum",
  MISSION = "mission",
  SEASON = "season",
  TRANSLATE = "translate",
  PROFILE = "profile",
  TRANSLATING = "translating",
  GUIDE = "guide",
  SUGGESTION = "suggestion",
}

export const MENU: Section[] = [Section.FORUM, Section.MISSION, Section.SEASON];

export const HEADER: Section[] = [
  Section.FORUM,
  Section.MISSION,
  Section.SEASON,
  Section.TRANSLATE,
  Section.PROFILE,
];

export const NAV: Section[] = [
  Section.TRANSLATE,
  Section.TRANSLATING,
  Section.GUIDE,
  Section.SUGGESTION,
];
