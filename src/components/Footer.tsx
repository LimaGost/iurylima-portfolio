import { GithubIcon, LinkedinIcon, MailIcon } from "./SocialIcons";

const links = [
  { label: "GITHUB", icon: GithubIcon },
  { label: "LINKEDIN", icon: LinkedinIcon },
  { label: "EMAIL", icon: MailIcon },
];

export default function Footer() {
  return (
    <footer className="border-t border-surface-border bg-dark py-8">
      <div className="wrap flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="font-display text-sm tracking-[0.5px] text-white">
            IURY LIMA<span className="text-accent">.</span>
          </div>
          <div className="mt-1 text-[11px] tracking-[1px] text-muted-2">
            DESENVOLVEDOR FULL-STACK &middot; &copy; 2026
          </div>
        </div>
        <div className="flex gap-6">
          {links.map(({ label, icon: Icon }) => (
            <a
              key={label}
              href="#"
              className="flex items-center gap-2 text-xs font-semibold tracking-[1px] text-[#cfd2d8] transition-colors duration-200 hover:text-accent"
            >
              <Icon size={15} />
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
