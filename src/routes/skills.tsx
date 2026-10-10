import { createFileRoute } from '@tanstack/react-router';
import { Portfolio, portfolioHead } from '@/components/portfolio/Portfolio';
export const Route = createFileRoute('/skills')({ ssr: false, head: () => portfolioHead('Skills — The Toolkit', 'Java, MySql, system support, printer hardware maintenance and analytical problem-solving skills.'), component: () => <Portfolio active="skills" /> });