type Project = {
  name: string,
  title: string,
  imageUrls: string[],
  shortDescription: string,
  longDescription: string,
  link: string
}

const projects: Project[] = [{
  name: "calorie-tracker",
  title: "Calorie Tracker",
  imageUrls: ["/calorie-tracker.png"],
  shortDescription: "To keep track of your diet",
  longDescription: "",
  link: "calorie-tracker.p3nc1l.com"
}]

export default projects