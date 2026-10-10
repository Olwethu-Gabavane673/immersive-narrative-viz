export const profile = {
  name: 'Olwethu Ngalo',
  phone: '075-021-1548',
  email: 'olwethungalo@bardalesec.org.za',
  objective: 'Dedicated IT professional combining hands-on printer hardware maintenance and office automation experience with a strong foundation in system support and Java programming. Seeking to leverage technical troubleshooting and problem-solving skills in a dynamic IT Support or Systems Development role.',
};
export const destinations = [
  { id: 'about', label: 'About me', title: 'The origin', subtitle: 'A mind built to solve.', tag: 'IDENTITY', position: [0.4, 0, 0] },
  { id: 'skills', label: 'Skills', title: 'The toolkit', subtitle: 'Logic meets possibility.', tag: 'CAPABILITIES', position: [5.1, 1.3, -2.5] },
  { id: 'experience', label: 'Experience', title: 'The journey', subtitle: 'Built through real-world experience.', tag: 'EXPERIENCE', position: [-3.8, 0.8, -2.8] },
  { id: 'education', label: 'Education', title: 'The foundations', subtitle: 'Always a student. Always evolving.', tag: 'EDUCATION', position: [3.7, -0.8, 3.3] },
  { id: 'contact', label: 'Contact', title: 'The next connection', subtitle: 'Good things start with a conversation.', tag: 'CONTACT', position: [-3.6, -0.4, 3.2] },
] as const;
export type Destination = typeof destinations[number]['id'];
export const skills = [
  { name: 'Development', items: ['Java', 'JDK', 'JRE', 'Programming', 'MySql'] },
  { name: 'Systems & hardware', items: ['Technical support', 'Printer Hardware Maintenance MFP', 'Equipment Servicing'] },
  { name: 'Thinking & people', items: ['Analytical Problem Solving', 'Logic', 'Mathematics', 'Client-Side Support and User Guidance'] },
];
export const experience = [
  { company: 'Raydian Print & Office Automation Solutions', role: 'Technician (Printer Hardware & Office Automation) Intern', date: 'Jun 2026 — Sep 2026', details: [
    'Assisted with diagnosing, dismantling, and repairing mechanical and electrical printer hardware components.',
    'Supported on-site and workshop setups of new multi-function printers (MFPs), configuring network connectivity and client-side driver software.',
    'Performed systematic troubleshooting for error codes, paper feeds, print quality, and connectivity.',
    'Executed routine preventive maintenance and component replacements, including fusers, rollers, and maintenance kits.',
    'Provided operational guidance to end-users and kept accurate maintenance logs and service records.',
  ] },
  { company: 'BEMBA IT Solutions', role: 'Technical Support Intern', date: 'Oct 2025 — May 2026', details: [
    'Comprehensive hardware diagnostics: systematic troubleshooting, component-level testing, and fault isolation for desktops, workstations, and high-performance gaming PCs.',
    'System disassembly and assembly: complete hardware teardowns and builds, precise component installation, proper cable management, and optimal thermal performance for custom and pre-built rigs.',
    'Component upgrades and replacement: evaluated hardware performance bottlenecks and upgraded CPUs, GPUs, RAM, motherboards, power supplies, and HDD/SSD storage drives.',
    'OS deployment and configuration: installed, configured, and activated operating systems, integrated drivers, applied system updates, and prepared baseline software for clients.',
    'Quality assurance and testing: rigorous stress testing, benchmarking, and post-repair hardware diagnostics to guarantee system stability and performance before handover.',
  ] },
];
export const education = [
  { year: '2025', title: 'Java Certified Foundations Associate', institution: 'Oracle University', detail: 'Oracle Certified Foundations Associate · Awarded 14 April 2025.' },
  { year: '2024', title: 'Technical Support Fundamentals', institution: 'Google · Coursera', detail: 'Completed 20 October 2024. Online course authorized by Google and offered through Coursera; a course completion credential, not a degree or academic credit.', url: 'https://coursera.org/verify/TKMY7MIR64MJ' },
  { year: '2023', title: 'NQF Level 5 · System development & System support', institution: 'On The Ball College', detail: 'Systems Development Skills Program: 31 credits towards Systems Development Qualification 48872, NQF Level 5. Certificate of Competence and MICTSETA Statement of Results issued November 2024 (statement dated 30 November). College feedback recognized perseverance and commitment; results subject to MICTSETA verification. Provider accreditation: ACC/2007/01/170.' },
  { year: '2021', title: 'Higher Certificate in Information Systems', institution: 'Nelson Mandela University', detail: 'Listed in the CV as Information Systems (2021). Official award: Higher Certificate in Information Technology in User Support Services, conferred 4 May 2022.', url: 'https://validdoc.mandela.ac.za' },
  { year: '2019', title: 'Matric', institution: 'Bardale Secondary School', detail: 'Completed secondary school education.' },
];
export const standards = [
  { code: '115392', credits: 12, title: 'Apply principles of creating computer software by developing a complete programme to meet given business specifications' },
  { code: '115367', credits: 8, title: 'Demonstrate logical problem solving and error detection techniques' },
  { code: '115362', credits: 5, title: 'Manage software development source files using appropriate tools' },
  { code: '115373', credits: 6, title: 'Demonstrate an understanding of sort and search techniques used in computer programming' },
];
export const results = [
  { code: 'ITS1011', title: 'Information Technology Skills 1', month: 'June', year: 59, exam: '—', final: 59 },
  { code: 'WIH1011', title: 'Information Systems 1', month: 'June', year: 61, exam: '—', final: 50 },
  { code: 'TSS1012', title: 'Technical Support 1', month: 'November', year: 51, exam: '54', final: 53 },
  { code: 'USS1012', title: 'User Support 1', month: 'November', year: 74, exam: '40', final: 54 },
];