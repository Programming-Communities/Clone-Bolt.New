
'use client'; // Mark this component as a Client Component
import { HelpCircle, LogOut, Settings, Wallet } from 'lucide-react';
import React from 'react';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation'; // Correct for App Router

function SideBarFooter() {
  const router = useRouter();

  const options = [
    {
      name: 'Setting',
      icon: Settings,
      path: '/settings', // Add a path for this option
    },
    {
      name: 'Help Center',
      icon: HelpCircle,
      path: '/help', // Add a path for this option
    },
    {
      name: 'My Subscription',
      icon: Wallet,
      path: '/pricing',
    },
    {
      name: 'Sign Out',
      icon: LogOut,
      path: '/logout', // Add a path for this option
    },
  ];

  const onOptionClick = (option) => {
    if (option.path) {
      router.push(option.path); // Use router.push from next/navigation
    } else {
      console.warn('No path defined for:', option.name);
    }
  };

  return (
    <div className="p-2 mb-10">
      {options.map((option, index) => (
        <Button variant="ghost"
          onClick={() =>onOptionClick(option)}
          className="w-full flex justify-start my-3 "key={index}>
          <option.icon />
          {option.name}
        </Button>
      ))}
    </div>
  );
}

export default SideBarFooter;

