import { Metadata } from 'next';
import { createSupabaseServerClient } from '@/lib/supabase-server';
import { Project } from '@/lib/types';
import { ProjectTable } from '@/components/ProjectTable';
import { Header } from '@/components/Header';

export const metadata: Metadata = {
  title: 'Project Dashboard | Manage Your Projects',
  description: 'Track and manage your projects with status updates, deadlines, budgets, and team assignments.',
};

export const dynamic = 'force-dynamic';

async function getProjects(): Promise<Project[]> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data || [];
}

export default async function Dashboard() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  const projects = await getProjects();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Header userEmail={user?.email || ''} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Projects
          </h2>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            Manage and track your projects
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <ProjectTable initialProjects={projects} />
        </div>
      </main>
    </div>
  );
}
