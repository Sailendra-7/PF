import { getProfile, getProjects, getSkillGroups } from "@/lib/content";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Toolbox from "@/components/Toolbox";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  const profile = getProfile();

  return (
    <>
      <Nav name={profile.name} />
      <main>
        <Hero profile={profile} />
        <Projects projects={getProjects()} />
        <About profile={profile} />
        <Toolbox groups={getSkillGroups()} />
        <Contact profile={profile} />
      </main>
      <Footer name={profile.name} role={profile.role} email={profile.email} />
    </>
  );
}
