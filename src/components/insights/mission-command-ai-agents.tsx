import {
  BriefAndInboxVisual,
  DecisionLineVisual,
  DelegationStageLadder,
  MissionCommandHub,
  MissionCommandProvider,
} from "./mission-command-visuals";

export function MissionCommandArticle() {
  return (
    <MissionCommandProvider>
      <div className="grid gap-5 text-muted-foreground">
        <p>
          So most of the frustration people have with AI agents comes down to delegation. The goal here is simple:
          introduce the core ideas from the U.S. Army&apos;s mission command doctrine and show how they help you get
          more efficient work out of AI.
        </p>

        <blockquote className="rounded-r-xl border-l-4 border-brand bg-tint px-5 py-4 text-ink">
          <p className="mb-1.5 font-display text-[11px] font-extrabold uppercase tracking-[0.08em] text-primary">
            From command to AI
          </p>
          <p className="text-[16.5px] leading-relaxed">
            When I was a company commander, delegating tasks was essential to empowering my leaders. But certain tasks
            had to stay with me - the stakes were too high to delegate. Being a good commander was knowing the line:
            what I could hand off, and what had to come back to me. The same holds true for AI agents. To get the real
            benefit, you have to give the agent the ability to execute decisions on its own, right up until the moment
            one needs you.
          </p>
        </blockquote>

        <p>
          Most AI hype makes it sound like you flip a switch and software runs your operation. That is not how it works.
          Hand an agent vague directions, and you get vague work back. In the Army, we solved that with mission command
          - giving someone a clear objective and letting them run inside set boundaries. Seven principles hold that
          system together:
        </p>

        <MissionCommandHub />

        <p>
          You do not need a field manual to put these to work. In practice, they come down to three habits that let an
          agent handle high-impact work your team does not have hours to do by hand.
        </p>

        <h2 className="mt-5 font-display text-2xl font-bold text-ink">
          1. Brief with purpose, key tasks, and end state
        </h2>

        <p>
          Many prompts fail because they read like a stressed-out micromanager hovering behind a chair. (I have
          definitely written a few of those late at night and wondered why the output came back stiff.) Over-script each
          tiny step, and the workflow breaks the moment a real input looks slightly different from your example.
        </p>

        <p>
          In Army use, we make <strong className="font-semibold text-ink">commander&apos;s intent</strong> practical
          with three parts: <strong className="font-semibold text-ink">purpose, key tasks, and end state</strong>.
          Pair that brief with <strong className="font-semibold text-ink">shared understanding</strong> - your
          templates, your edge cases, those sorts of things - and you have a{" "}
          <strong className="font-semibold text-ink">mission order</strong> an agent can actually run with. And your end
          state does not have to be a static document sitting in a folder - it can be a working inbox tool where your
          team drills into each account, edits a pre-drafted message, and clicks Send:
        </p>

        <BriefAndInboxVisual />

        <p>I also think it is super helpful to have the agent play the plan back before it starts:</p>

        <blockquote className="rounded-r-xl border border-border border-l-4 border-l-primary bg-muted px-5 py-3.5 text-[15.5px] leading-relaxed text-ink">
          &quot;Hey, before you populate the inbox for these stalled quotes, help me understand how you are deciding
          which deals are worth chasing and what would make you flag one for me.&quot;
        </blockquote>

        <p>That quick check catches bad assumptions before they turn into cleanup.</p>

        <h2 className="mt-5 font-display text-2xl font-bold text-ink">2. Draw the decision line</h2>

        <p>
          This is where real efficiency shows up. An agent that pauses to ask permission on each detail saves you hardly
          any time. An agent with no limits creates messes you have to unwind.
        </p>

        <p>
          <strong className="font-semibold text-ink">Disciplined initiative</strong> and{" "}
          <strong className="font-semibold text-ink">risk acceptance</strong> sit right in the middle - and in an inbox
          workflow, the Send button literally is the line. You accept prudent risk on the prep: the agent runs across
          disconnected systems, segments accounts or stalled deals, pulls the context, and pre-drafts the outreach on
          its own. Totally fine. What it does not do is click Send, offer a credit, or change pricing without a person
          in the loop.
        </p>

        <DecisionLineVisual />

        <p>
          Throw it out there with clear limits, and your team walks into a prioritized inbox ready for action instead of
          digging through four tools by hand.
        </p>

        <h2 className="mt-5 font-display text-2xl font-bold text-ink">3. Widen the leash in stages</h2>

        <p>
          You may be thinking, why am I talking about trusting software? Fair question. Here,{" "}
          <strong className="font-semibold text-ink">mutual trust</strong> just means verified reliability, and I would
          recommend building it in stages instead of handing over a messy, multi-step workflow on day one.
        </p>

        <p>
          Start by proving <strong className="font-semibold text-ink">competence</strong> on one repeatable job. Let the
          agent read data and draft outputs while you review each one. Spot where it gets sloppy and fix those gaps.
          Once it handles the routine calls cleanly over a stretch of runs, move the decision line forward so triage,
          segmentation, and pre-drafted outreach run without you.
        </p>

        <DelegationStageLadder />

        <p>
          That progression is pretty painless, and each stage buys back more of your week with risk you control at each
          step.
        </p>

        <div className="mt-4 rounded-2xl bg-ink p-6 text-white sm:p-7">
          <p className="mb-2 font-display text-xs font-extrabold uppercase tracking-[0.08em] text-[#93c5fd]">
            Where to start
          </p>
          <p className="mb-3.5 text-[15.5px] leading-relaxed text-[#dbeafe]">
            Better AI efficiency comes from clearer delegation. Share the context in your head, brief with purpose, key
            tasks, and a real end state your team can act out of, and draw a sharp line between what runs on its own and
            what comes back to you.
          </p>
          <p className="font-display text-lg font-bold leading-snug text-white sm:text-xl">
            Looking at the work on your plate this week, what is one high-value workflow you could let an agent prep
            right up to the Send button?
          </p>
        </div>
      </div>
    </MissionCommandProvider>
  );
}
