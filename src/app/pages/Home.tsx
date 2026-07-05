import AboutSection from "@/components/section/About";
import ContactSection from "@/components/section/Contact";
import HeroSection from "@/components/section/Hero";
import ProjectsSection from "@/components/section/Project";
import SkillsSection from "@/components/section/Skills";

const Home = () => {
    return (
        <div className="scroll-smooth pt-16">
            <HeroSection></HeroSection>
            <AboutSection></AboutSection>
            <SkillsSection></SkillsSection>
            <ProjectsSection></ProjectsSection>
            <ContactSection></ContactSection>
        </div>
    );
};

export default Home;