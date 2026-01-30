export interface Article {
  id: number;
  title: string;
  summary: string;
  date: string;
  readTime: string;
  category: string;
  url: string;
}

export const articles: Article[] = [
  {
    id: 1,
    title: "The BITC Transition: Why Hardware is Becoming a Liability in PNG",
    summary: "Exploring how cloud-native architectures are outperforming traditional on-premise server rooms in tropical climates.",
    date: "May 12, 2024",
    readTime: "6 min",
    category: "Infrastructure",
    url: "#news"
  },
  {
    id: 2,
    title: "Quantum-Inspired Algorithms in Highland Agribusiness",
    summary: "How complex logistics modeling is saving coffee exporters thousands in seasonal waste through optimized routing.",
    date: "May 08, 2024",
    readTime: "4 min",
    category: "Ag-Tech",
    url: "#news"
  },
  {
    id: 3,
    title: "Deeps Systems Partners with Nebula Cloud for Regional Expansion",
    summary: "Scaling PNG-grown optimization logic to the broader Pacific through hyper-scalable serverless infrastructure.",
    date: "May 01, 2024",
    readTime: "3 min",
    category: "Partnerships",
    url: "#news"
  }
];