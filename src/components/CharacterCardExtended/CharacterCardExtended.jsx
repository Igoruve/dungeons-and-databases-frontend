import {
  getClassByCharacterId,
  getItemsByCharacterId,
  getMoneyByCharacterId,
  getSkillByCharacterId,
  getSpeciesByCharacterId,
  getStatsByCharacterId,
} from "../../utils/characterDetails";

import "./CharacterCardExtended.css";
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
    <article className="article character">
      <section className="character-data">
        <h1>
          {character.first_name} {character.last_name}
        </h1>
        <p className="character-level">Level: {character.level}</p>
        <p className="character-initiative">
          Initiative: {stats && stats[0] ? stats[0].Dexterity : "Loading..."}
        </p>
        <p className="character-species">
          Species: {species[0]?.name || "Loading..."}
        </p>
        <p className="character-class">
          Class: {classInfo[0]?.name || "Loading..."}
        </p>
        <p>Proficiency bonus: + {Math.ceil(character.level / 4 + 1)}</p>
        <p>Speed: {species[0]?.speed || "Loading..."}</p>
      </section>

      {stats ? <StatsCard stats={stats[0]} /> : <p>Loading...</p>}

      {skills && skills.length > 0 && <SkillsCard skill={skills[0]} />}

      {money ? <MoneyCard money={money} /> : <p>Loading..</p>}

      <h3>Items</h3>
      {items && items.length > 0 ? (
        items.map((item) => <ItemsCard key={item.item_id} item={item} />)
      ) : (
        <p>No items found.</p>
      )}

      <button onClick={() => onSelect()}>Back</button>
      <button>Edit Character</button>
      <button onClick={() => onRemove(character.character_id)}>Delete</button>
    </article>
  );
}

export default CharacterCardExtended;
