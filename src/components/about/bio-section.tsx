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
              Founder &amp; AI Integrator
            </p>
            <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I&apos;m an AI integrator and data consultant based in Durham,
                Connecticut, helping small businesses and law firms put AI and
                data to work. With over a decade of experience in tech consulting,
                I&apos;ve seen what works and what doesn&apos;t when it comes to
                building systems that actually support business growth.
              </p>
              <p>
                Before consulting, I served in the U.S. Army and earned a
                master&apos;s degree in operations research, a discipline
                focused on using data and analysis to make better decisions.
                That background shapes everything I do: I don&apos;t chase shiny
                objects or over-engineer solutions. I find the simplest path to
                real results.
              </p>
              <p>
                When we work together, I become a part of your team. I handle
                AI integration, data strategy, system architecture, and
                hands-on implementation. Whether you need AI embedded in your
                workflows, your data connected into one view, or a custom
                tool built, I&apos;m the person you call.
              </p>
              <p>
                My working style is direct, strategic, and jargon-free. I speak
                business first, technology second. And I only recommend what
                I&apos;d build for myself.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
