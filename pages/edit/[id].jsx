import { NextSeo } from "next-seo"
import { Fragment } from "react"
import AddEditForm from "../../components/add_edit_form"

export default function EditHero({ id }) {
  return (
    <Fragment>
      <NextSeo title="Edit | Almanac Database" />
      <AddEditForm id={id} />
    </Fragment>
  )
}

export async function getServerSideProps(context) {
  return {
    props: {id: context.params.id}
  }
}
