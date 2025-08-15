import AnimatedText from "./ui/AnimatedText";

const Hero = () => {
  return (
    <div className="px-4 py-36 max-w-7xl mx-auto">
      <div className="text-7xl font-black mb-4">
        <div><AnimatedText textColor="oklch(62.3% 0.214 259.815)" value={["Front-end", "Back-end", "Full-stack"]} /></div>
        <div>Web Developer</div>
      </div>
      <div className="text-xl">Websites built on modern frameworks, with eye-catching, mobile-friendly UI.</div>
    </div>
  )
}

export default function Home() {
  return (
    <Hero />
  );
}
