import RevealText from "./RevealText";

const ContentSection = () => {
  return (
    <div id="content" className="bg-[#121212] relative z-50 pt-32" style={{ minHeight: '100vh' }}>
      <div className="max-w-[1200px] mx-auto">
        <section className="first-section p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="col-span-2">
              <RevealText as="span" stagger={0.1}>
                <h3 className="text-3xl md:text-4xl font-bold">My name is Tyler Bulszewicz</h3>
              </RevealText>
              <RevealText as="span" stagger={0.1}>
                <h3 className="text-1xl md:text-2xl font-regular italic">I am currently being creative at OneHope</h3>
              </RevealText>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 mt-32">
            <div className="col-span-2">
              <p className="text-[#FFF4EB] text-xl leading-[200%] mb-6">
                <RevealText as="span" stagger={0.1}>  
                  With a degree in Software Engineering and a year of specialized experience in UX/UI Design at OneHope, I&apos;ve found my passion at the intersection of technology and human experience. I&apos;m fascinated by how thoughtful design shapes the way we interact with digital spaces. My approach combines technical precision with creative problem-solving, always striving to create interfaces that are both beautiful and purposeful. Through my work, I aim to bridge the gap between complex systems and intuitive user experiences, guided by my faith and commitment to excellence.
                </RevealText>
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ContentSection;
