import { useContext, useRef, useState } from "react";
import { NameContext } from "./App";

export default function Pokedex() {
	const { name: username } = useContext(NameContext);
	const inputRef = useRef(null);
	const [pokemon, setPokemon] = useState(null);
	const [error, setError] = useState("");

	async function search(e) {
		e.preventDefault();

		setError("");
		setPokemon(null);

		try {
			const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${inputRef.current.value.toLowerCase()}`);
			if (!response.ok)
				throw new Error("Pokemon not found");

			const data = await response.json();
			console.log(data)

			setPokemon({
				name: data.name,
				image: data.sprites.front_default,
				height: data.height,
				weight: data.weight,
				types: data.types.map(type => type.type.name),
			});
		} catch (error) {
			setError(error.message);
		}
	}

	return (
		<main>
			<h1>
				🔴 Gotta catch 'em all, {username || "???"}!
			</h1>

			<form onSubmit={search}>
				<input
					ref={inputRef}
					placeholder="Pokemon name"
				/>
			</form>

			{error && <p>{error}</p>}

			{pokemon && (
				<section>
					<h2>{pokemon.name}</h2>

					<img src={pokemon.image} />

					<h3>
						Height {pokemon.height} | Weight {pokemon.weight}
					</h3>

					<h3>Types</h3>

					<ul>
						{pokemon.types.map(type => (
							<li key={type}>{type}</li>
						))}
					</ul>
				</section>
			)}
		</main>
	);
}