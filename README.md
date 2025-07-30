## This is a simmple repl app written in JS/Node.

This project originally uses pnpm as package manager but you can use npm, yarn or any other tool taht you like.

To start te project in the app directory run:

```
npm run dev

or

yarn dev

or

pnpm dev
```

Available commands:
`catch [pokemon_name]` (ex. catch pikachu):
Takes the name of a pokemon as an argument and tries to catch it. If succeed - adds it to the pokedex.

`explore [location_name]` (ex. explore canalave-city-area):
Takes the name of a location area as an argument and lists pokemons that can be found in that area.

`help`:
Displays help screen.

`inspect` (ex. inspect pikachu):
It takes the name of a Pokemon and prints the name, height, weight, stats and type(s) of the Pokemon.

`map`:
Displays the names of 20 location areas in the Pokemon world. Each subsequent call to map will display next 20 locations.

`mapb`:
Displays the names of 20 location areas in the Pokemon world. Each subsequent call to mapb will display previous 20 locations.

`pokedex`:
Prints a list of all the names of the Pokemon the user has caught.

`exit`:
Exits the Pokedex.
