import { createFileRoute } from '@tanstack/react-router';
import { Portfolio, portfolioHead } from '@/components/portfolio/Portfolio';
export const Route = createFileRoute('/contact')({ ssr: false, head: () => portfolioHead('Contact — The Next Connection', 'Connect with Olwethu Ngalo for IT support and systems development opportunities.'), component: () => <Portfolio active="contact" /> });