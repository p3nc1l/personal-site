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
  longDescription: "Calorie Tracker is an app aiming to help you keep track of a healthy diet. The app is powered by a front-end and back-end service which's repositories are both publicly available on Github at <a href='https://github.com/p3nc1l/calorie-tracker'>p3nc1l/calorie-tracker</a> and <a href='https://github.com/p3nc1l/calorie-tracker-backend'>p3nc1l/calorie-tracker-backend</a>.<br><br>The features of the app include:<br><ul><li>Querying data from <a href='https://platform.fatsecret.com/'>FatSecret</a>'s food API</li><li>Logging multiple foods, whether queried or custom, as meals</li><li>Setting a daily goal</li><li>Customizing the app with nickname</li><li>Saving data to local storage</li><li>See food macros: fat, carbohydrates and protein</li></ul>",
  link: "https://calorie-tracker.p3nc1l.com",
  tags: ["React", "Vite", "Express"]
}]

export default projects