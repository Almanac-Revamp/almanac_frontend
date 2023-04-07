import { ShowHeroPage } from '@src/presentation/hero_detail/page/show_hero_page'

const ShowHeroRoute = ({ id }: { id: string }) => {
  return <ShowHeroPage id={id} />
}

export default ShowHeroRoute

export async function getServerSideProps(context) {
  return {
    props: { id: context.params.id },
  }
}
