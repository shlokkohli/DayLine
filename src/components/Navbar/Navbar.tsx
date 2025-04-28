import { useRouter } from 'next/navigation'
import ThemeToggle from '../ThemeToggle'
import Logo from './Logo'
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Home, Settings } from 'lucide-react';

const Navbar = () => {

  const router = useRouter();

  const { data: session } = useSession();

  return (
    <div className='min-h-18 py-4 flex items-center max-w-6xl justify-between mx-auto px-3'>
        <Logo />

        <div className='flex'>
            <div className='flex justify-center space-x-5'>

              {session?.user.id ? (

                <div className='flex gap-4'>

                  <a
                  href={'/log'}
                  className={`flex items-center gap-1 px-3 py-2 rounded-md transition-colors ${ location.pathname === '/log' ? 
                    'text-purple-600 bg-purple-50 dark:text-purple-400 dark:bg-purple-900/20' : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50 dark:text-gray-300 dark:hover:text-purple-400 dark:hover:bg-purple-900/20'
                  }`}>
                    <Home className="w-5 h-5" />
                    <span className="font-medium">Log</span>
                  </a>

                  <a
                  href={'/settings'}
                  className={`flex items-center gap-1 px-3 py-2 rounded-md transition-colors ${ location.pathname === '/settings' ? 
                    'text-purple-600 bg-purple-50 dark:text-purple-400 dark:bg-purple-900/20' : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50 dark:text-gray-300 dark:hover:text-purple-400 dark:hover:bg-purple-900/20'
                  }`}>
                    <Settings className="w-5 h-5" />
                    <span className="font-medium">Settings</span>
                  </a>

                </div>

              ) : (
                <button className='bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700
                text-white text-lg rounded-full p-2 px-6 transition-all'
                  onClick={() => router.push('/sign-up')}>
                    Get Started
                </button>
              )}

                <ThemeToggle />
            </div>
        </div>
    </div>
  )
}

export default Navbar