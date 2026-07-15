import { useContext, useState } from "react";
import { NameContext } from "./home";

export default function Pokedex() {
  const {name: username} = useContext(NameContext);

  const [name, setName] = useState("");
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function search(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setPokemon(null);

    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
      if (!response.ok) {
        throw new Error("Pokemon not found");
      }
      const data = await response.json();
      setPokemon(data);
    } catch (error) {
      setError(error.message);
    }

    setLoading(false);
  }

  return (
    <main>
      <h1>🔴 Gotta catch em all, {username == "" ? "???" : username}!</h1>

      <form onSubmit={search}>
        <input
          value={name}
          placeholder="Pokemon name"
          onChange={e => setName(e.target.value)}
        />
      </form>

      {loading && (
        <p>Loading...</p>
      )}

      {error && (
        <p>{error}</p>
      )}

      {pokemon && (
        <section>
          <h2> {pokemon.name} </h2>

          <img src={pokemon.sprites.front_default}/>

          <h2> Height {pokemon.height} |  Weight {pokemon.weight} </h2>

          <h2> Types </h2>
          <ul>
            {pokemon.types.map(type => (
              <li key={type.type.name}>
                {type.type.name}
              </li>
            ))}
          </ul>

          <h2> Abilities </h2>
          <ul>
            {pokemon.abilities.map(ability => (
              <li key={ability.ability.name}>
                {ability.ability.name}
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}