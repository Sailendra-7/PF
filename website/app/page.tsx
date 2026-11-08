import { getProfile, getProjects, getSkillGroups } from "@/lib/content";
import LogPoseNav from "@/components/LogPoseNav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  const profile = getProfile();
  const projects = getProjects();
  const skillGroups = getSkillGroups();

  return (
    <main className="relative overflow-x-clip">
      <LogPoseNav name={profile.name} />
      <Hero profile={profile} />
      <About profile={profile} />
      <Projects projects={projects} />
      <Skills groups={skillGroups} />
      <Contact profile={profile} />
      <Footer name={profile.name} />
    </main>
  );
}
