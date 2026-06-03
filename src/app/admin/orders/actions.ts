'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { getAdminSession } from "@/lib/auth"

export async function updateOrderStatus(id: string, formData: FormData) {
  const session = await getAdminSession()
  if (!session || session.user.role !== 'ADMIN') {
    throw new Error('Unauthorized')
  }

  const status = formData.get("status") as string
  await prisma.order.update({
    where: { id },
    data: { status }
  })
  revalidatePath("/admin/orders")
  revalidatePath("/admin")
}
