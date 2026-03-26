import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('⚡ Iniciando Seed: Alimentando o Banco Dragão Motos...')

  // Limpar dados existentes (opcional, use com cuidado)
  // await prisma.product.deleteMany()

  const produtos = [
    {
      nome: 'Escapamento Akrapovic Full System Carbon',
      categoria: 'Performance',
      compatibilidade: 'BMW S1000RR / Kawasaki ZX-10R',
      preco: 12500.00,
      estoque: 2,
      imagem: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=400&auto=format&fit=crop',
      ativo: true
    },
    {
      nome: 'Kit de Pastilhas de Freio Brembo Sinterizada',
      categoria: 'Freios',
      compatibilidade: 'CB 650R / MT-09 / Hornet',
      preco: 850.00,
      estoque: 15,
      imagem: 'https://images.unsplash.com/photo-1591438676302-13340ab4a413?q=80&w=400&auto=format&fit=crop',
      ativo: true
    },
    {
      nome: 'Pneu Pirelli Diablo Rosso IV 190/55',
      categoria: 'Pneus',
      compatibilidade: 'Super Esportivas (Diversas)',
      preco: 1890.00,
      estoque: 8,
      imagem: 'https://images.unsplash.com/photo-1611002214172-792c1f90b59a?q=80&w=400&auto=format&fit=crop',
      ativo: true
    },
    {
      nome: 'Óleo Motul 7100 10W40 Sintético (1L)',
      categoria: 'Lubrificantes',
      compatibilidade: 'Universal (Alta Cilindrada)',
      preco: 135.00,
      estoque: 40,
      imagem: 'https://images.unsplash.com/photo-1635843104390-3ae8e6840733?q=80&w=400&auto=format&fit=crop',
      ativo: true
    },
    {
        nome: 'Filtro de Ar K&N High Flow',
        categoria: 'Performance',
        compatibilidade: 'Z900 / Ninja 650',
        preco: 580.00,
        estoque: 12,
        imagem: 'https://images.unsplash.com/photo-1485902753229-9dc5b8a07201?q=80&w=400&auto=format&fit=crop',
        ativo: true
    }
  ]

  for (const p of produtos) {
    await prisma.product.upsert({
      where: { id: `seed-${p.nome.replace(/\s+/g, '-').toLowerCase()}` }, // ID determinístico para o seed
      update: {},
      create: {
        ...p,
        id: `seed-${p.nome.replace(/\s+/g, '-').toLowerCase()}`
      }
    })
  }

  console.log('🏁 Seed Concluído: O catálogo Dragão agora tem peças de elite!')
}

main()
  .catch((e) => {
    console.error('❌ Erro no Seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
