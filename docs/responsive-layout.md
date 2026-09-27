# Responsive layout

The visual design stays as it is. This work only changes layout so the app fits a phone, a resized window, and a laptop without horizontal scrolling or overlapping the writing.

Check these widths: 375, 768, 1024, 1280, 1440. Also check light and dark, and English, Russian, and Armenian.

## Shared rules

Tokens live in `src/index.css`.

| Token | Value |
| --- | --- |
| `--page-gutter` | `1rem`, `1.5rem` from 768px, `2rem` from 1024px |
| `--header-band` | `110px` |
| `--z-header` | `40` |
| `--z-dropdown` | `50` |
| `--z-overlay` | `80` |
| `--z-modal` | `100` |

`.page-gutter` applies `padding-inline: var(--page-gutter)`. Do not wrap a page in it if that page already has its own horizontal padding.

The shell is `src/layouts/style.css` and `src/layouts/Layout.tsx`. The app uses `width: 100%` and `min-height: 100dvh`. `overflow-x: hidden` stays on the shell until the remaining pages stop using fixed widths.

## Done

### Phase 1 — Shell

- `src/index.css`
- `src/layouts/style.css`
- `src/layouts/Layout.tsx`
- `src/components/header/header.module.scss` (z-index only)

### Phase 2 — Header

The pill collapses from its own width (`container-type: inline-size` on `.cm_container`), not from the viewport. Russian and Armenian labels are longer than English.

| Pill width | What stays in the pill |
| --- | --- |
| 1120px and up | Logo, four links, theme, language, auth |
| 640–1119px | Logo, theme, language, Sign In or avatar, menu button |
| Under 640px | Logo and menu button |

The menu closes on Escape, on a click outside, and on a route change.

- `src/components/header/Header.tsx`
- `src/components/header/header.module.scss`
- `src/constants/strings.ts` (`header_menu`)
- `src/locales/ru/common.ts`
- `src/locales/am/common.ts`

### Phase 3 — Home hero

Below 1280px the hero is a column: headline, buttons, board, then the second copy. Nothing is absolutely positioned, so the board cannot cover the writing while the window is resized.

From 1280px up, the entrance animation stays. The text column is `min(50%, calc(80% - 500px - 2rem))` so it stops short of the 500px board. `prefers-reduced-motion: reduce` skips the animation and keeps the first headline and the board in place.

Home `main` is in normal flow below `xl` (1280px) and `absolute` from `xl` up, so the column starts under the header.

- `src/components/main/chess-section/index.tsx`
- `src/components/main/chess-section/style.module.scss`
- `src/components/main/chess-section/master-section/style.module.scss`
- `src/components/main/chess-section/play/style.module.scss`
- `src/layouts/Layout.tsx`

### Phase 4 — Boards reflow

Below 1024px, play, the live game, analysis, and the puzzle solver are one column. Side panels are `w-full` until `lg`, then `lg:w-[35%]` where they sit beside the board. Boards stay `w-full max-w-[600px]`. The page may still scroll. The one-viewport analysis tool is still Phase 5.

- `src/components/game/Game.tsx`
- `src/components/game/gameHistory.tsx`
- `src/components/readyToPlay/ReadyToPlay.tsx`
- `src/components/readyToPlay/platformCard.tsx`
- `src/components/readyToPlay/PlayModeChips.tsx`
- `src/pages/Analyze/page.tsx`
- `src/pages/Analyze/style.scss`
- `src/components/problems/solve-problem/SolveProblem.tsx`
- `src/components/problems/solve-problem/SolveHistory.tsx`
- `src/pages/Problems/Page2.tsx`
- `src/components/problems/SelectProblems.tsx`

## Still to do

### Phase 5 — Analysis workspace

`/analyze` must fit one viewport. The page itself does not scroll. Only the move list and the game list scroll. Pressing Analyze must not push the transport buttons off screen.

On a phone, keep the same shell and swap panes (board, then moves). Do not promise a single unscrolled view of the board plus both lists at 375px.

The same shell should be reused afterward on the live game and the puzzle solver.

- `src/pages/Analyze/page.tsx` (title and padding already shrink; the viewport shell is still open)
- `src/components/analyze/containers/LeftColumn.tsx`
- `src/components/analyze/containers/AnalyzeColumn.tsx` (`max-h-[600px]` move list)
- `src/components/analyze/helpers/ChessColumn.tsx`
- `src/components/analyze/helpers/AnalyzeButtons.tsx`

### Phase 6 — Profile, settings, dialogs

- `src/pages/Profile/page.tsx`
- `src/components/profile/first-section/ProfileSection.tsx` (`w-[23%]`, edit dialog `w-[502px]`)
- `src/components/profile/first-section/index.tsx`
- `src/components/profile/sec-section/index.tsx`
- `src/components/profile/third-section/index.tsx`
- `src/components/settings/SettingsHistory.tsx`
- `src/helpers/Modal.tsx`

### Phase 7 — About and remaining marketing blocks

- `src/pages/AboutPage/page.tsx` (back button `absolute -left-[32px]`, footer row does not wrap)
- `src/components/about/OurStory.tsx`
- `src/components/about/Team.tsx`
- `src/components/about/Ready.tsx`
- `src/components/footer/Footer.tsx`

### Phase 8 — Pass

Check 375, 768, 1024, 1280, and 1440, portrait and landscape, both themes, all three languages. Confirm no horizontal scroll, visible focus, and that reduced motion does not run the home entrance.
