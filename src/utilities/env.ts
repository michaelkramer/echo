export const ENV = {
  IS_DEV: import.meta.env.DEV,
  IS_TEST: import.meta.env.VITE_IS_TEST === "true",
  IS_PROD: !import.meta.env.DEV,
  DEV_EMAIL: import.meta.env.VITE_DEV_EMAIL || "",
  FIREBASE_CONFIG: JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG || "{}"),
};
