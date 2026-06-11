"use client";

import { useState } from "react";
import { SectionHeading } from "@maingame/components";
import { Button } from "@maingame/components";
import { Input, Textarea, Select } from "@maingame/components";
import { FormField, FormLabel } from "@maingame/components";
import { StreamPlatform } from "@maingame/types";

const PLATFORM_LABEL: Record<string, string> = {
  [StreamPlatform.Twitch]: "Twitch",
  [StreamPlatform.YouTube]: "YouTube",
  [StreamPlatform.Kick]: "Kick",
  [StreamPlatform.Other]: "Other",
};

type ProfileFormData = {
  displayName: string;
  slug: string;
  primaryPlatform: StreamPlatform;
  channelUrl: string;
  bio: string;
  avatarUrl: string;
  bannerUrl: string;
};

const initialProfile: ProfileFormData = {
  displayName: "Nusantara Games",
  slug: "nusantara-games",
  primaryPlatform: StreamPlatform.Twitch,
  channelUrl: "https://twitch.tv/nusantaragames",
  bio: "Indie studio from Jakarta building games inspired by Southeast Asian folklore. Small team, big stories.",
  avatarUrl:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
  bannerUrl: "",
};

export default function MyStreamsPage() {
  const [profile, setProfile] = useState<ProfileFormData>(initialProfile);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="px-6 py-8">
      <SectionHeading text1="My" text2="Streams" />

      {/* Live Preview */}
      <div className="mt-6 border border-[var(--color-border-light)] overflow-hidden">
        <div className="relative h-36 bg-[var(--color-section)]">
          {profile.bannerUrl && (
            <img
              src={profile.bannerUrl}
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-40"
            />
          )}
        </div>
        <div className="px-5 pb-5">
          <div className="flex items-end gap-4 -mt-10 mb-3">
            <div className="h-20 w-20 shrink-0 overflow-hidden ring-4 ring-[var(--color-background)] bg-[var(--color-brand)] flex items-center justify-center text-xl font-bold text-[var(--color-brand-foreground)]">
              {profile.avatarUrl ? (
                <img
                  src={profile.avatarUrl}
                  alt={profile.displayName}
                  className="h-full w-full object-cover"
                />
              ) : (
                profile.displayName.charAt(0).toUpperCase()
              )}
            </div>
            <div className="pb-0.5">
              <p className="text-lg font-bold text-[var(--color-foreground)]">
                {profile.displayName || "Display Name"}
              </p>
              <p className="text-xs text-[var(--color-muted-foreground)]">
                @{profile.slug || "slug"} &middot;{" "}
                {PLATFORM_LABEL[profile.primaryPlatform] ?? "Platform"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Form */}
      <div className="mt-8 max-w-2xl space-y-4">
        <h2 className="text-sm font-semibold text-[var(--color-foreground)]">
          Profile Details
        </h2>
        <FormField>
          <FormLabel>Display Name</FormLabel>
          <Input
            value={profile.displayName}
            onChange={(e) => {
              setProfile((p) => ({ ...p, displayName: e.target.value }));
              setSaved(false);
            }}
          />
        </FormField>
        <FormField>
          <FormLabel>Slug</FormLabel>
          <Input
            value={profile.slug}
            onChange={(e) => {
              setProfile((p) => ({ ...p, slug: e.target.value }));
              setSaved(false);
            }}
          />
        </FormField>
        <FormField>
          <FormLabel>Primary Platform</FormLabel>
          <Select
            value={profile.primaryPlatform}
            onChange={(e) => {
              setProfile((p) => ({
                ...p,
                primaryPlatform: e.target.value as StreamPlatform,
              }));
              setSaved(false);
            }}
          >
            {Object.entries(PLATFORM_LABEL).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </Select>
        </FormField>
        <FormField>
          <FormLabel>Channel URL</FormLabel>
          <Input
            value={profile.channelUrl}
            onChange={(e) => {
              setProfile((p) => ({ ...p, channelUrl: e.target.value }));
              setSaved(false);
            }}
          />
        </FormField>
        <FormField>
          <FormLabel>Bio</FormLabel>
          <Textarea
            value={profile.bio}
            onChange={(e) => {
              setProfile((p) => ({ ...p, bio: e.target.value }));
              setSaved(false);
            }}
          />
        </FormField>
        <FormField>
          <FormLabel>Avatar URL</FormLabel>
          <Input
            value={profile.avatarUrl}
            onChange={(e) => {
              setProfile((p) => ({ ...p, avatarUrl: e.target.value }));
              setSaved(false);
            }}
          />
        </FormField>
        <FormField>
          <FormLabel>Banner URL</FormLabel>
          <Input
            value={profile.bannerUrl}
            onChange={(e) => {
              setProfile((p) => ({ ...p, bannerUrl: e.target.value }));
              setSaved(false);
            }}
          />
        </FormField>
        <div className="flex items-center gap-3 pt-2">
          <Button onClick={handleSave}>Save Changes</Button>
          {saved && (
            <span className="text-sm text-[var(--color-brand)]">Saved!</span>
          )}
        </div>
      </div>
    </div>
  );
}
