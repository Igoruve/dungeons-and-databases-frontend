import FetchData from "./Fetch";

export async function getAllClasses() {
  const response = await FetchData("/class");
  return response;
}

export async function getAllClassFeaturesByClassId(class_id) {
  const response = await FetchData(`/class/${class_id}/class_feature`);
  return response;
}

export async function getAllSpecies() {
  const response = await FetchData("/species");
  return response;
}

export async function getAllSpeciesFeaturesBySpeciesId(species_id) {
  const response = await FetchData(`/species/${species_id}/species_feature`);
  return response;
}

export async function getAllItems() {
  const response = await FetchData("/item");
  return response;
}

export async function getAllSkills() {
  const response = await FetchData("/skill");
  return response;
}

