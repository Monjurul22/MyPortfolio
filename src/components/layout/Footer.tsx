import { site } from "@/app/data/site"

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-8 flex flex-col md:flex-row gap-3 items-center justify-between">
        <p className="subtle">© {year} {site.name}. All rights reserved.</p>
        <div className="flex gap-5 text-sm">
          {site.socials.map(s => (
            <a key={s.name} className="hover:text-white" href={s.href} target="_blank" rel="noreferrer">{s.name}</a>
          ))}
        </div>
      </div>
    </footer>
  )
}