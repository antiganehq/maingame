export enum UserRole {
  GameDeveloper = "GAME_DEVELOPER",
  Streamer = "STREAMER",
  Admin = "ADMIN"
}

export enum ProfileStatus {
  Pending = "PENDING",
  Active = "ACTIVE",
  Suspended = "SUSPENDED"
}

export enum GameStatus {
  Draft = "DRAFT",
  Published = "PUBLISHED",
  Paused = "PAUSED",
  Archived = "ARCHIVED",
  Rejected = "REJECTED"
}

export enum CampaignStatus {
  Draft = "DRAFT",
  Offered = "OFFERED",
  Accepted = "ACCEPTED",
  Rejected = "REJECTED",
  Funded = "FUNDED",
  Scheduled = "SCHEDULED",
  Submitted = "SUBMITTED",
  Approved = "APPROVED",
  Paid = "PAID",
  Cancelled = "CANCELLED",
  Disputed = "DISPUTED"
}

export enum CampaignEventType {
  Created = "CREATED",
  Offered = "OFFERED",
  Accepted = "ACCEPTED",
  Rejected = "REJECTED",
  Funded = "FUNDED",
  Scheduled = "SCHEDULED",
  Submitted = "SUBMITTED",
  Approved = "APPROVED",
  Paid = "PAID",
  Cancelled = "CANCELLED",
  Disputed = "DISPUTED",
  Refunded = "REFUNDED"
}

export enum TransactionType {
  TopUpCredit = "TOP_UP_CREDIT",
  CampaignEscrowHold = "CAMPAIGN_ESCROW_HOLD",
  CampaignEscrowRelease = "CAMPAIGN_ESCROW_RELEASE",
  CampaignPayout = "CAMPAIGN_PAYOUT",
  CampaignRefund = "CAMPAIGN_REFUND",
  PlatformFee = "PLATFORM_FEE",
  ManualAdjustment = "MANUAL_ADJUSTMENT"
}

export enum TransactionStatus {
  Pending = "PENDING",
  Completed = "COMPLETED",
  Failed = "FAILED",
  Reversed = "REVERSED"
}

export enum TopUpStatus {
  Pending = "PENDING",
  Submitted = "SUBMITTED",
  Approved = "APPROVED",
  Rejected = "REJECTED",
  Credited = "CREDITED"
}

export enum CommentStatus {
  Visible = "VISIBLE",
  Hidden = "HIDDEN",
  Flagged = "FLAGGED"
}

export enum QuestionnaireQuestionType {
  ShortText = "SHORT_TEXT",
  LongText = "LONG_TEXT",
  MultipleChoice = "MULTIPLE_CHOICE",
  Checkbox = "CHECKBOX",
  Rating = "RATING",
  FileUpload = "FILE_UPLOAD"
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
