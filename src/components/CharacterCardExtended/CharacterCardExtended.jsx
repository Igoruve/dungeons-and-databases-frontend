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

        const normalizedStats = {
          strength: stats.STR,
          dexterity: stats.DEX,
          constitution: stats.CON,
          intelligence: stats.INT,
          wisdom: stats.WIS,
          charisma: stats.CHA,
        };

        setStats(normalizedStats);
        setSkills(skills);
        console.log("Skills:", skills);
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

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleDeleteCharacter = () => {
    setShowConfirmModal(true);
  };

  const handleDeleteConfirm = async () => {
    const error = await onRemove(character.character_id);
    if (!error) {
      onSelect(null);
    }
    setShowConfirmModal(false);
  };

  const handleCancel = () => {
    setShowConfirmModal(false);
  };

  return (
    <section className="article-card-extended pb-28">
      {/* <button
        className="flex flex-row justify-center px-2 py-2 text-zinc-900 dark:text-zinc-100 shadow-md w-fit fixed right-8 top-8 rounded-full"
        onClick={handleDeleteCharacter}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#ef4444"
        >
          <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
        </svg>
      </button> */}
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
      </button>
      <div className="div-card-extended pr-6 mt-20">
        <h1 className="text-zinc-900 dark:text-zinc-100 text-2xl pb-2">
          {character.first_name} {character.last_name}
        </h1>
        <div className="flex flex-row gap-2">
          <p className="par-card-extended">
            {species[0]?.name || "Loading..."}
          </p>
          <p className="par-card-extended">
            {classInfo[0]?.name || "Loading..."}
          </p>
          <p className="par-card-extended">Level {character.level}</p>
        </div>
      </div>
      <article className="grid grid-cols-3 gap-4 mt-2 px-6 mb-8">
        <div className="flex justify-center items-center">
          <div className="relative w-24 h-24">
            <svg
              viewBox="0 0 24 24"
              className="absolute top-0 left-0 w-full h-full scale-x-110 fill-zinc-200 dark:fill-zinc-700"
              stroke="#ef4444"
              strokeWidth=".5"
            >
              <path d="M12 2l7 4v6c0 5.25-3.5 10-7 10s-7-4.75-7-10V6l7-4z" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-sm text-zinc-900 dark:text-zinc-100 leading-tight">
              <span>AC</span>
              <span className="text-xl">10</span>
            </div>
          </div>
        </div>

        <div className="grid-2 ">
          <div className="w-20 h-20 border border-zinc-500 rounded-md mx-auto bg-zinc-200 dark:bg-zinc-700 shadow-md"></div>
        </div>
        <div className="flex justify-center items-center">
          <div className="relative w-24 h-24">
            <svg
              viewBox="0 0 512 512"
              className="absolute top-0 left-0 w-full h-full fill-zinc-200 dark:fill-zinc-700"
              stroke="#ef4444"
              strokeWidth="12"
            >
              <path d="M256 464l-16.6-15.1C118 337.5 48 272.7 48 182.5 48 120.1 96.1 72 158.5 72c39.4 0 77.3 24.2 97.5 61.4C276.2 96.2 314.1 72 353.5 72 415.9 72 464 120.1 464 182.5c0 90.2-70 155-191.4 266.4L256 464z" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-sm text-zinc-900 dark:text-zinc-100 leading-tight">
              <span>HP</span>
              <span className="text-xl">
                {stats
                  ? (() => {
                      const hpInicial = classInfo[0]?.hit_die;
                      const hpPorNivelesAdicionales =
                        Math.ceil(classInfo[0]?.hit_die / 2) *
                        (character.level - 1);
                      const modificadorConstitucion =
                        ((stats.constitution - 10) / 2) * character.level;

                      const totalHP =
                        hpInicial +
                        hpPorNivelesAdicionales +
                        modificadorConstitucion;

                      return totalHP;
                    })()
                  : "Loading..."}
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="grid-scnd-square">
            <h3 className="grid-h3">Prof. Bonus</h3>
            <p className="grid-par">+ {Math.ceil(character.level / 4 + 1)}</p>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="grid-scnd-square">
            <h3 className="grid-h3">Speed</h3>
            <p className="grid-par">{species[0]?.speed || "Loading..."} ft.</p>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="grid-scnd-square">
            <h3 className="grid-h3">Initiative</h3>
            <p className="grid-par">
              + {stats ? (stats.dexterity - 10) / 2 : "Loading..."}
            </p>
          </div>
        </div>
      </article>

      {stats ? <StatsCard stats={stats} /> : <p>Loading...</p>}

      <section className="mx-auto max-w-md">
        <div className="grid grid-cols-3 gap-2 border-b border-red-500 py-2 px-4">
          <h3 className="skills-section-text text-center">MOD.</h3>
          <h3 className="skills-section-text text-center">SKILL</h3>
          <h3 className="skills-section-text text-center">BONUS</h3>
        </div>
        {skills && skills.length > 0 ? (
          skills.map((skill) => (
            <SkillsCard key={skill.skill_id} skill={skill} stats={stats} />
          ))
        ) : (
          <p className="px-4 py-2">No skills found.</p>
        )}
      </section>

      <section className="mt-4">
        <div className="grid grid-cols-2 gap-2 max-w-md mx-auto py-2 px-4 border-b border-red-500">
          <h3 className="skills-section-text text-center">ITEM</h3>
          <h3 className="skills-section-text text-center">QTY.</h3>
        </div>
        {items && items.length > 0 ? (
          items.map((item) => (
            <ItemsCard key={item.item_id} item={item} character={character} />
          ))
        ) : (
          <p>No items found.</p>
        )}
        <section className="items-center justify-center mt-2 mx-auto max-w-md">
          <h3 className="skills-section-text px-10">MONEY</h3>
          {money ? <MoneyCard money={money} /> : <p>Loading..</p>}
        </section>
      </section>
      {showConfirmModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-10 px-4">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold text-zinc-800">
              Confirmation
            </h3>
            <p className="mt-2 text-zinc-600">Are you sure?</p>
            <div className="mt-4 flex justify-end gap-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-2xl"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className="delete-confirm-button"
                onClick={handleDeleteConfirm}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default CharacterCardExtended;
