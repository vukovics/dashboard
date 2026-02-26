'use client';

import { useRouter } from 'next/navigation';
import { createSupabaseBrowserClient } from '@/lib/supabase-browser';

interface HeaderProps {
  userEmail: string;
}

export function Header({ userEmail }: HeaderProps) {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          Project Dashboard
        </h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600 dark:text-gray-400 hidden sm:block">
            {userEmail}
          </span>
          <button
            onClick={handleLogout}
            className="px-3 py-1.5 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
