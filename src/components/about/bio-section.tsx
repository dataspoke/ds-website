export function BioSection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
          About DataSpoke
        </h1>
        <p className="text-lg text-muted-foreground mb-16 max-w-2xl">
          DataSpoke helps small businesses integrate AI, connect their data,
          and build technology that drives real results.
        </p>

        {/* Nick */}
        <div className="flex flex-col md:flex-row gap-12 items-start">
          <div className="flex-shrink-0 mx-auto md:mx-0">
            <div className="h-64 w-64 rounded-2xl bg-secondary flex items-center justify-center border-2 border-primary/20">
              <span className="text-6xl font-bold text-primary">N</span>
            </div>
          </div>

          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Nick
            </h2>
            <p className="text-primary font-medium mt-1">
              Founder
            </p>
            <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I started DataSpoke to give small businesses access to the same
                AI, data, and engineering capabilities that large companies take
                for granted. I&apos;ve spent 10+ years building data pipelines,
                deploying AI tools, and designing cloud systems for businesses
                that need things to actually work.
              </p>
              <p>
                Before that, I served in the U.S. Army and earned a master&apos;s
                in operations research. That training is about one thing: using
                data to make better decisions. It&apos;s the lens I bring to
                every project.
              </p>
              <p>
                I work directly with my clients. No layers, no hand-offs. If you
                need AI in your workflows, your data connected, or a custom
                platform built, I&apos;m the one building it.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
