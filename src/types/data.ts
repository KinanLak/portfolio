// ==========================================
// Data type definitions for portfolio content
// ==========================================

export interface ProfileData {
  name: string;
  title: string;
  tagline: string;
  bio: string[];
  location: string;
  email: string;
  phone: string;
  social: {
    github: string;
  };
  profileImage: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  location: string;
  period: string;
  type: string;
  highlights: string[];
}

export interface ExperienceData {
  items: ExperienceItem[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  highlights: string[];
}

export interface EducationData {
  items: EducationItem[];
}

export interface SkillStage {
  id: string;
  name: string;
  category: string;
  technologies: string[];
  description: string;
}

export interface SkillsData {
  stages: SkillStage[];
}

export interface ProjectItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  tags: string[];
  featured: boolean;
}

export interface ProjectsData {
  items: ProjectItem[];
}

export interface NavigationSection {
  id: string;
  label: string;
  anchor: string;
}

export interface NavigationData {
  sections: NavigationSection[];
}

export interface MusicData {
  title: string;
  artist: string;
  src: string;
  bpm: number;
  seekBeats: number;
  syncOffsetMs: number;
  loop: boolean;
}
