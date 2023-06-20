import Container from '@/components/Container'
import BlogPost from '@/components/BlogPost'
import Image from 'next/image'
import Link from 'next/link'
import Hero from '@/components/Hero/Home'
import Pagination from '@/components/Pagination'
import { getAllPosts, getAllTagsFromPosts , getPostBlocks } from '@/lib/notion'
import BLOG from '@/blog.config'
import { register } from 'swiper/element/bundle'
register()
import FormattedDate from '@/components/Common/FormattedDate'

export async function getStaticProps() {
  const posts = await getAllPosts({ onlyPost: true })
  const tags = getAllTagsFromPosts(posts)
  const heros = await getAllPosts({ onlyHidden: true })
  const hero = heros.find((t) => t.slug === 'index')

  let blockMap
  try {
    blockMap = await getPostBlocks(hero.id)
  } catch (err) {
    console.error(err)
    // return { props: { post: null, blockMap: null } }
  }

  const postsToShow = posts.slice(0, BLOG.postsPerPage)
  const totalPosts = posts.length
  const showNext = totalPosts > BLOG.postsPerPage
  return {
    props: {
      page: 1, // current page is 1
      postsToShow,
      showNext,
      posts,
      tags,
      blockMap
    },
    revalidate: 1
  }
}

const blog = ({ postsToShow, page, showNext, blockMap, tags, posts,}) => {
  return ( <> 
  {/*  这里是HERO 小屏中屏出现, 大屏隐藏  */}
  <Hero tags={tags} posts={posts} blockMap={blockMap} />

  {/*  这里是swiper 插件 小屏隐藏  中等屏幕开始出现,  */}
 <div className='hidden md:block'>
      <swiper-container 
        grab-cursor="true" autoplay="true" autoplay-disable-on-interaction="true" speed="100" space-between="0" slides-per-view="3"
        effect="coverflow" coverflow-effect-rotate="10" coverflow-effect-depth="500" coverflow-effect-slide-shadows="false" loop="true"
        coverflow-effect-stretch="10" coverflow-effect-modifier="1" loop-additional-slides="2"
        > 
        {postsToShow.map((post) => (<>
        
  <swiper-slide key={post.id} post={post} index={postsToShow.indexOf(post)} > 
    <Link passHref href={`${BLOG.path}/${post.slug}`} scroll={false}>
    {/* <Image src={post?.page_cover} alt={post.title} width={640} height={480} />  */}

    <div className=' max-w-[640px] max-h-[480px] min-w-[480px] min-h-[360px] flex flex-col justify-between'>  
        <Image src={post?.page_cover} alt={post.title} width={640} height={480} 
        className='rounded-3xl  static 
        invert dark:invert-0
        '/>
        <div className='absolute flex flex-col justify-between  p-8  text-xl '>{post.title} 
        <div className=' hidden lg:block text-sm '>{post.summary}</div>
        </div>

        <div className='absolute bottom-0 p-8 '><FormattedDate date={post.date} /></div>
    </div>

    </Link>
  </swiper-slide>
       </>
      ))}
      </swiper-container>
      
  </div>
   {/*  中屏开始隐藏  */}
  <div className='visible md:hidden '>
    <Container title={BLOG.title} description={BLOG.description}>
      
      {postsToShow.map((post) => (
       <BlogPost key={post.id} post={post} index={postsToShow.indexOf(post)} />
      ))}
      {/* {showNext && <Pagination page={page} showNext={showNext} />} */}
    </Container>
  </div>
    
    </>
  )
}

export default blog