import { createFileRoute } from '@tanstack/react-router';
import { Portfolio, portfolioHead } from '@/components/portfolio/Portfolio';
export const Route = createFileRoute('/')({ ssr: false, head: () => portfolioHead('Developer & IT Professional', 'Explore Olwethu Ngalo’s universe of Java development, technical support, hands-on experience and certified foundations.'), component: Portfolio });
