import { FileUploadInput } from "@/components/file-upload-input";
import Image from "next/image";

export default function Home() {
  return (
    <div className=" bg-gray-200 h-screen flex flex-col justify-center items-center gap-4">
      <FileUploadInput/>
    </div>
  );
}
