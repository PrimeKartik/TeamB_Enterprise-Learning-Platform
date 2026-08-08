export default function PrivacyPolicy() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-14">
      <h1 className="text-heading text-2xl font-bold mb-6">Privacy Policy</h1>
      <div className="space-y-5 text-body text-sm leading-relaxed">
        <p>
          SkillSphere Learning Nexus collects only the information needed to run your
          account: your name, email address, and a securely hashed password (or your
          Google account email if you sign in with Google — we never see or store
          your Google password).
        </p>
        <p>
          <span className="text-heading font-semibold">What we store:</span> account
          details, course enrollments, and newsletter subscription status if you
          opt in.
        </p>
        <p>
          <span className="text-heading font-semibold">What we don't do:</span> we
          don't sell your data to third parties, and we don't share it with
          advertisers.
        </p>
        <p>
          <span className="text-heading font-semibold">Your controls:</span> you can
          request account deletion or data export at any time by contacting{' '}
          <a href="mailto:support@skillsphere.com" className="text-primary hover:underline">
            support@skillsphere.com
          </a>.
        </p>
        <p className="text-muted text-xs pt-4">
          This is a sample policy included as part of the SkillSphere demo project —
          adapt it to your actual data practices before using in production.
        </p>
      </div>

      <h2 id="terms" className="text-heading text-2xl font-bold mt-12 mb-6 scroll-mt-24">
        Terms &amp; Conditions
      </h2>
      <div className="space-y-5 text-body text-sm leading-relaxed">
        <p>
          <span className="text-heading font-semibold">Course access:</span> once
          you enroll in a course, you have unlimited access to its lessons and
          materials for as long as your account remains active.
        </p>
        <p>
          <span className="text-heading font-semibold">Certificates:</span> certificates
          are issued automatically upon completing all lessons in a course and reflect
          your progress recorded on SkillSphere at the time of completion.
        </p>
        <p>
          <span className="text-heading font-semibold">Acceptable use:</span> accounts
          are for individual use only; sharing login credentials or redistributing
          course content is not permitted.
        </p>
        <p>
          <span className="text-heading font-semibold">Changes:</span> we may update
          these terms from time to time. Continued use of SkillSphere after a change
          means you accept the updated terms.
        </p>
        <p className="text-muted text-xs pt-4">
          This is a sample terms document included as part of the SkillSphere demo
          project — adapt it to your actual policies before using in production.
        </p>
      </div>
    </section>
  )
}
