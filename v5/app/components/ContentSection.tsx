import Image from "next/image";
import RevealText from "./RevealText";
import AnimatedGreenGrid from "./AnimatedGreenGrid";

const tileCoverById: Record<number, string | null> = {
  1: "/project-covers/gd-project-espriddle.png",
  2: "/project-covers/gd-project-foreveropen.png",
  3: null,
  4: "/project-covers/gd-project-hineni.png",
  5: "/project-covers/gd-project-kidfit.png",
  6: "/project-covers/gd-project-lavalips.png",
  7: "/project-covers/gd-project-linesoforder.png",
  8: "/project-covers/gd-project-brochure.png",
  9: "/project-covers/gd-project-avivemoslumo.png",
};

const ProjectCoverTile = ({ id }: { id: number }) => {
  const cover = tileCoverById[id];

  if (!cover) {
    return (
      <div className="aspect-square w-full bg-[#1E1E1E] flex items-center justify-center text-[#8A8A8A] text-2xl font-semibold">
        {id}
      </div>
    );
  }

  return (
    <div className="relative aspect-square w-full overflow-hidden bg-[#1E1E1E]">
      <Image
        src={cover}
        alt={`Project ${id} cover`}
        fill
        className="object-cover"
        sizes="(max-width: 767px) 100vw, 33vw"
      />
    </div>
  );
};

const ContentSection = () => {
  return (
    <div id="content" className="bg-[#121212] relative z-50 pt-8 md:pt-32">
      <section className="first-section p-4 pb-8 md:pb-32">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="col-span-2">
              <RevealText as="span" stagger={0.1}>
                <h3 className="text-3xl md:text-4xl font-bold">My name is Tyler Bulszewicz</h3>
              </RevealText>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 mt-4 md:mt-8">
            <div className="col-span-2">
              <p className="text-[#FFF4EB] font-inter-tight text-xl leading-[200%] mb-6">
                <RevealText as="span" stagger={0.1}>  
                  With a degree in Software Engineering and a year of specialized experience in UX/UI Design at OneHope, I&apos;ve found my passion at the intersection of technology and human experience. I&apos;m fascinated by how thoughtful design shapes the way we interact with digital spaces. My approach combines technical precision with creative problem-solving, always striving to create interfaces that are both beautiful and purposeful. Through my work, I aim to bridge the gap between complex systems and intuitive user experiences, guided by my faith and commitment to excellence.
                </RevealText>
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full bg-[#1A1A1A] p-4 py-8 md:py-32">
        <div className="max-w-[1200px] mx-auto flex flex-col items-center">
          <div className="w-full md:hidden">
            <AnimatedGreenGrid columns={10} rows={4} gapPx={10} />
          </div>
          <div className="hidden w-full md:block">
            <AnimatedGreenGrid columns={28} rows={4} gapPx={10} />
          </div>
          <RevealText as="div" className="w-full text-right" stagger={0.1}>
            <h3 className="mt-12 text-right text-3xl md:text-4xl font-bold text-[#FFF4EB]">
              Currently at OneHope
            </h3>
          </RevealText>
          <p className="mt-4 md:mt-8 max-w-[800px] self-end text-right font-inter-tight text-xl leading-[200%] text-[#FFF4EB]">
            <RevealText as="span" stagger={0.1}>
              Over the past year at OneHope, I&apos;ve become fluent in Git through daily collaboration
              <br />
              and consistent contribution, with 100+ commits across active projects.
            </RevealText>
          </p>
        </div>
      </section>
      <section className="projects-section p-4 py-8 md:py-32 bg-[#121212]">
        <div className="max-w-[1200px] mx-auto">
          <RevealText as="div" className="w-full text-center" stagger={0.1}>
            <h3 className="text-center text-3xl md:text-4xl font-bold text-[#FFF4EB]">Some of the Favs</h3>
          </RevealText>
          <p className="mt-4 md:mt-8 max-w-[800px] mx-auto text-center font-inter-tight text-xl leading-[200%] text-[#FFF4EB]">
            <RevealText as="span" stagger={0.1}>
              This section highlights a few of my top favorites, chosen because they are projects I genuinely enjoyed building and still feel especially proud of.
            </RevealText>
          </p>
          <div className="mt-8 md:mt-32 space-y-4">
            <div className="grid w-full grid-cols-1 gap-4 md:[grid-template-columns:calc((100%_-_2rem)/3)_calc((2*(100%_-_2rem))/3_+_1rem)]">
              <div className="grid gap-4">
                <ProjectCoverTile id={1} />
                <ProjectCoverTile id={2} />
              </div>
              <ProjectCoverTile id={3} />
            </div>

            <div className="grid w-full grid-cols-1 gap-4 md:[grid-template-columns:calc((2*(100%_-_2rem))/3_+_1rem)_calc((100%_-_2rem)/3)]">
              <ProjectCoverTile id={4} />
              <div className="grid gap-4">
                <ProjectCoverTile id={5} />
                <ProjectCoverTile id={6} />
              </div>
            </div>

            <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <ProjectCoverTile id={7} />
              <ProjectCoverTile id={8} />
              <ProjectCoverTile id={9} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContentSection;
