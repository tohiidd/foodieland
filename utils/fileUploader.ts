export async function fileUploader(file: any) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "foodieland");
  const type = file.type.includes("image") ? "image" : "video";

  let response;
  try {
    response = await fetch(`https://api.cloudinary.com/v1_1/dmgb7kvmn/${type}/upload`, {
      method: "POST",
      body: formData,
    }).then((res) => res.json());
  } catch (error) {
    console.log(error);
  }
  return response;
}
