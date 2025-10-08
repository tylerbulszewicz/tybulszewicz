import AnimatedContentSection from "./AnimatedContentSection";
import RevealText from "./RevealText";

const ContentSection = () => {
  return (
    <div id="content" className="bg-[#121212] relative z-50 pt-32" style={{ minHeight: '100vh' }}>
      <div className="max-w-[1200px] mx-auto">
        <section className="first-section p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="col-span-2">
              <RevealText as="span" delay={0.3}>
                My name is Tyler Bulszewicz
              </RevealText>
              <RevealText as="span" delay={0.6}>
                I am currently being creative at OneHope
              </RevealText>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 mt-32">
            <div className="col-span-2">
              <p className="text-[#ede0d5] text-xl leading-[200%] mb-6">
                <RevealText as="span" delay={0.6}>  
                  And besides all this, there was a certain lofty bearing about the Pagan, which even his uncouthness could not altogether maim. He looked like a man who had never cringed and never had had a creditor. Whether it was, too, that his head being shaved, his forehead was drawn out in freer and brighter relief, and looked more expansive than it otherwise would, this I will not venture to decide; but certain it was his head was phrenologically an excellent one.
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
