export async function uploadImage(file: any) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "foodieland");
  let response;
  try {
    response = await fetch(" https://api.cloudinary.com/v1_1/dmgb7kvmn/image/upload", {
      method: "POST",
      body: formData,
    }).then((res) => res.json());
  } catch (error) {
    console.log(error);
  }
  return response;
}
