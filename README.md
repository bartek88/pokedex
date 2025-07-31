# 🧢 Pokédex CLI App

It's a Boot.dev project.

A simple interactive Pokédex application written in **JavaScript (Node.js)**.  
Explore the Pokémon world, catch your favorites, and build your own Pokédex — all from the terminal!

---

## 🚀 Getting Started

This project uses **pnpm** by default, but you're free to use `npm`, `yarn`, or any other Node-compatible package manager.

### 📦 Install dependencies

```bash
pnpm install
# or
npm install
# or
yarn install
```

### 📦 Install dependencies

```bash
pnpm start
# or
npm run start
# or
yarn start
```

## 🕹 Available Commands

`catch [pokemon_name]`:

```bash
catch pikachu
```

Attempts to catch a Pokémon by name (e.g. catch pikachu).
If successful, the Pokémon is added to your Pokédex.

`explore [location_area]`:

```bash
explore canalave-city-area
```

Explores a location area and lists the Pokémon that can be found there.

`inspect [pokemon_name]`:

```bash
inspect pikachu
```

It takes the name of a Pokemon and prints the name, height, weight, stats and type(s) of the Pokemon.

`map`:

```bash
map
```

Lists 20 Pokémon location areas from the Pokémon world.
Each subsequent call displays the next 20.

`mapb`:

```bash
mapb
```

Lists 20 Pokémon location areas from the Pokémon world.
Each subsequent call displays the previous 20.

`pokedex`:

```bash
pokedex
```

Prints a list of all Pokémon you’ve caught.

`help`:

```bash
help
```

Displays the help screen with available commands.

`exit`:

```bash
exit
```

Closes the application.

## 📎 Notes

- Make sure you have an active internet connection — the app fetches data from the [PokéAPI](https://pokeapi.co/).
- Names passed to commands should match the API format (e.g. canalave-city-area, not Canalave City).
