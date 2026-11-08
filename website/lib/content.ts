import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

const CONTENT_DIR = path.join(process.cwd(), "content");

export const CATEGORIES = [
  "Structural",
  "Transportation",
  "Materials",
  "Geotech",
  "Water",
  "Survey",
  "Other",
] as const;

export type Profile = {
  name: string;
  epithet: string;
  role: string;
  bounty: string;
  tagline: string;
  semester: string;
  college: string;
  portrait: string;
  aboutPhoto: string;
  bio: string[];
  contactIntro: string;
  email: string;
  phone: string;
  linkedin: string;
  formEndpoint: string;
};

export type SkillGroup = { crewRole: string; name: string; items: string[] };

export type Project = {
  slug: string;
  title: string;
  date: string;
  location: string;
  category: string;
  summary: string;
  cover: string;
  gallery: string[];
  tools: string[];
  highlights: string[];
  featured: boolean;
  order: number;
  html: string;
};

const asString = (v: unknown, fallback = "") =>
  typeof v === "string" ? v : v == null ? fallback : String(v);

const asStringList = (v: unknown): string[] =>
  Array.isArray(v) ? v.map((x) => asString(x).trim()).filter(Boolean) : [];

function readJson<T>(file: string): Partial<T> {
  try {
    return JSON.parse(fs.readFileSync(path.join(CONTENT_DIR, file), "utf8")) as Partial<T>;
  } catch {
    return {};
  }
}

export function getProfile(): Profile {
  const p = readJson<Profile>("profile.json");
  return {
    name: asString(p.name, "Your Name"),
    epithet: asString(p.epithet),
    role: asString(p.role),
    bounty: asString(p.bounty),
    tagline: asString(p.tagline),
    semester: asString(p.semester),
    college: asString(p.college),
    portrait: asString(p.portrait),
    aboutPhoto: asString(p.aboutPhoto),
    bio: asStringList(p.bio),
    contactIntro: asString(p.contactIntro),
    email: asString(p.email),
    phone: asString(p.phone),
    linkedin: asString(p.linkedin),
    formEndpoint: asString(p.formEndpoint),
  };
}

export function getSkillGroups(): SkillGroup[] {
  const s = readJson<{ groups: SkillGroup[] }>("skills.json");
  return (Array.isArray(s.groups) ? s.groups : [])
    .map((g) => ({
      crewRole: asString(g?.crewRole),
      name: asString(g?.name),
      items: asStringList(g?.items),
    }))
    .filter((g) => g.name || g.items.length);
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function toIsoDate(v: unknown) {
  const d = v instanceof Date ? v : new Date(asString(v));
  return Number.isNaN(d.getTime()) ? "" : d.toISOString().slice(0, 10);
}

export function getProjects(): Project[] {
  const dir = path.join(CONTENT_DIR, "projects");
  let files: string[] = [];
  try {
    files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
  } catch {
    return [];
  }

  const projects = files.flatMap((file): Project[] => {
    const { data, content } = matter(fs.readFileSync(path.join(dir, file), "utf8"));
    const title = asString(data.title).trim();
    if (!title) return [];
    const category = asString(data.category, "Other");
    return [
      {
        slug: slugify(asString(data.slug)) || slugify(title) || slugify(file),
        title,
        date: toIsoDate(data.date),
        location: asString(data.location),
        category: (CATEGORIES as readonly string[]).includes(category) ? category : "Other",
        summary: asString(data.summary),
        cover: asString(data.cover),
        gallery: asStringList(data.gallery),
        tools: asStringList(data.tools),
        highlights: asStringList(data.highlights),
        featured: data.featured === true,
        order: typeof data.order === "number" ? data.order : 999,
        html: marked.parse(content, { async: false }) as string,
      },
    ];
  });

  return projects.sort(
    (a, b) => a.order - b.order || b.date.localeCompare(a.date) || a.title.localeCompare(b.title)
  );
}

export function getProject(slug: string) {
  return getProjects().find((p) => p.slug === slug);
}
