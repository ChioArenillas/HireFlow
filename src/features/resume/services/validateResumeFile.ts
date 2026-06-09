const MAX_FILE_SIZE =
  5 * 1024 * 1024

export function validateResumeFile(
  file: File
) {
  if (file.size > MAX_FILE_SIZE) {
    throw new Error(
      "File size exceeds 5MB"
    )
  }

  const allowedTypes = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "text/plain",
  ]

  if (
    !allowedTypes.includes(file.type)
  ) {
    throw new Error(
      "Unsupported file type"
    )
  }
}