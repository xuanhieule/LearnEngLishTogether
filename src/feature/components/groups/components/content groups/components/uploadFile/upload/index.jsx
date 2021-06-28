import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import groupsApi from "../../../../../../../../api/groupsApi";
import UploadFileForm from "../UploadFileForm";

Upload.propTypes = {};

function Upload(props) {
  const { enqueueSnackbar } = useSnackbar();
  const [file, setFile] = useState({});
  const setValueGroup = (value) => {
    setFile(value);
    console.log("file: ", file);
  };

  const handleSubmit = async (values) => {
    try {
      console.log(values);
      await groupsApi.createGroup(values);

      // close dialog
      const { closeDialog } = props;
      if (closeDialog) {
        closeDialog();
      }

      enqueueSnackbar("Tạo nhóm thành công", { variant: "success" });
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Tạo nhóm thất bại", { variant: "error" });
    }
  };
  return (
    <div>
      <UploadFileForm onSubmit={handleSubmit} />
    </div>
  );
}

export default Upload;
