import { fetchProjects } from "../_actions/action";
import Presentational from "./presentational";

export default async function ProjectListContainer() {
  const { projects, error } = await fetchProjects();

  if (error) {
    console.error("Error fetching projects:", error);
    return <div>エラーが発生しました</div>;
  }

  return <Presentational projects={projects} />;
}
