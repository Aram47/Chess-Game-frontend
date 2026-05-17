/**
 * Code Connect template for Figma Frame 81 (3736:8866).
 * Reimplementation should update ReadyToPlay.tsx to match inline Figma layout.
 */
// url=<CHESS_GAME>?node-id=3736-8866
// source=src/components/readyToPlay/ReadyToPlay.tsx
// component=ReadyToPlay

import figma from 'figma';

export default {
  example: figma.code`<ReadyToPlay handleBotGame={handleBotGame} handleFindMatch={handleFindMatch} />`,
  imports: [
    'import ReadyToPlay from "@/components/readyToPlay/ReadyToPlay"',
    'import type { BotLevel } from "@/types/gameType"',
  ],
};
