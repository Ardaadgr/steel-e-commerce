'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function addProduct(formData: FormData) {
  const name = formData.get("name") as string
  const description = formData.get("description") as string
  const price = parseFloat(formData.get("price") as string)
  const stock = parseInt(formData.get("stock") as string)
  const imagesStr = formData.get("images") as string
  
  const images = imagesStr.split(",").map(i => i.trim()).filter(i => i !== "")

  await prisma.product.create({
    data: { name, description, price, stock, images }
  })

  revalidatePath("/admin/products")
  revalidatePath("/") // Revalidate homepage so new product shows up
}

export async function deleteProduct(id: string) {
  await prisma.product.delete({ where: { id } })
  revalidatePath("/admin/products")
  revalidatePath("/")
}
