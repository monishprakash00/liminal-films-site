export type ProjectType = "Feature Film" | "Short Film" | "Music Video";

export interface Project {
  id: string;
  title: string;
  year: string;
  type: ProjectType;
  image: string;
  synopsis: string;
  videoId: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
}

// Re-use some existing images if available, otherwise assume paths
export const projects: Project[] = [
  {
    id: "boy-and-river",
    title: "The Boy and the River",
    year: "2025",
    type: "Feature Film",
    image: "/src/assets/images/portfolio-1.png",
    synopsis: "A hauntingly beautiful drama exploring themes of grief, isolation, and redemption. Set against a timeless landscape, this feature film follows a young protagonist on an unforgettable journey of self-discovery.",
    videoId: "ScMzIvxBSi4"
  },
  {
    id: "whispers-dark",
    title: "Whispers in the Dark",
    year: "2019",
    type: "Short Film",
    image: "/src/assets/images/portfolio-2.png",
    synopsis: "A psychological thriller short film that delves into the fragile nature of memory. When the past begins to bleed into the present, the line between reality and illusion becomes irrevocably blurred.",
    videoId: "ScMzIvxBSi4"
  },
  {
    id: "bluest-eyes",
    title: "The Girl with the Bluest Eyes",
    year: "2018",
    type: "Short Film",
    image: "/src/assets/images/portfolio-3.png",
    synopsis: "A visually stunning narrative short exploring identity and belonging. Told through striking monochrome cinematography with subtle highlights, it stands as a testament to visual storytelling.",
    videoId: "ScMzIvxBSi4"
  }
];

export const team: TeamMember[] = [
  {
    id: "monish",
    name: "Monish Parimala Prakash",
    role: "Founder / Writer / Director",
    image: "/src/assets/images/team-founder-real.jpg",
    bio: "Monish Parimala Prakash is a visionary director and writer whose work focuses on the emotional undercurrents of the human experience. With a background in both fine arts and classical storytelling, Monish bridges the gap between commercial viability and arthouse aesthetics."
  },
  {
    id: "abhijit",
    name: "Abhijit Suresh Menon",
    role: "Marketing Strategist",
    image: "/src/assets/images/team-1.png",
    bio: "Abhijit brings over a decade of experience in film distribution and marketing strategy. He has successfully navigated the complex landscape of independent cinema, ensuring that LIMINAL FILMS reaches the audiences it deserves."
  },
  {
    id: "rithwik",
    name: "Rithwik Sreekumar",
    role: "Music Director",
    image: "/src/assets/images/team-music-director.jpg",
    bio: "A composer known for his evocative and immersive soundscapes, Rithwik understands that music is the invisible character in every film. His scores are integral to the LIMINAL FILMS identity."
  },
  {
    id: "manas",
    name: "Manas Bhattacharyya",
    role: "Director of Photography",
    image: "/src/assets/images/team-2.png",
    bio: "Manas perceives the world through light and shadow. His cinematography is characterized by its raw authenticity and poetic framing, making him a sought-after talent in independent cinema."
  },
  {
    id: "shruti",
    name: "Shruti Pallati",
    role: "Producer",
    image: "/src/assets/images/team-3.png",
    bio: "Shruti is the backbone of the production house, translating creative vision into tangible reality. Her meticulous planning and relentless drive ensure that every project is executed to perfection."
  },
  {
    id: "vaishnavi",
    name: "Vaishnavi Patel",
    role: "Social Media Head",
    image: "/src/assets/images/team-1.png",
    bio: "Vaishnavi crafts the digital narrative for LIMINAL FILMS, building communities and engaging audiences globally. Her strategies amplify the reach and resonance of every release."
  }
];