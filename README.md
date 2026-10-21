# The Draft

A pass-and-play Pokémon drafting game with manga-style battle narration, built as a single React component.

Every game deals a fresh pool of 15 Pokémon. Trainers snake-draft three each, then battle. On each exchange the attacker picks a move and the defender chooses to **counter** (both hit) or **dodge** (speed decides the odds; a clean dodge punishes). Pokémon can evolve when they're low on HP, and can discover a **New Move** mid-fight that replaces whatever was chosen. Every beat is narrated in short manga-style prose.

## Modes

**2-Player Draft.** Two trainers share one device. Named trainers get a scoreboard record: wins, losses, draws, win percentage and an ELO-style grade. Leave a name blank to play as a guest (nothing is recorded).

**VS Computer: Gym Challenge.** Take on the eight Kanto Gym Leaders in the order Ash earned his badges in the original anime. Each leader drafts and battles with their own skill level, so the ladder gets steadily harder.

| # | Leader | Gym | Badge | Type | Team | Exclusive ace | Gym exclusives |
|---|--------|-----|-------|------|------|---------------|----------------|
| 1 | Brock | Pewter City | Boulder | Rock | 3 | Rhyperior | |
| 2 | Misty | Cerulean City | Cascade | Water | 3 | Starmie | |
| 3 | Lt. Surge | Vermilion City | Thunder | Electric | 3 | Electivire | |
| 4 | Sabrina | Saffron City | Marsh | Psychic | 3 | Mr. Mime | |
| 5 | Erika | Celadon City | Rainbow | Grass | 6 | Bellossom | Tangela, Exeggutor, Roserade |
| 6 | Koga | Fuchsia City | Soul | Poison | 6 | Crobat | Venomoth, Muk, Tentacruel |
| 7 | Blaine | Cinnabar Island | Volcano | Fire | 6 | Magmortar | Rapidash, Magmar, Torkoal |
| 8 | Giovanni | Viridian City | Earth | Ground | 6 | Nidoking | Dugtrio, Nidoqueen, Hippowdon |

- Gyms open one at a time for a named trainer. Guests can practice against any gym, but nothing is saved.
- You always field six in the gym challenge. Brock, Misty, Lt. Surge and Sabrina field three; Erika, Koga, Blaine and Giovanni field a full six. Every leader drafts just two from the shared pool. The rest of their team is their ace plus, for the six-Pokémon leaders, three gym-exclusive Pokémon of their own type.
- Each leader's **ace** is a fully evolved Pokémon that never appears in the 2-player draft. Beat the leader and you earn their badge, and the ace becomes yours to bring into later VS Computer battles. It takes one of your six slots. Gym exclusives are never earned.
- Later leaders also bring stronger aces and a small "gym-trained" stat boost on everyone but their ace (shown on the team screen).
- Difficulty is tuned by simulating players who draft for type advantage (Water and Grass against Brock, and so on). Such a player wins about three times in four against Brock, about half the time against Erika, and about one in three against Giovanni. Drafting for stats as well as type does better.
- Gym battles never change your scoreboard record or grade. Badges show as colored dots next to your name on the scoreboard.

## Run it locally

Requires Node 18 or newer.

```bash
npm install
npm run dev
```

Then open the URL Vite prints. `npm run build` writes a static site to `dist/`.

## Publish with GitHub Pages

This repo includes a workflow (`.github/workflows/deploy.yml`) that builds and deploys the site on every push to `main`.

1. In the repo on GitHub, open **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Push to `main` (or run the workflow by hand from the **Actions** tab). The site URL appears in the workflow run and on the Pages settings screen.

## Notes on running outside Claude

The game was first built as a Claude artifact, which provides two things this repo can't:

- **Saved records.** In Claude, the scoreboard and badges use the artifact's built-in storage. Here, `src/storage.js` swaps in the browser's `localStorage`, so records persist, but only in that browser on that device.
- **AI-written intro and epilogue.** In Claude, each battle opens and closes with a short AI-written scene. Outside Claude those requests have no API access, so the game uses its built-in fallback lines instead. All the move-by-move narration is local and works everywhere. Adding the AI scenes back would need a small server that holds an Anthropic API key; never put an API key in browser code.

## Project layout

```
src/App.jsx      the whole game: data, battle engine, computer AI, narration, screens
src/storage.js   localStorage stand-in for the artifact storage API
src/main.jsx     mounts the app
```

## Disclaimer

A non-commercial fan project. Pokémon and all related names are trademarks of Nintendo, Creatures Inc. and Game Freak. This project is not affiliated with or endorsed by them.
