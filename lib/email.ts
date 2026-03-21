import { Resend } from 'resend'

export async function sendDraftNotification(title: string, slug: string) {
  if (!process.env.RESEND_API_KEY) return

  const resend = new Resend(process.env.RESEND_API_KEY)
  await resend.emails.send({
    from: 'content@helpfulhomebuyersusa.com',
    to: 'info@helpfulhomebuyersusa.com',
    subject: `New Draft Ready for Review: ${title}`,
    html: `
      <h2>New Blog Draft Ready</h2>
      <p><strong>${title}</strong></p>
      <p>Review and publish at:</p>
      <p><a href="https://helpfulhomebuyersusa.com/admin">https://helpfulhomebuyersusa.com/admin</a></p>
      <p>Slug: <code>${slug}</code></p>
    `,
  })
}
