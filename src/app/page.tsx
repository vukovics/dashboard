import { Metadata } from 'next';
import { supabase } from '@/lib/supabase';
import { Project } from '@/lib/types';
import { ProjectTable } from '@/components/ProjectTable';

export const metadata: Metadata = {
  title: 'Project Dashboard | Manage Your Projects',
  description: 'Track and manage your projects with status updates, deadlines, budgets, and team assignments.',
};

export const dynamic = 'force-dynamic';

async function getProjects(): Promise<Project[]> {
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
  const projects = await getProjects();

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Project Dashboard
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage and track your projects
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <ProjectTable initialProjects={projects} />
        </div>
      </div>
    </main>
  );
}
