const ContentSection = () => {
  return (
    <div id="content" className="bg-[#121212] relative z-10 pt-32">
      <div className="px-8 max-w-[1200px] mx-auto">
        <section className="first-section py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="col-span-2">
              <h1 className="text-4xl md:text-5xl leading-[120%] mb-8 text-white font-serif">
                My name is Tyler Bulszewicz<br></br>I specialize in UX/UI Development.<br></br>I currently am being creative at <span className="hover:text-[#FFF4EB]">OneHope</span>.
              </h1>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div className="col-span-2">
              <p className="text-[#ede0d5] text-lg leading-[150%] mb-6">
                And besides all this, there was a certain lofty bearing about the Pagan, which even his uncouthness could not altogether maim. He looked like a man who had never cringed and never had had a creditor. Whether it was, too, that his head being shaved, his forehead was drawn out in freer and brighter relief, and looked more expansive than it otherwise would, this I will not venture to decide; but certain it was his head was phrenologically an excellent one.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ContentSection;
