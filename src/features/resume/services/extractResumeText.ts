import mammoth from "mammoth"
import pdfParse from "pdf-parse"

export async function extractResumeText(
  file: File
): Promise<string> {
  const buffer = Buffer.from(
    await file.arrayBuffer()
  )

  const fileName = file.name.toLowerCase()

  if (fileName.endsWith(".pdf")) {
    const data = await pdfParse(buffer)
    return data.text || ""
  }

  if (fileName.endsWith(".docx")) {
    const data = await mammoth.extractRawText({
      buffer,
    })

    return data.value
  }

  return file.text()
}