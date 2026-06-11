import { SectionHeading } from "@maingame/components";

export default function MyStreamsPage() {
  return (
    <div className="px-6 py-12">
      <SectionHeading text1="My" text2="Streams" />
      <p className="mt-3 text-sm text-[var(--color-muted-foreground)]">
        Manage your streamer profile, update channel information, platform links,
        and bio.
      </p>
    </div>
  );
}
