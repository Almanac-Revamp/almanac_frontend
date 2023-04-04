import { AddEditForm } from "../../src/presentation/hero_form/pages/add_edit_form";

export default function EditHero({ id }) {
  return <AddEditForm id={id} />;
}

export async function getServerSideProps(context) {
  return {
    props: { id: context.params.id },
  };
}
