# The Draft

A pass-and-play Pokémon drafting game with manga-style battle narration, built as a single React component.

Every game deals a fresh pool of 15 from a roster of 106 Pokémon covering all nine generations, with no legendaries or mythicals. Trainers snake-draft three each, then battle. On each exchange the attacker picks a move and the defender chooses to **counter** (both hit) or **dodge** (speed decides the odds; a clean dodge punishes). Pokémon can evolve when they're low on HP, and can discover a **New Move** mid-fight that replaces whatever was chosen. Every beat is narrated in short manga-style prose.

Movesets are spread across about 275 moves, so names rarely repeat: Pikachu fights with Electroweb, Krabby with Crabhammer, and each starter line has its own finisher. Moves of the same type sit at matching power, so variety doesn't change the balance.

On the draft screen each trainer has a color, and a row of pips shows the snake pick order. Each team has slots that fill in as you draft, with a strip underneath showing its type mix. The pool is always sorted by attack, highest first. Each card is tinted by its type and shows its four stats as big numbers over thin bars, and Pokémon that evolve twice are marked **EVO ×2**. Tap a card for its scouting report: stats, its moves by role (attack, counter, dodge and the New Move it can discover), its evolution line, and which of the other side's picks it hits hard or should watch out for.

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
- Gym and League battles never change your scoreboard record or grade. Every badge and League opponent has its own original badge design, and the badges you've earned appear as mini badges next to your name on the scoreboard.

**The Pokémon League.** After the gyms comes the Indigo Plateau, and each step stays hidden until you've earned it:

- **Elite Four**: Lorelei (Ice), Bruno (Fighting), Agatha (Ghost) and Lance (Dragon), faced in order. They appear only once a named trainer holds all 8 badges.
- **Champion Gary**: appears only after all four of the Elite Four are beaten. Win and you're the Champion.
- **Professor Oak**: a special final battle in his lab in Pallet Town, which appears only after you beat Gary. His ace is Mew, and he lets you bring up to three of your earned aces instead of one. Beat him to enter the Hall of Fame.
- League drafts are dealt fully evolved (Charmander comes as Charizard, Dreepy as Dragapult; a line that splits shows one of its final forms), and never include a species already on that opponent's team. The League's own Pokémon are scaled to match, and the Elite Four ramp gently in difficulty, with Gary and Professor Oak the hardest.
- Every League opponent fields a full six (two drafted, plus four of their own with their ace last). League wins are saved as progress and show on the scoreboard as **★ CHAMPION** or **★ HALL OF FAME**. Guests never see the League.

**Battle presentation.** Every gym and League battle opens with a manga-style versus splash: the opponent's badge, title and taunt facing your team. Each arena has its own animated backdrop in the opponent's color (stone cracks for Brock, waves for Misty, embers for Blaine, falling snow for Lorelei, and so on). Opponents speak up when their ace takes the field, which also gets an entrance banner, when they're down to their last Pokémon, and when the battle ends. In every battle, two-player included, a row of pips under each Pokémon shows who's still standing, and an evolution stops the action for a short scene: the old name glows in its type color, flickers into the new form under a burst of light, and the new types and stat boost are revealed (tap to skip). Animations switch off on phones set to reduce motion.

**Battle music.** Every battle has original chiptune music, synthesized in the browser with no audio files: a rival theme for two-player battles, a theme for each gym styled after its type (a stomping rock riff for Brock, flowing arpeggios for Misty, an electric march for Lt. Surge, an eerie theme for Sabrina, a waltz for Erika, a ninja theme for Koga, fiery runs for Blaine and a menacing boss theme for Giovanni), and a League theme for the Elite Four, Gary and Professor Oak. Each result gets its own victory, defeat or draw jingle. Turn it on or off on the team screen or with the ♫ button during a battle; the choice is remembered on that device. Music gets quieter while narration reads aloud. On iPhone, the silent switch mutes it.

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
public/          app icon (home screen, browser tab) and web manifest
```

## Disclaimer

A non-commercial fan project. Pokémon and all related names are trademarks of Nintendo, Creatures Inc. and Game Freak. This project is not affiliated with or endorsed by them.
