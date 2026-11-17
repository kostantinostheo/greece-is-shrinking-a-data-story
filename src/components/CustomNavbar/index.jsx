import { useState } from "react";
import { NavLink } from 'react-router-dom';
import logo from '../../resources/images/logo-pie.png'
import { MenuIcon } from '../Icons';
import ThemeToggle from '../ThemeToggle';

const links = [
  { to: '/', label: 'Story', end: true },
  { to: '/team', label: 'Team' },
  { to: '/about', label: 'About' },
  { to: '/video', label: 'Demo video' },
];

const navLinkClass = ({ isActive }) =>
  `nav-link block py-3 ${isActive ? 'nav-link--active' : ''}`;

export function CustomNavbar() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-page/85 backdrop-blur-md">
      <nav aria-label="Main" className="container-story flex h-16 items-center justify-between gap-4">
        <NavLink to="/" className="flex items-center gap-3" onClick={close}>
          <img src={logo} className="h-8 w-auto" alt="" />
          <span className="font-display text-[1.35rem] font-normal tracking-[-0.03em] text-ink">VizGenius</span>
        </NavLink>

        <div className="flex items-center gap-3 md:gap-6">
          <div
            id="main-menu"
            className={`${open ? 'flex' : 'hidden'} absolute left-0 right-0 top-16 flex-col gap-1 border-b border-line bg-page px-5 pb-4 pt-2 shadow-lg md:static md:flex md:flex-row md:gap-6 md:border-0 md:bg-transparent md:p-0 md:shadow-none`}
          >
            {links.map(l => (
              <NavLink key={l.to} to={l.to} end={l.end} className={navLinkClass} onClick={close}>{l.label}</NavLink>
            ))}
          </div>

          <ThemeToggle />

          <button
            type="button"
            className="flex h-11 w-11 cursor-pointer active:scale-95 items-center justify-center rounded-full border border-line bg-surface text-ink-2 md:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
            aria-controls="main-menu"
            onClick={() => setOpen(o => !o)}
          >
            <MenuIcon size={20} />
          </button>
        </div>
      </nav>
    </header>
  );
}
