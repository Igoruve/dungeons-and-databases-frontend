import {
  getClassByCharacterId,
  getItemsByCharacterId,
  getMoneyByCharacterId,
  getSkillByCharacterId,
  getSpeciesByCharacterId,
  getStatsByCharacterId,
} from "../../utils/characterDetails";

import { useEffect, useState } from "react";
import StatsCard from "../stats/Stats";
import SkillsCard from "../Skills/skills";
import MoneyCard from "../Money/Money";
import ItemsCard from "../Items/Items";

function CharacterCardExtended({ character, onRemove, onSelect }) {
  const [stats, setStats] = useState(null);
  const [skills, setSkills] = useState([]);
  const [money, setMoney] = useState(null);
  const [classInfo, setClassInfo] = useState([]);
  const [species, setSpecies] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchCharacterDetails() {
      try {
        const [stats, skills, money, classInfo, species, items] =
          await Promise.all([
            getStatsByCharacterId(character.character_id),
            getSkillByCharacterId(character.character_id),
            getMoneyByCharacterId(character.character_id),
            getClassByCharacterId(character.character_id),
            getSpeciesByCharacterId(character.character_id),
            getItemsByCharacterId(character.character_id),
          ]);
        setStats(stats);
        setSkills(skills);
        setMoney(money);
        setClassInfo(classInfo);
        setSpecies(species);
        setItems(items);
      } catch (error) {
        console.error("Error loading character details:", error);
      }
    }

    fetchCharacterDetails();
  }, [character.character_id]);

  return (
    <article className="article-card-extended">
      <section className="section-card-extended">
        <button className="back-button" onClick={() => onSelect()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="currentColor"
          >
            <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
          </svg>
          Back
        </button>
        <h1>
          {character.first_name} {character.last_name}
        </h1>
        <p>Level: {character.level}</p>
        <p>
          Initiative: {stats && stats[0] ? stats[0].Dexterity : "Loading..."}
        </p>
        <p>Species: {species[0]?.name || "Loading..."}</p>
        <p>Class: {classInfo[0]?.name || "Loading..."}</p>
        <p>Proficiency bonus: + {Math.ceil(character.level / 4 + 1)}</p>
        <p>Speed: {species[0]?.speed || "Loading..."}</p>
      </section>

      {stats ? <StatsCard stats={stats[0]} /> : <p>Loading...</p>}

      {skills && skills.length > 0 && <SkillsCard skill={skills[0]} />}

      {money ? <MoneyCard money={money} /> : <p>Loading..</p>}

      <h3>Items</h3>
      {items && items.length > 0 ? (
        items.map((item) => (
          <ItemsCard key={item.item_id} item={item} character={character} />
        ))
      ) : (
        <p>No items found.</p>
      )}

      <button onClick={() => onSelect()}>Back</button>
      <button className="border border-red-500 rounded-md flex flex-row justify-center px-4 py-2 mb-4 mt-2">
        Edit Character
      </button>
      <button
        className="border border-red-500 rounded-md flex flex-row justify-center px-4 py-2 mb-4"
        onClick={() => onRemove(character.character_id)}
      >
        Delete
      </button>
    </article>
  );
}

export default CharacterCardExtended;
