import type { StringKey } from "../constants/strings";

export type ToolItem = {
  icon: string;
  titleKey: StringKey;
  descriptionKey: StringKey;
  linkKeys: StringKey[];
};

export const toolsData: ToolItem[] = [
  {
    icon: "♟️",
    titleKey: "tool_play_games",
    descriptionKey: "tool_play_desc",
    linkKeys: [
      "tool_play_link_1",
      "tool_play_link_2",
      "tool_play_link_3",
      "tool_play_link_4",
    ],
  },
  {
    icon: "🧩",
    titleKey: "tool_solve_problems",
    descriptionKey: "tool_solve_desc",
    linkKeys: [
      "tool_solve_link_1",
      "tool_solve_link_2",
      "tool_solve_link_3",
      "tool_solve_link_4",
    ],
  },
  {
    icon: "📊",
    titleKey: "tool_analyze_games",
    descriptionKey: "tool_analyze_desc",
    linkKeys: [
      "tool_analyze_link_1",
      "tool_analyze_link_2",
      "tool_analyze_link_3",
      "tool_analyze_link_4",
    ],
  },
  {
    icon: "🎓",
    titleKey: "tool_online_classes",
    descriptionKey: "tool_classes_desc",
    linkKeys: [
      "tool_classes_link_1",
      "tool_classes_link_2",
      "tool_classes_link_3",
      "tool_classes_link_4",
    ],
  },
];
