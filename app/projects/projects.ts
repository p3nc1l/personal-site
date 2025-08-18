type Project = {
  name: string,
  title: string,
  imageUrls: string[],
  shortDescription: string,
  longDescription: string,
  link: string,
  tags: string[]
}

const projects: Project[] = [{
  name: "calorie-tracker",
  title: "Calorie Tracker",
  imageUrls: ["/calorie-tracker/home-page.png", "/calorie-tracker/foods-page-query.png", "/calorie-tracker/meal-editor.png", "/calorie-tracker/meals-page.png", "/calorie-tracker/profile-page.png"],
  shortDescription: "To keep track of your diet",
  longDescription: "This is a simple calorie tracker app. It's abilities include looking up foods from FatSecret's food API, logging multiple foods as a meal, browsing through the logged meals, setting a daily goal, etc.",
  link: "https://calorie-tracker.p3nc1l.com",
  tags: ["React", "Vite", "Express"]
}]

export default projects