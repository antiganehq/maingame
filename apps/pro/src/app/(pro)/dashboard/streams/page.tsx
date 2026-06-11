"use client";

import { useState } from "react";
import {
  StreamerDetailHero,
  StreamerDetailProfile,
  SectionHeading,
  StarRatingDisplay,
  Button,
  Input,
  Textarea,
  Select,
  FormField,
  FormLabel,
} from "@maingame/components";
import { StreamPlatform } from "@maingame/types";
import { allStreamers } from "@maingame/db";
import type { StreamerDetailData } from "@maingame/db";

const PLATFORM_LABEL: Record<string, string> = {
  [StreamPlatform.Twitch]: "Twitch",
  [StreamPlatform.YouTube]: "YouTube",
  [StreamPlatform.Kick]: "Kick",
  [StreamPlatform.Other]: "Other",
};

function formatNum(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return String(n);
}

function formatRating(v: number): string {
  return v.toFixed(1);
}

export default function DashboardStreamsPage() {
  const [profile, setProfile] = useState<StreamerDetailData>(
    allStreamers[0],
  );
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const toggleEdit = (section: string) => {
    setEditingSection((prev) => (prev === section ? null : section));
    setSaved(false);
  };

  const handleSave = () => {
    setEditingSection(null);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <StreamerDetailHero bannerUrl={profile.bannerUrl} />

      <div className="mx-auto max-w-[1400px] w-full">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          <div className="flex-1 py-6 lg:py-8">
            <div className="flex items-center justify-between mb-3">
              <h2 className="sr-only">Profile</h2>
              <Button
                variant="secondary"
                onClick={() => toggleEdit("profile")}
              >
                {editingSection === "profile" ? "Cancel" : "Edit Profile"}
              </Button>
            </div>

            <StreamerDetailProfile
              displayName={profile.displayName}
              primaryPlatform={profile.primaryPlatform}
              channelUrl={profile.channelUrl}
              avatarUrl={profile.avatarUrl}
              stats={[
                { label: "Subscribers", value: formatNum(profile.subscriberCount ?? 0) },
                { label: "Likes", value: formatNum(profile.totalLikes ?? 0) },
                { label: "Campaigns", value: String(profile.campaignCount) },
              ]}
              action={null}
            />

            {editingSection === "profile" && (
              <div className="mt-4 grid gap-3 max-w-xl">
                <FormField>
                  <FormLabel>Display Name</FormLabel>
                  <Input
                    value={profile.displayName}
                    onChange={(e) =>
                      setProfile((p) => ({ ...p, displayName: e.target.value }))
                    }
                  />
                </FormField>
                <FormField>
                  <FormLabel>Slug</FormLabel>
                  <Input
                    value={profile.slug}
                    onChange={(e) =>
                      setProfile((p) => ({ ...p, slug: e.target.value }))
                    }
                  />
                </FormField>
                <FormField>
                  <FormLabel>Platform</FormLabel>
                  <Select
                    value={profile.primaryPlatform}
                    onChange={(e) =>
                      setProfile((p) => ({
                        ...p,
                        primaryPlatform: e.target.value as StreamPlatform,
                      }))
                    }
                  >
                    {Object.entries(PLATFORM_LABEL).map(([k, v]) => (
                      <option key={k} value={k}>{v}</option>
                    ))}
                  </Select>
                </FormField>
                <FormField>
                  <FormLabel>Channel URL</FormLabel>
                  <Input
                    value={profile.channelUrl}
                    onChange={(e) =>
                      setProfile((p) => ({ ...p, channelUrl: e.target.value }))
                    }
                  />
                </FormField>
                <FormField>
                  <FormLabel>Avatar URL</FormLabel>
                  <Input
                    value={profile.avatarUrl ?? ""}
                    onChange={(e) =>
                      setProfile((p) => ({ ...p, avatarUrl: e.target.value }))
                    }
                  />
                </FormField>
                <FormField>
                  <FormLabel>Banner URL</FormLabel>
                  <Input
                    value={profile.bannerUrl ?? ""}
                    onChange={(e) =>
                      setProfile((p) => ({ ...p, bannerUrl: e.target.value }))
                    }
                  />
                </FormField>
                <FormField>
                  <FormLabel>Subscribers</FormLabel>
                  <Input
                    type="number"
                    value={profile.subscriberCount ?? ""}
                    onChange={(e) =>
                      setProfile((p) => ({
                        ...p,
                        subscriberCount: e.target.value ? Number(e.target.value) : 0,
                      }))
                    }
                  />
                </FormField>
                <FormField>
                  <FormLabel>Total Likes</FormLabel>
                  <Input
                    type="number"
                    value={profile.totalLikes ?? ""}
                    onChange={(e) =>
                      setProfile((p) => ({
                        ...p,
                        totalLikes: e.target.value ? Number(e.target.value) : 0,
                      }))
                    }
                  />
                </FormField>
                <FormField>
                  <FormLabel>Campaigns</FormLabel>
                  <Input
                    type="number"
                    value={profile.campaignCount}
                    onChange={(e) =>
                      setProfile((p) => ({
                        ...p,
                        campaignCount: e.target.value ? Number(e.target.value) : 0,
                      }))
                    }
                  />
                </FormField>
                <div>
                  <Button onClick={handleSave}>Save Changes</Button>
                </div>
              </div>
            )}

            {/* Tabs */}
            <div className="py-6 space-y-6">
              <div className="flex border-b border-[var(--color-border-light)]">
                <button
                  className="px-5 py-3 text-sm font-medium border-b-2 border-[var(--color-brand)] text-[var(--color-foreground)]"
                >
                  Overview
                </button>
                <button
                  className="px-5 py-3 text-sm font-medium border-b-2 border-transparent text-[var(--color-muted-foreground)]"
                >
                  Videos
                </button>
              </div>

              {/* Overview — Recent Videos */}
              {profile.streamArchives.length > 0 && (
                <section>
                  <div className="flex items-center justify-between mb-3">
                    <SectionHeading text1="Recent" text2="Videos" />
                    <Button variant="secondary" onClick={() => toggleEdit("videos")}>
                      {editingSection === "videos" ? "Cancel" : "Manage Videos"}
                    </Button>
                  </div>
                  <div className="flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {profile.streamArchives.slice(0, 4).map((archive) => (
                      <div key={archive.id} className="w-[260px] shrink-0">
                        <div className="aspect-video relative overflow-hidden">
                          <img
                            src={archive.thumbnailUrl}
                            alt={archive.title}
                            className="absolute inset-0 h-full w-full object-cover"
                          />
                        </div>
                        <div className="pt-2">
                          <h4 className="text-sm font-medium text-[var(--color-foreground)] leading-snug line-clamp-2">
                            {archive.title}
                          </h4>
                          <p className="text-xs text-[var(--color-muted-foreground)] mt-0.5">
                            {archive.gameName} &middot;{" "}
                            {new Date(archive.playedAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {editingSection === "videos" && (
                <div className="grid gap-3 max-w-xl">
                  {profile.streamArchives.map((archive, idx) => (
                    <div key={archive.id} className="border border-[var(--color-border-light)] p-3 space-y-2">
                      <FormField>
                        <FormLabel>Title</FormLabel>
                        <Input
                          value={archive.title}
                          onChange={(e) => {
                            const updated = [...profile.streamArchives];
                            updated[idx] = { ...updated[idx], title: e.target.value };
                            setProfile((p) => ({ ...p, streamArchives: updated }));
                          }}
                        />
                      </FormField>
                      <FormField>
                        <FormLabel>Game Name</FormLabel>
                        <Input
                          value={archive.gameName}
                          onChange={(e) => {
                            const updated = [...profile.streamArchives];
                            updated[idx] = { ...updated[idx], gameName: e.target.value };
                            setProfile((p) => ({ ...p, streamArchives: updated }));
                          }}
                        />
                      </FormField>
                      <FormField>
                        <FormLabel>Thumbnail URL</FormLabel>
                        <Input
                          value={archive.thumbnailUrl}
                          onChange={(e) => {
                            const updated = [...profile.streamArchives];
                            updated[idx] = { ...updated[idx], thumbnailUrl: e.target.value };
                            setProfile((p) => ({ ...p, streamArchives: updated }));
                          }}
                        />
                      </FormField>
                      <FormField>
                        <FormLabel>Video URL</FormLabel>
                        <Input
                          value={archive.url}
                          onChange={(e) => {
                            const updated = [...profile.streamArchives];
                            updated[idx] = { ...updated[idx], url: e.target.value };
                            setProfile((p) => ({ ...p, streamArchives: updated }));
                          }}
                        />
                      </FormField>
                      <Button
                        variant="ghost"
                        className="text-[var(--color-error)]"
                        onClick={() => {
                          setProfile((p) => ({
                            ...p,
                            streamArchives: p.streamArchives.filter(
                              (_, i) => i !== idx,
                            ),
                          }));
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setProfile((p) => ({
                        ...p,
                        streamArchives: [
                          ...p.streamArchives,
                          {
                            id: `new-${Date.now()}`,
                            title: "",
                            thumbnailUrl: "",
                            gameName: "",
                            playedAt: new Date().toISOString().split("T")[0],
                            url: "",
                          },
                        ],
                      }));
                    }}
                  >
                    + Add Video
                  </Button>
                  <Button onClick={handleSave}>Save Changes</Button>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: Sidebar */}
          <aside className="w-full lg:w-80 shrink-0 py-6 lg:py-8 flex flex-col gap-6">
            {/* Channel Statistics */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <SectionHeading text1="Channel" text2="Statistics" />
                <Button variant="secondary" onClick={() => toggleEdit("stats")}>
                  {editingSection === "stats" ? "Cancel" : "Edit"}
                </Button>
              </div>

              {editingSection === "stats" ? (
                <div className="space-y-3">
                  <FormField>
                    <FormLabel>Gender</FormLabel>
                    <Input
                      value={profile.gender ?? ""}
                      onChange={(e) =>
                        setProfile((p) => ({ ...p, gender: e.target.value }))
                      }
                    />
                  </FormField>
                  <FormField>
                    <FormLabel>Language</FormLabel>
                    <Input
                      value={profile.language ?? ""}
                      onChange={(e) =>
                        setProfile((p) => ({ ...p, language: e.target.value }))
                      }
                    />
                  </FormField>
                  <FormField>
                    <FormLabel>Birth Date</FormLabel>
                    <Input
                      type="date"
                      value={profile.birthDate ?? ""}
                      onChange={(e) =>
                        setProfile((p) => ({ ...p, birthDate: e.target.value }))
                      }
                    />
                  </FormField>
                  <Button onClick={handleSave}>Save Changes</Button>
                </div>
              ) : (
                <dl className="space-y-3">
                  <div className="flex justify-between gap-4 border-b border-[var(--color-border-light)] pb-3">
                    <dt className="text-sm text-[var(--color-muted-foreground)]">Avg Rating</dt>
                    <dd className="flex items-center gap-1.5">
                      <StarRatingDisplay value={Math.round(profile.averageStreamerRating)} />
                      <span className="text-sm font-medium text-[var(--color-foreground)]">
                        {formatRating(profile.averageStreamerRating)}
                      </span>
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4 border-b border-[var(--color-border-light)] pb-3">
                    <dt className="text-sm text-[var(--color-muted-foreground)]">Total Campaign</dt>
                    <dd className="text-sm font-medium text-[var(--color-foreground)]">
                      {profile.campaignCount}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4 border-b border-[var(--color-border-light)] pb-3">
                    <dt className="text-sm text-[var(--color-muted-foreground)]">Member Since</dt>
                    <dd className="text-sm font-medium text-[var(--color-foreground)]">
                      {new Date(profile.memberSince).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                      })}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4 border-b border-[var(--color-border-light)] pb-3">
                    <dt className="text-sm text-[var(--color-muted-foreground)]">Gender</dt>
                    <dd className="text-sm font-medium text-[var(--color-foreground)]">
                      {profile.gender ?? "—"}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4 border-b border-[var(--color-border-light)] pb-3">
                    <dt className="text-sm text-[var(--color-muted-foreground)]">Language</dt>
                    <dd className="text-sm font-medium text-[var(--color-foreground)]">
                      {profile.language ?? "—"}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-sm text-[var(--color-muted-foreground)]">Birth Date</dt>
                    <dd className="text-sm font-medium text-[var(--color-foreground)]">
                      {profile.birthDate
                        ? new Date(profile.birthDate).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })
                        : "—"}
                    </dd>
                  </div>
                </dl>
              )}
            </div>

            {/* Stream Platforms */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <SectionHeading text1="Stream" text2="Platforms" />
                <Button variant="secondary" onClick={() => toggleEdit("platforms")}>
                  {editingSection === "platforms" ? "Cancel" : "Edit"}
                </Button>
              </div>

              {editingSection === "platforms" ? (
                <div className="space-y-3">
                  <FormField>
                    <FormLabel>Platform</FormLabel>
                    <Select
                      value={profile.primaryPlatform}
                      onChange={(e) =>
                        setProfile((p) => ({
                          ...p,
                          primaryPlatform: e.target.value as StreamPlatform,
                        }))
                      }
                    >
                      {Object.entries(PLATFORM_LABEL).map(([k, v]) => (
                        <option key={k} value={k}>{v}</option>
                      ))}
                    </Select>
                  </FormField>
                  <FormField>
                    <FormLabel>Channel URL</FormLabel>
                    <Input
                      value={profile.channelUrl}
                      onChange={(e) =>
                        setProfile((p) => ({ ...p, channelUrl: e.target.value }))
                      }
                    />
                  </FormField>
                  <Button onClick={handleSave}>Save Changes</Button>
                </div>
              ) : (
                <dl className="space-y-3">
                  <div className="flex justify-between gap-4 border-b border-[var(--color-border-light)] pb-3">
                    <dt className="text-sm text-[var(--color-muted-foreground)]">
                      {profile.primaryPlatform.charAt(0) + profile.primaryPlatform.slice(1).toLowerCase()}
                    </dt>
                    <dd className="text-sm text-right min-w-0">
                      <a
                        href={profile.channelUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--color-brand)] hover:underline break-all"
                      >
                        {profile.channelUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                      </a>
                    </dd>
                  </div>
                </dl>
              )}
            </div>

            {/* About Me */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <SectionHeading text1="About" text2="Me" />
                <Button variant="secondary" onClick={() => toggleEdit("about")}>
                  {editingSection === "about" ? "Cancel" : "Edit"}
                </Button>
              </div>

              {editingSection === "about" ? (
                <div className="space-y-3">
                  <Textarea
                    value={profile.bio}
                    onChange={(e) =>
                      setProfile((p) => ({ ...p, bio: e.target.value }))
                    }
                  />
                  <Button onClick={handleSave}>Save Changes</Button>
                </div>
              ) : (
                <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
                  {profile.bio}
                </p>
              )}
            </div>
          </aside>
        </div>
      </div>

      {saved && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[var(--color-brand)] text-[var(--color-brand-foreground)] px-6 py-2 text-sm font-medium shadow-lg">
          Changes saved!
        </div>
      )}
    </div>
  );
}
