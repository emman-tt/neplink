// Single source of truth for the Team page. Names and roles are exactly as
// published on the client's own TEAM page (presentation case adjusted:
// "MR. EMMANUEL PINTO" → "Mr. Emmanuel Pinto"). Department declaration per
// the client; the management layer (director + secretary) sits in
// Administrative Affairs. No photos exist on the public record — the grid's
// portrait tiles are honest monogram placeholders, never stock faces attached
// to real names.

export const DIRECTOR = {
  name: "Mr. Emmanuel Pinto",
  initials: "EP",
  role: "Director",
  dept: "Administrative Affairs",
};

export const FILTERS = [
  { key: "ALL", label: "All" },
  { key: "AA", label: "Administrative affairs" },
  { key: "TO", label: "Tour operations" },
  { key: "RTD", label: "Training + development" },
  { key: "AC", label: "Accounts" },
] as const;

export const DEPARTMENTS = [
  {
    code: "AA",
    dept: "Administrative Affairs",
    members: [
      {
        name: "Mr. Emmanuel Pinto",
        initials: "EP",
        role: "Director",
        seat: "AA·01",
      },
      {
        name: "Ms Anita Dede Pinto",
        initials: "AP",
        role: "Secretary",
        seat: "AA·02",
      },
    ],
  },
  {
    code: "TO",
    dept: "Tour Operations",
    members: [
      {
        name: "Mr Alex Marcel Williams",
        initials: "AW",
        role: "Field Tour Officer",
        seat: "TO·01",
      },
    ],
  },
  {
    code: "RTD",
    dept: "Resource, Training and Development",
    members: [
      {
        name: "Mr Wisdom Kallai",
        initials: "WK",
        role: "Project Development Officer",
        seat: "RTD·01",
      },
    ],
  },
  {
    code: "AC",
    dept: "Accounts",
    members: [
      {
        name: "Samuel Kodjatey",
        initials: "SK",
        role: "Account Clerk",
        seat: "AC·01",
      },
    ],
  },
] as const;
