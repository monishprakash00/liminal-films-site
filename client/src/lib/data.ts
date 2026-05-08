import boyAndRiver from "@/assets/images/the-boy-and-the-river.png";
import tgwtbe from "@/assets/images/tgwtbe.png";
import witd3 from "@/assets/images/witd3.png";
import monish from "@/assets/images/team-founder-real.jpg";
import shruti from "@/assets/images/shruti.jpeg";
import manas from "@/assets/images/manas.jpg";
import rithwik from "@/assets/images/team-music-director.jpg";
import abhijit from "@/assets/images/abhijit.jpeg";

export type ProjectType = "Feature Film" | "Short Film" | "Music Video";

export interface Project {
  id: string;
  title: string;
  year: string;
  type: ProjectType;
  genre: string;
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

export const projects: Project[] = [
  {
    id: "boy-and-river",
    title: "The Boy and the River",
    year: "2025",
    type: "Feature Film",
    genre: "Psychological Drama",
    image: boyAndRiver,
    synopsis: "The film tells the intimate and haunting story of Gagan, a young man consumed by the crippling guilt of killing his mother. Hollowed out by grief, he has retreated into near-total stillness. The same house, the same river, and the same silence. Days bleed into nights. Time loses its shape.\n\n\nThen two inexplicable figures enter his world. Not ghosts but echoes, perhaps.\n\nWith these encounters, the film moves through grief, nostalgia, dread, and even unexpected tenderness. The narrative is unconventional, structured like a dream. Circular, layered, and emotionally intuitive. Fragments surface: a childhood memory, an utter desperation to disappear, and the echo of a voice no longer there.\n\n\nThe Boy and the River is not a film about resolution. It is about standing still long enough to face what you have spent years running from. It is about the quiet, almost imperceptible shifts that happen inside a person when you finally stop.",
    videoId: "ScMzIvxBSi4"
  },
  {
    id: "bluest-eyes",
    title: "The Girl with the Bluest Eyes",
    year: "2018",
    type: "Short Film",
    genre: "Drama",
    image: tgwtbe,
    synopsis: "Noah lives under the control of a man who has owned him since childhood. Taken off the streets, given shelter, then quietly sold to strangers. Now grown, he moves through his days without will or want. The only thing still his is the cello his mother taught him.\n\nWhen Eli brings a young girl into their world, something shifts in Noah. Quietly. Irreversibly. In her, Noah sees himself. Whispers in the Dark is a film about fear, captivity, and the quiet courage of finally standing up.",
    videoId: "QJDP8onM3_Y"
  },
  {
    id: "whispers-dark",
    title: "Whispers in the Dark",
    year: "2019",
    type: "Short Film",
    genre: "Psychological Thriller",
    image: witd3,
    synopsis: "Logan is twenty-four, overworked, and holding everything together by a thread. His grandmother is his only family. His medication is the only thing keeping him tethered to reality.\n\nWhen his insurance lapses, the thread snaps.\n\nWithout money, without help, and without anyone who notices, Logan's affliction pulls him further from the world around him. His voices grow louder and hallucinations, deeper. Somewhere in the space between what is real and what isn't, something irreversible happens.\n\nWhispers in the Dark is a film about what falls through the cracks, and what it costs.",
    videoId: "9MUcWUqQ88E"
  }
];

export const team: TeamMember[] = [
  {
    id: "monish",
    name: "Monish Parimala Prakash",
    role: "Founder / Writer / Director",
    image: monish,
    bio: "Monish Parimala Prakash is an emerging filmmaker dedicated to bold, character-driven cinema that blends emotional depth with inventive storytelling. Passionate about supporting distinctive voices, he thrives on projects that challenge traditional narrative forms and embrace visual experimentation.\n\nHis debut feature film, The Boy and the River, is a genre-defying blend of science fiction, thriller, and psychological drama, marking a striking entry into independent filmmaking. The Boy and the River represents the culmination of years of creative dedication and marks the beginning of his journey as a bold, boundary-pushing voice in contemporary visual art.\n\nWith a focus on nurturing creative collaboration, Monish Parimala Prakash aims to develop work that resonate globally while retaining a deeply personal core, championing stories that linger in the mind long after the credits roll."
  },
  {
    id: "shruti",
    name: "Shruti Pallati",
    role: "Producer\nFeature Films",
    image: shruti,
    bio: "Shruti is a filmmaker with nearly five years of experience assisting across television commercials, Films, and Web series. She began her career in TVCs before moving into long-form storytelling, building a strong understanding of both fast-paced commercial sets and narrative-driven projects.\n\nShe is known for translating directorial vision into precise on-set execution, combining commercial sensibility with cinematic storytelling. Her work reflects a balance of structure, creativity, and attention to detail.\n\nOff set, Shruti is usually in a movie theatre, watching (and rewatching) films partly for inspiration, and partly because she genuinely can't stay away from the big screen."
  },
  {
    id: "manas",
    name: "Manas Bhattacharyya",
    role: "Director of Photography\nFeature Films",
    image: manas,
    bio: "A distinguished alumnus of the SRFTI cinematography department, class of 2006, Manas not only topped his class but also garnered multiple scholarships, an indication to his extraordinary talent. His journey in the Bollywood industry began as an Assistant Cinematographer, contributing to notable films such as \"Laga Chunari Mein Daag\" (YRF), \"Antardwand\" (YRF), and \"Aamir\" (UTV).\n\nManas gained valuable experience working with renowned cinematographers such as K. U. Mohanan, Alphonse Roy, and Sushil Rajpal. As a Cinematographer, Manas has worked on feature films including the upcoming \"Mukti\" (Jio Studio) starring Jaideep Ahlawat and \"Naqaab\" (MX Player) featuring Mallika Sherawat and Esha Gupta.\n\nHis films have been selected for prestigious international festivals such as the Berlin International Film Festival, Toronto International Film Festival, Raindance International Film Festival, Tokyo International Film Festival, and Busan International Film Festival.\n\nBeyond the camera, Manas excels as a DI grading artist, for his impeccable color grading skills. His artistry is evident in critically acclaimed films like Gautam Ghose's 'Sankhachil' (National Film Award), Atanu Ghosh's 'Mayurakshi' (National Film Award), Haobam Paban Kumar's 'Lady of the Lake' (National Film Award and UNESCO Award), and 'Jole Dobe Na' (official selection in Berlin Film Festival).\n\nManas Bhattacharyya continues to create captivating visuals for films, ad films, and more."
  },
  {
    id: "rithwik",
    name: "Rithwik Sreekumar",
    role: "Music Director",
    image: rithwik,
    bio: "A composer known for his evocative and immersive soundscapes, Rithwik understands that music is the invisible character in every film. His scores are integral to the LIMINAL FILMS identity."
  },
  {
    id: "abhijit",
    name: "Abhijit Suresh Menon",
    role: "Marketing Strategist",
    image: abhijit,
    bio: "Abhijit brings over a decade of experience in film distribution and marketing strategy. He has successfully navigated the complex landscape of independent cinema, ensuring that LIMINAL FILMS reaches the audiences it deserves."
  }
];
