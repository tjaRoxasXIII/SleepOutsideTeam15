import fetchData from "./fetchData.mjs";
import renderTents from "./home/renderTentsList.mjs";

const tentsUrl = "../../src/json/tents.json"
const tents = await fetchData(tentsUrl)
renderTents(tents)