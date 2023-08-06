import Container from '@/components/Container'
import ContactForm from '@/components/ContactForm'
import BLOG from '@/blog.config'
import { lang } from '@/lib/lang'
import { useRouter } from 'next/router'

export const Contact = () => {
  const { locale } = useRouter()
  const t = lang[locale]
  return (
    <Container title={BLOG.title} description={BLOG.description} ogimage={BLOG.link+BLOG.defaultIcon} >
      <div className='mb-8 md:mb-16 text-gray-600 dark:text-gray-200'>
        <h2 className='text-xl lg:text-3xl font-light text-center mb-4'>
          {t.CONTACT.TITLE}
        </h2>
        <p className='max-w-screen-md font-light md:text-lg text-center mx-auto'>
          {t.CONTACT.DESCRIPTION}
        </p>
        <p className='max-w-screen-md font-light md:text-lg text-center mx-auto'>
          {t.CONTACT.TG_DESCRIPTION}

        </p>
      </div>
      <ContactForm />
    </Container>
  )
}

export default Contact
