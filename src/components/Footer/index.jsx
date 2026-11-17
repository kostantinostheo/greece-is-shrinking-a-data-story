import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
    <footer className="border-t border-line bg-band">
        <div className="container-story flex flex-col items-start justify-between gap-6 py-10 md:flex-row md:items-center">
            <div>
                <p className="font-display text-lg font-normal text-ink">VizGenius</p>
                <p className="mt-1 text-xs text-ink-3">&copy; 2024–{new Date().getFullYear()} Data Visualization (M126). All rights reserved.</p>
            </div>
            <nav aria-label="Footer" className="flex flex-wrap gap-x-6 text-sm">
                <Link to="/" className="nav-link inline-flex min-h-[44px] items-center">Story</Link>
                <Link to="/team" className="nav-link inline-flex min-h-[44px] items-center">Team</Link>
                <Link to="/about" className="nav-link inline-flex min-h-[44px] items-center">Sources &amp; tools</Link>
                <Link to="/video" className="nav-link inline-flex min-h-[44px] items-center">Demo video</Link>
            </nav>
        </div>
    </footer>
);

export default Footer;
