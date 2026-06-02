export enum UserRole {
  GameDeveloper = "GAME_DEVELOPER",
  Streamer = "STREAMER",
  Admin = "ADMIN"
}

export enum CampaignStatus {
  Draft = "DRAFT",
  Funded = "FUNDED",
  Offered = "OFFERED",
  Accepted = "ACCEPTED",
  Rejected = "REJECTED",
  Scheduled = "SCHEDULED",
  Submitted = "SUBMITTED",
  Approved = "APPROVED",
  Paid = "PAID",
  Cancelled = "CANCELLED"
}

export enum StreamPlatform {
  Twitch = "TWITCH",
  YouTube = "YOUTUBE",
  Kick = "KICK",
  Other = "OTHER"
}

export type DotsAmount = number;

export type PublicGame = {
  id: string;
  title: string;
  slug: string;
  studioName: string;
  shortDescription: string;
};

export type PublicStreamer = {
  id: string;
  displayName: string;
  slug: string;
  primaryPlatform: StreamPlatform;
};
