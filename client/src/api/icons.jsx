import { FaRegFilePdf } from "react-icons/fa6";
import { FaRegImage } from "react-icons/fa";
import { FaRegFile } from "react-icons/fa";
import { FaRegFileAudio } from "react-icons/fa";

export const icon = (file_ext) => {
  let fileIcon;

  if (file_ext == "pdf") {
    fileIcon = <FaRegFilePdf className="icon" />;
  } else if (
    file_ext == "png" ||
    file_ext == "jpg" ||
    file_ext == "jpeg" ||
    file_ext == "gif"
  ) {
    fileIcon = <FaRegImage className="icon" />;
  } else if (
    file_ext == "mp3" ||
    file_ext == "mp4" ||
    file_ext== "avi" ||
    file_ext == "mkv"
  ) {
    fileIcon = <FaRegFileAudio className="icon" />;
  } else {
    fileIcon = <FaRegFile className="icon" />;
  }

  return fileIcon;
};