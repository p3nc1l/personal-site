import AnimatedText from "./ui/AnimatedText";

const Hero = () => {
  return (
    <div className="px-4 py-36 text-7xl font-black max-w-7xl mx-auto">
      <div><AnimatedText textColor="oklch(62.3% 0.214 259.815)" value={["Front-end", "Back-end", "Full-stack"]} /></div>
      <div>Web Developer</div>
    </div>
  )
}

export default function Home() {
  return (
    <Hero />
  );
}
