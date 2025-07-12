import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { FiHome, FiMap, FiTrendingUp, FiAward, FiSettings } from 'react-icons/fi';

const Sidebar = () => {
  const router = useRouter();

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <FiHome /> },
    { name: 'Aquifer Map', path: '/dashboard/map', icon: <FiMap /> },
    { name: 'Forecasts', path: '/dashboard/forecasts', icon: <FiTrendingUp /> },
    { name: 'Water Credits', path: '/dashboard/credits', icon: <FiAward /> },
    { name: 'Settings', path: '/dashboard/settings', icon: <FiSettings /> },
  ];

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex flex-col flex-grow pt-5 pb-4 bg-white overflow-y-auto border-r">
          <nav className="flex-1 px-2 space-y-1">
            {menuItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <motion.a
                  whileHover={{ x: 5 }}
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                    router.pathname === item.path
                      ? 'bg-cyan-50 text-cyan-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className="mr-3 text-lg">{item.icon}</span>
                  {item.name}
                </motion.a>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;