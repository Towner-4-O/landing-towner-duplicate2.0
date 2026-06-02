/** Android package — must match Play Store & Flutter `referral_constants.dart`. */
export const TOWNER_ANDROID_PACKAGE = "com.towner.app";

/** Play Install Referrer is set only when users leave via this landing page. */
export const REFERRAL_AUTO_REDIRECT_MS = 3000;

const REFERRAL_CODE_PATTERN = /^[A-Z0-9]{4,24}$/;

export function normalizeReferralCode(
  raw: string | null | undefined
): string | null {
  if (!raw?.trim()) return null;
  const code = raw.trim().toUpperCase();
  return REFERRAL_CODE_PATTERN.test(code) ? code : null;
}

/** Google Play URL with Install Referrer (`code=XYZ`). */
export function buildPlayStoreReferralUrl(code: string): string {
  const referrer = encodeURIComponent(`code=${code}`);
  return `https://play.google.com/store/apps/details?id=${TOWNER_ANDROID_PACKAGE}&hl=en&referrer=${referrer}`;
}

/** Deep link when the app is already installed (Android / debug). */
export function buildAppDeepLink(code: string): string {
  return `towner://ref?code=${encodeURIComponent(code)}`;
}

export function isAndroidDevice(): boolean {
  if (typeof navigator === "undefined") return false;
  return /Android/i.test(navigator.userAgent);
}
