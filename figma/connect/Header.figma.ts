/**
 * Code Connect template (publish when Figma Enterprise is available).
 * Maps Figma Navbar → Chess-Game-frontend Header.
 */
// url=<CHESS_GAME>?node-id=1344-781
// source=src/components/header/Header.tsx
// component=Header

import figma from 'figma';

export default {
  example: figma.code`<Header setActiveModal={setActiveModal} isSettingsOpen={isSettingsOpen} setIsSettingsOpen={setIsSettingsOpen} />`,
  imports: ['import Header from "@/components/header/Header"'],
};
