import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

const sampleProjects = [
  {
    name: 'E-commerce Platform Redesign',
    description: 'Complete overhaul of the online shopping experience with modern UI/UX',
    status: 'active',
    deadline: '2026-04-15',
    assigned_to: 'Sarah Johnson',
    budget: 75000.00,
  },
  {
    name: 'Mobile App Development',
    description: 'Native iOS and Android apps for customer engagement',
    status: 'active',
    deadline: '2026-06-30',
    assigned_to: 'Michael Chen',
    budget: 120000.00,
  },
  {
    name: 'Data Analytics Dashboard',
    description: 'Real-time analytics and reporting system',
    status: 'on_hold',
    deadline: '2026-05-01',
    assigned_to: 'Emily Davis',
    budget: 45000.00,
  },
  {
    name: 'API Integration Project',
    description: 'Third-party service integrations and API development',
    status: 'completed',
    deadline: '2026-01-31',
    assigned_to: 'David Wilson',
    budget: 30000.00,
  },
  {
    name: 'Security Audit & Compliance',
    description: 'SOC 2 compliance and security infrastructure improvements',
    status: 'active',
    deadline: '2026-03-20',
    assigned_to: 'Lisa Anderson',
    budget: 55000.00,
  },
  {
    name: 'Customer Portal Upgrade',
    description: 'Self-service portal with enhanced features',
    status: 'on_hold',
    deadline: '2026-07-15',
    assigned_to: 'James Taylor',
    budget: 40000.00,
  },
  {
    name: 'Cloud Migration',
    description: 'Migrating legacy systems to AWS infrastructure',
    status: 'completed',
    deadline: '2026-02-10',
    assigned_to: 'Robert Martinez',
    budget: 90000.00,
  },
  {
    name: 'CRM Implementation',
    description: 'Salesforce integration and customization',
    status: 'active',
    deadline: '2026-04-30',
    assigned_to: 'Jennifer Brown',
    budget: 65000.00,
  },
  {
    name: 'Performance Optimization',
    description: 'Website speed improvements and caching strategies',
    status: 'completed',
    deadline: '2026-01-15',
    assigned_to: 'Chris Lee',
    budget: 25000.00,
  },
  {
    name: 'AI Chatbot Integration',
    description: 'Customer support automation with AI-powered chatbot',
    status: 'active',
    deadline: '2026-05-20',
    assigned_to: 'Amanda White',
    budget: 80000.00,
  },
];

async function seed() {
  console.log('Starting database seed...');

  // First, clear existing projects (optional)
  const { error: deleteError } = await supabase
    .from('projects')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all

  if (deleteError) {
    console.error('Error clearing existing projects:', deleteError.message);
  }

  // Insert sample projects
  const { data, error } = await supabase
    .from('projects')
    .insert(sampleProjects)
    .select();

  if (error) {
    console.error('Error seeding projects:', error.message);
    process.exit(1);
  }

  console.log(`Successfully seeded ${data.length} projects!`);
  console.log('Projects:', data.map(p => p.name).join(', '));
}

seed().catch(console.error);
