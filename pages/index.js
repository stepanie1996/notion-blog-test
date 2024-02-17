import { getAllPosts, getAllTagsFromPosts,getAllCatsFromPosts } from '@/lib/notion'
import TwitterLayout from '@/layouts/layouttwitter'
import BLOG from '@/blog.config'
export default function search({ cats,tags, posts,post,resdata,tuijian }) {
  return <TwitterLayout cats={cats} tags={tags} posts={posts} tuijian={tuijian} index={posts.indexOf(post)} resdata={resdata} />
}
export async function getStaticProps() {
  const posts = await getAllPosts({ onlyPost: true })
  const tuijian  = await getAllPosts({ onlyPage:true })
  const tags = getAllTagsFromPosts(posts)
  const cats = getAllCatsFromPosts(posts)
  const umiId = BLOG.analytics.umamiConfig.websiteId;
  const umiToken = BLOG.analytics.umamiConfig.token;
  const umiTime = Date.parse(new Date());
  const umiUrl = `https://umami.mynotion.life/api/websites/${umiId}/metrics?startAt=1672848000000&endAt=${umiTime}&type=url`;
  const response = await fetch(umiUrl, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${umiToken}`,
      'Content-Type': 'application/json'
    }
  });
  const resdata = await response.json();

  return {
    props: {      tags,cats,posts, tuijian ,resdata  },
    revalidate: 1
  }
}
