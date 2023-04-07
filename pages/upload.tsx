import { AddEditForm } from '@src/presentation/hero_form/pages/add_edit_form'
import { NextSeo } from 'next-seo'
import { Fragment } from 'react'

export default function UploadHero() {
  return (
    <Fragment>
      <NextSeo title="Upload | Almanac Database" />
      <AddEditForm />
    </Fragment>
  )
}
