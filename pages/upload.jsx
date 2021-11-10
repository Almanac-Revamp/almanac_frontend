import { NextSeo } from "next-seo";
import { Fragment } from "react";
import AddEditForm from "../components/add_edit_form";

export default function UploadHero() {
  return (
    <Fragment>
      <NextSeo title="Upload | Almanac Database" />
      <AddEditForm />
    </Fragment>
  )
}