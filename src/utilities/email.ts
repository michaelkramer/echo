import { ENV } from "./env";

export function getOverriddenEmail(devEmail: string, email: string) {
  const devEmailParts = devEmail.split("@");

  if (!email) {
    return devEmail;
  }

  // prevent accidentally modifying an already overridden email
  if (email.includes(devEmailParts[1])) {
    return email;
  }

  return `${devEmailParts[0]}+${email.replace("@", ".at.")}@${devEmailParts[1]}`;
}

/**
 * if we are not in production, we will override email address to make sure we
 * never accidentally send email to real users
 */
export function overrideEmail(email: string): string {
  if (!(ENV.IS_DEV || ENV.IS_TEST)) {
    return email;
  }

  const devEmail = ENV.DEV_EMAIL || "michealrkramer@gmail.com";
  return getOverriddenEmail(devEmail, email);
}

/**
 * Restore to original email when not in production to remove the override added
 * in the overrideEmail function
 */
export function cleanEmail(email: string): string {
  if (!(ENV.IS_DEV || ENV.IS_TEST)) {
    return email;
  }

  const devEmail = ENV.DEV_EMAIL || "michealrkramer@gmail.com";
  const devEmailParts = devEmail.split("@");
  return email
    .slice(devEmailParts[0].length + 1, -1 * (devEmailParts[1].length + 1))
    .replace(".at.", "@");
}
