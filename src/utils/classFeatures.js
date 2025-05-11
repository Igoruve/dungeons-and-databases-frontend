import FetchData from "./Fetch";

async function getClassFeaturesByClassId(classId) {
  console.log("Selected Class ID in ClassFeatures:", classId);
  const response = await FetchData(`/class/${classId}/class_feature`);
  return response;
}

export { getClassFeaturesByClassId };