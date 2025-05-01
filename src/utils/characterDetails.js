import FetchData from "./Fetch.js";

async function getStatsByCharacterId(id) {
  const response = await FetchData(`/character/${id}/stats`);
  return response;
}

async function getSkillByCharacterId(id) {
  const response = await FetchData(`/character/${id}/skill`);
  return response;
}

async function getClassByCharacterId(id) {
  const response = await FetchData(`/character/${id}/class`);
  return response;
}

async function getMoneyByCharacterId(id) {
  const response = await FetchData(`/character/${id}/money`);
  return response;
}

async function getSpeciesByCharacterId(id) {
  const response = await FetchData(`/character/${id}/species`);
  return response;
}

async function getItemsByCharacterId(id) {
  const response = await FetchData(`/character/${id}/item`);
  return response;
}

export {
  getStatsByCharacterId,
  getClassByCharacterId,
  getItemsByCharacterId,
  getMoneyByCharacterId,
  getSkillByCharacterId,
  getSpeciesByCharacterId
};
