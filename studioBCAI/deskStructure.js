import S from "@sanity/desk-tool/structure-builder";
import { BsGrid3X2GapFill } from "react-icons/bs";
import { BsFillPersonFill } from "react-icons/bs";
import { FaShoppingCart, FaArchive } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";

export const getDefaultDocumentNode = ({ schemaType }) => {
  if (["project"].includes(schemaType)) {
    return S.document().views([S.view.form()]);
  }
  return S.document().views([S.view.form()]);
};

export default () =>
  S.list()
    .title("Base")
    .items([
      S.listItem()
        .title("Control Panel")
        .child(
          S.document()

            .views([S.view.form()])
            .title("Control Panel")
            .schemaType("controlPanel")
            .documentId("controlPanel")
        )
        .icon(FiSettings),
      ...S.documentTypeListItems().filter(
        (listItem) => !["controlPanel"].includes(listItem.getId())
      ),
    ]);
