import "./CharacterCard.css";

function CharacterCard({ character , onRemove}) {
  return (
    <article className="article character">
      <section className="character-data">
        <h2>
          {character.first_name} {character.last_name}
        </h2>
        <p className="character-level">Level: {character.level}</p>
        <p className="character-species">
          Species: {character.species[0].name}
        </p>
        <p className="character-class">Class: {character.class[0].name}</p>
      </section>
      <button onClick={()=>onRemove(character.character_id)}>Eliminar</button>
    </article>
  );
}

export default CharacterCard;
