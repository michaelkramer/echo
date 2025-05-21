export interface AuthUser {
  display_name: string | null;
  email: string | null;
  uid: string | null;
  role: "SuperAdmin" | "Admin" | "Clinician" | null;
}
