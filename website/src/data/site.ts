/**
 * Everything on the page comes from the files in /content, which the admin panel (/admin) edits.
 * Nothing here needs to change when the owner updates their text, photos or projects.
 */
import profileRaw from '../../content/profile.json';
import skillsRaw from '../../content/skills.json';
import experienceRaw from '../../content/experience.json';

const str = (v: unknown, d = '') => (typeof v === 'string' ? v : v == null ? d : String(v));
const list = (v: unknown): string[] => (Array.isArray(v) ? v.map((x) => str(x).trim()).filter(Boolean) : []);

const base = import.meta.env.BASE_URL.replace(/\/$/, '');
/** Prefix a site-relative path (e.g. an uploaded image) with the deploy base path. */
export const asset = (src: string) =>
  !src || /^(https?:)?\/\//.test(src) || src.startsWith('data:') ? src : `${base}${src.startsWith('/') ? '' : '/'}${src}`;

const p = profileRaw as Record<string, unknown>;

export const site = {
  name: str(p.name, 'Your Name'),
  role: str(p.role),
  tagline: str(p.tagline),
  intro: str(p.intro),
  college: str(p.college),
  semester: str(p.semester),
  photo: str(p.aboutPhoto),
  bio: list(p.bio),
  focus: list(p.focus),
  contactIntro: str(p.contactIntro),
  email: str(p.email),
  phone: str(p.phone),
  linkedin: str(p.linkedin),
  cv: str(p.cv),
  url: str(p.siteUrl),
  description: str(p.description) || `${str(p.name)}, ${str(p.role)}. ${str(p.intro)}`,
};
export const title = `${site.name}${site.role ? ' · ' + site.role : ''}`;

export const stack: { label: string; items: string[] }[] = (
  Array.isArray((skillsRaw as { groups?: unknown }).groups) ? (skillsRaw as { groups: { name?: string; items?: string[] }[] }).groups : []
)
  .map((g) => ({ label: str(g.name), items: list(g.items) }))
  .filter((g) => g.label && g.items.length);

export type Experience = { when: string; title: string; role: string; body: string };
export const experience: Experience[] = (
  Array.isArray((experienceRaw as { items?: unknown }).items) ? (experienceRaw as { items: Record<string, unknown>[] }).items : []
)
  .map((e) => ({ when: str(e.when), title: str(e.title), role: str(e.role), body: str(e.body) }))
  .filter((e) => e.title);

export type Project = {
  slug: string;
  title: string;
  category: string;
  location: string;
  date: string;
  summary: string;
  cover: string;
  gallery: string[];
  tools: string[];
  highlights: string[];
  featured: boolean;
  order: number;
  html: string;
};

type MdModule = { frontmatter: Record<string, unknown>; compiledContent: () => string | Promise<string>; file: string };
const mods = import.meta.glob<MdModule>('../../content/projects/*.md', { eager: true });

const toDate = (v: unknown) => {
  if (!v) return '';
  const d = v instanceof Date ? v : new Date(str(v));
  return Number.isNaN(d.getTime()) ? '' : d.toISOString().slice(0, 10);
};

export const projects: Project[] = (
  await Promise.all(
    Object.entries(mods).map(async ([file, m]): Promise<Project> => {
    const f = m.frontmatter;
    return {
      slug: str(f.slug) || file.split('/').pop()!.replace(/\.md$/, ''),
      title: str(f.title),
      category: str(f.category, 'Other'),
      location: str(f.location),
      date: toDate(f.date),
      summary: str(f.summary),
      cover: str(f.cover),
      gallery: list(f.gallery),
      tools: list(f.tools),
      highlights: list(f.highlights),
      featured: f.featured === true,
      order: typeof f.order === 'number' ? f.order : 999,
      html: (await m.compiledContent()).trim(),
    };
    }),
  )
)
  .filter((x) => x.title)
  .sort((a, b) => a.order - b.order || b.date.localeCompare(a.date) || a.title.localeCompare(b.title));
