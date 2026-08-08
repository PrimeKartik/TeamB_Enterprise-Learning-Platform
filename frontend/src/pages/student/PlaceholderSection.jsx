import Reveal from '../../components/Reveal'

export default function PlaceholderSection({ title, subtitle }) {
  return (
    <div className="max-w-5xl mx-auto px-2">
      <Reveal>
        <h1 className="text-heading text-2xl md:text-3xl font-bold mb-2">{title}</h1>
        {subtitle ? <p className="text-muted text-sm mb-8">{subtitle}</p> : null}
      </Reveal>

      <div className="card-glow rounded-2xl p-6">
        <p className="text-muted text-sm">
          This section is ready in the sidebar. Replace this placeholder with real data/UI when available.
        </p>
      </div>
    </div>
  )
}

