// import { Alternativas } from '@/domain/entities/alternativas.entity'
// import { Category } from '@/domain/entities/category.entity'
// import { Person } from '@/domain/entities/person.entity'
// import { ProvaQuestao } from '@/domain/entities/prova-questao.entity'
// import { Prova } from '@/domain/entities/prova.entity'
// import { Questao } from '@/domain/entities/questao.entity'
// import { appDataSource } from '@/lib/typeorm/typeorm'
// import { CreateProvaDTO, UpdateProvaDTO } from '@/use-case/prova/prova-dtos'
// import { Repository } from 'typeorm'

// export class ProvaRepository {
//   private provaRepo: Repository<Prova>
//   private provaQuestaoRepo: Repository<ProvaQuestao>
//   private questaoRepo: Repository<Questao>
//   private personRepo: Repository<Person>
//   private alternativasRepo: Repository<Alternativas>
//   private categoryRepo: Repository<Category>

//   constructor() {
//     this.provaRepo = appDataSource.getRepository(Prova)
//     this.provaQuestaoRepo = appDataSource.getRepository(ProvaQuestao)
//     this.questaoRepo = appDataSource.getRepository(Questao)
//     this.personRepo = appDataSource.getRepository(Person)
//     this.alternativasRepo = appDataSource.getRepository(Alternativas)
//     this.categoryRepo = appDataSource.getRepository(Category)
//   }

// //   async list(page: number, limit: number): Promise<Prova[]> {
// //     return this.provaRepo.find({
// //       relations: ['createdByPerson'],
// //       order: { id: 'DESC' },
// //       skip: (page - 1) * limit,
// //       take: limit
// //     })
// //   }

// 	async list(page: number, limit: number): Promise<any[]> {
// 		const provas = await this.provaRepo.find({
// 			relations: ['createdByPerson'],
// 			order: { id: 'DESC' },
// 			skip: (page - 1) * limit,
// 			take: limit
// 		});

// 		const provasComQuestoes = await Promise.all(
// 			provas.map(async (prova) => {
// 			const provaQuestoes = await this.provaQuestaoRepo.find({
// 				where: { prova: { id: prova.id } },
// 				relations: ['questao'],
// 				order: { numeroQuestao: 'ASC', id: 'ASC' }
// 			});

// 			const questoes = await Promise.all(
// 				provaQuestoes.map(async (item) => {
// 				const alternativas = await this.alternativasRepo.find({
// 					where: { alternativaQuestao: { id: item.questaoId } },
// 					order: { id: 'ASC' }
// 				});

// 				return {
// 					id: item.id,
// 					questaoId: item.questaoId,
// 					numeroQuestao: item.numeroQuestao,
// 					enunciado: item.questao?.enunciado,
// 					resposta: item.questao?.resposta,
// 					escolaridade: item.questao?.escolaridade,
// 					turno: item.questao?.turno,
// 					periodo: item.questao?.periodo,
// 					tipoQuestao: item.questao?.tipoQuestao,
// 					category: item.questao?.category,
// 					status: item.questao?.status,
// 					alternativas: alternativas.map((a) => ({
// 					id: a.id,
// 					alternativa: a.alternativa
// 					}))
// 				};
// 				})
// 			);

// 			return {
// 				id: prova.id,
// 				descricao: prova.descricao,
// 				createdAt: prova.createdAt,
// 				createdBy: prova.createdBy,
// 				questoes
// 			};
// 			})
// 		);

// 		return provasComQuestoes;
// 	}

// //   async findById(id: number): Promise<any | null> {
// //     const prova = await this.provaRepo.findOne({
// //       where: { id },
// //       relations: ['createdByPerson']
// //     })

// //     if (!prova) return null

// //     const provaQuestoes = await this.provaQuestaoRepo.find({
// //       where: { prova: { id } },
// //       relations: ['questao', 'questao.questaoMateria'],
// //       order: { numeroQuestao: 'ASC', id: 'ASC' }
// //     })

// //     const questoes = await Promise.all(
// //       provaQuestoes.map(async (item) => {
// //         const alternativas = await this.alternativasRepo.find({
// //           where: { alternativaQuestao: { id: item.questaoId } },
// //           order: { id: 'ASC' }
// //         })

// //         return {
// //           id: item.id,
// //           questaoId: item.questaoId,
// //           numeroQuestao: item.numeroQuestao,
// //           enunciado: item.questao?.enunciado,
// //           resposta: item.questao?.resposta,
// //           category: item.questao?.category,
// //           materia: item.questao?.questaoMateria?.name,
// //           alternativas: alternativas.map((a) => ({
// //             id: a.id,
// //             alternativa: a.alternativa
// //           }))
// //         }
// //       })
// //     )

// //     return {
// //       ...prova,
// //       questoes
// //     }
// //   }

// 	async findById(id: number): Promise<any | null> {
// 		const prova = await this.provaRepo.findOne({
// 			where: { id },
// 			relations: ['createdByPerson']
// 		});

// 		if (!prova) return null;

// 		const provaQuestoes = await this.provaQuestaoRepo.find({
// 			where: { prova: { id } },
// 			relations: ['questao'],
// 			order: { numeroQuestao: 'ASC', id: 'ASC' }
// 		});

// 		const questoes = await Promise.all(
// 			provaQuestoes.map(async (item) => {
// 			const alternativas = await this.alternativasRepo.find({
// 				where: { alternativaQuestao: { id: item.questaoId } },
// 				order: { id: 'ASC' }
// 			});

// 			return {
// 				id: item.id,
// 				questaoId: item.questaoId,
// 				numeroQuestao: item.numeroQuestao,
// 				enunciado: item.questao?.enunciado,
// 				resposta: item.questao?.resposta,
// 				escolaridade: item.questao?.escolaridade,
// 				turno: item.questao?.turno,
// 				periodo: item.questao?.periodo,
// 				tipoQuestao: item.questao?.tipoQuestao,
// 				category: item.questao?.category,
// 				status: item.questao?.status,
// 				alternativas: alternativas.map((a) => ({
// 					id: a.id,
// 					alternativa: a.alternativa
// 				}))
// 			};
// 			})
// 		);

// 		return {
// 			id: prova.id,
// 			descricao: prova.descricao,
// 			tempoProva: prova.tempoProva,
// 			createdAt: prova.createdAt,
// 			createdBy: prova.createdBy,
// 			questoes
// 		};
// 	}

//   async create(data: CreateProvaDTO): Promise<any> {
//     return appDataSource.transaction(async (manager) => {
//       const personRepo = manager.getRepository(Person)
//       const provaRepo = manager.getRepository(Prova)
//       const questaoRepo = manager.getRepository(Questao)
//       const provaQuestaoRepo = manager.getRepository(ProvaQuestao)

//       const creator = await personRepo.findOne({ where: { id: data.createdBy } })
//       if (!creator) throw new Error('Person not found')

//       const prova = provaRepo.create({
//         descricao: data.descricao,
// 		tempoProva: data.tempoProva,
//         createdByPerson: creator
//       })

//       const savedProva = await provaRepo.save(prova)

//       const questoesSelecionadas: Questao[] = []
//       const questoesUsadas = new Set<number>()

//       for (const item of data.itens) {
//         const disponiveis = await questaoRepo.find({
//           where: {
//             status: true,
//             questaoMateria: { id: item.categoryId }
//           },
//           relations: ['questaoMateria'],
//           order: { id: 'ASC' }
//         })

//         const embaralhadas = [...disponiveis].sort(() => Math.random() - 0.5)
//         const filtradas = embaralhadas.filter((q) => !questoesUsadas.has(q.id))

//         if (filtradas.length < item.quantidade) {
//           throw new Error(
//             `Não há questões suficientes para a matéria ${item.categoryId}.`
//           )
//         }

//         const escolhidas = filtradas.slice(0, item.quantidade)

//         for (const questao of escolhidas) {
//           questoesUsadas.add(questao.id)
//           questoesSelecionadas.push(questao)
//         }
//       }

//       const provaFinal = [...questoesSelecionadas].sort(() => Math.random() - 0.5)

//       for (let i = 0; i < provaFinal.length; i++) {
//         const provaQuestao = provaQuestaoRepo.create({
//           prova: savedProva,
//           questao: provaFinal[i],
//           numeroQuestao: i + 1
//         })

//         await provaQuestaoRepo.save(provaQuestao)
//       }

//       return this.findById(savedProva.id)
//     })
//   }

//   async update(id: number, data: UpdateProvaDTO): Promise<any> {
//     return appDataSource.transaction(async (manager) => {
//       const provaRepo = manager.getRepository(Prova)
//       const provaQuestaoRepo = manager.getRepository(ProvaQuestao)
//       const questaoRepo = manager.getRepository(Questao)

//       const prova = await provaRepo.findOne({
//         where: { id },
//         relations: ['createdByPerson']
//       })

//       if (!prova) throw new Error('Prova not found')

//       if (typeof data.descricao === 'string') {
//         prova.descricao = data.descricao;
//         await provaRepo.save(prova);
//       }

// 	if (typeof data.tempoProva === "number") {
// 		prova.tempoProva = data.tempoProva;
// 		await provaRepo.save(prova);
// 	}

//       if (Array.isArray(data.itens)) {
//         await provaQuestaoRepo.delete({ prova: { id } })

//         const questoesSelecionadas: Questao[] = []
//         const questoesUsadas = new Set<number>()

//         for (const item of data.itens) {
//           const disponiveis = await questaoRepo.find({
//             where: {
//               status: true,
//               questaoMateria: { id: item.categoryId }
//             },
//             relations: ['questaoMateria'],
//             order: { id: 'ASC' }
//           })

//           const embaralhadas = [...disponiveis].sort(() => Math.random() - 0.5)
//           const filtradas = embaralhadas.filter((q) => !questoesUsadas.has(q.id))

//           if (filtradas.length < item.quantidade) {
//             throw new Error(
//               `Não há questões suficientes para a matéria ${item.categoryId}.`
//             )
//           }

//           const escolhidas = filtradas.slice(0, item.quantidade)

//           for (const questao of escolhidas) {
//             questoesUsadas.add(questao.id)
//             questoesSelecionadas.push(questao)
//           }
//         }

//         const provaFinal = [...questoesSelecionadas].sort(() => Math.random() - 0.5)

//         for (let i = 0; i < provaFinal.length; i++) {
//           const provaQuestao = provaQuestaoRepo.create({
//             prova,
//             questao: provaFinal[i],
//             numeroQuestao: i + 1
//           })

//           await provaQuestaoRepo.save(provaQuestao)
//         }
//       }

//       return this.findById(id)
//     })
//   }

//   async delete(id: number): Promise<void> {
//     await appDataSource.transaction(async (manager) => {
//       const provaQuestaoRepo = manager.getRepository(ProvaQuestao)
//       const provaRepo = manager.getRepository(Prova)

//       await provaQuestaoRepo.delete({ prova: { id } })
//       await provaRepo.delete(id)
//     })
//   }


// }


import { Alternativas } from '@/domain/entities/alternativas.entity'
import { Person } from '@/domain/entities/person.entity'
import { ProvaAlunoResposta } from '@/domain/entities/prova-aluno-resposta.entity'
import { ProvaAluno } from '@/domain/entities/prova-aluno.entity'
import { ProvaQuestao } from '@/domain/entities/prova-questao.entity'
import { Prova } from '@/domain/entities/prova.entity'
import { Questao } from '@/domain/entities/questao.entity'
import { appDataSource } from '@/lib/typeorm/typeorm'
import { CreateProvaDTO, UpdateProvaDTO } from '@/use-case/prova/prova-dtos'
import { Repository } from 'typeorm'

export class ProvaRepository {
  private provaRepo: Repository<Prova>
  private provaQuestaoRepo: Repository<ProvaQuestao>
  private questaoRepo: Repository<Questao>
  private personRepo: Repository<Person>
  private alternativasRepo: Repository<Alternativas>
  private provaAlunoRepo: Repository<ProvaAluno>
  private provaAlunoRespostaRepo: Repository<ProvaAlunoResposta>

  constructor() {
    this.provaRepo = appDataSource.getRepository(Prova)
    this.provaQuestaoRepo = appDataSource.getRepository(ProvaQuestao)
    this.questaoRepo = appDataSource.getRepository(Questao)
    this.personRepo = appDataSource.getRepository(Person)
    this.alternativasRepo = appDataSource.getRepository(Alternativas)
    this.provaAlunoRepo = appDataSource.getRepository(ProvaAluno)
	this.provaAlunoRespostaRepo = appDataSource.getRepository(ProvaAlunoResposta)
  }

  private async buildQuestoes(provaId: number) {
    const provaQuestoes = await this.provaQuestaoRepo.find({
      where: { prova: { id: provaId } },
      relations: ['questao'],
      order: { numeroQuestao: 'ASC', id: 'ASC' },
    })

    return Promise.all(
      provaQuestoes.map(async (item) => {
        const alternativas = await this.alternativasRepo.find({
          where: { alternativaQuestao: { id: item.questaoId } },
          order: { id: 'ASC' },
        })

        return {
          id: item.id,
          questaoId: item.questaoId,
          numeroQuestao: item.numeroQuestao,
          enunciado: item.questao?.enunciado,
          resposta: item.questao?.resposta,
          escolaridade: item.questao?.escolaridade,
          turno: item.questao?.turno,
          periodo: item.questao?.periodo,
          tipoQuestao: item.questao?.tipoQuestao,
          category: item.questao?.category,
          status: item.questao?.status,
          alternativas: alternativas.map((a) => ({
            id: a.id,
            alternativa: a.alternativa,
          })),
        }
      })
    )
  }

  private async buildProvaAluno(provaId: number, alunoId?: number) {
  if (!alunoId) return null

  const provaAluno = await this.provaAlunoRepo.findOne({
    where: {
      prova: { id: provaId },
      aluno: { id: alunoId },
    },
    relations: ['prova', 'aluno'],
  })

  if (!provaAluno) return null

  return {
    id: provaAluno.id,
    status: provaAluno.status,
    nota: provaAluno.nota,
    tempoGasto: provaAluno.tempoGasto,
    dataInicio: provaAluno.dataInicio,
    dataFim: provaAluno.dataFim,
  }
}

private async buildRespostasAluno(provaAlunoId?: number) {
  if (!provaAlunoId) return []

  const respostas = await this.provaAlunoRespostaRepo.find({
    where: {
      provaAluno: { id: provaAlunoId },
    },
    relations: ['questao', 'alternativa'],
    order: { id: 'ASC' },
  })

  return respostas.map((item) => ({
    id: item.id,
    questaoId: item.questaoId,
    alternativaId: item.alternativaId,
    respostaLetra: item.respostaLetra,
    correta: item.correta,
  }))
}

  async list(page: number, limit: number, alunoId?: number, status?: string): Promise<any[]> {
  const provas = await this.provaRepo.find({
    relations: ['createdByPerson'],
    order: { id: 'DESC' },
    skip: (page - 1) * limit,
    take: limit,
  })

  const provasMontadas = await Promise.all(
    provas.map(async (prova) => {
      const questoes = await this.buildQuestoes(prova.id)
      const provaAluno = await this.buildProvaAluno(prova.id, alunoId)

      return {
        id: prova.id,
        descricao: prova.descricao,
        tempoProva: prova.tempoProva,
        createdAt: prova.createdAt,
        createdBy: prova.createdBy,
        questoes,
        provaAluno,
      }
    })
  )

  if (!status) return provasMontadas

  return provasMontadas.filter((item) => {
    const currentStatus = item?.provaAluno?.status ?? 'PENDENTE'
    return currentStatus === status
  })
}

  async findById(id: number, alunoId?: number): Promise<any | null> {
  const prova = await this.provaRepo.findOne({
    where: { id },
    relations: ['createdByPerson'],
  })

  if (!prova) return null

  const questoes = await this.buildQuestoes(id)
  const provaAluno = await this.buildProvaAluno(id, alunoId)
  const respostasAluno = await this.buildRespostasAluno(provaAluno?.id)

  return {
    id: prova.id,
    descricao: prova.descricao,
    tempoProva: prova.tempoProva,
    createdAt: prova.createdAt,
    createdBy: prova.createdBy,
    questoes,
    provaAluno,
    respostasAluno,
  }
}

  async create(data: CreateProvaDTO): Promise<any> {
    return appDataSource.transaction(async (manager) => {
      const personRepo = manager.getRepository(Person)
      const provaRepo = manager.getRepository(Prova)
      const questaoRepo = manager.getRepository(Questao)
      const provaQuestaoRepo = manager.getRepository(ProvaQuestao)

      const creator = await personRepo.findOne({ where: { id: data.createdBy } })
      if (!creator) throw new Error('Person not found')

      const prova = provaRepo.create({
        descricao: data.descricao,
        tempoProva: data.tempoProva,
        createdByPerson: creator,
      })

      const savedProva = await provaRepo.save(prova)

      const questoesSelecionadas: Questao[] = []
      const questoesUsadas = new Set<number>()

      for (const item of data.itens) {
        const disponiveis = await questaoRepo.find({
          where: {
            status: true,
            questaoMateria: { id: item.categoryId },
          },
          relations: ['questaoMateria'],
          order: { id: 'ASC' },
        })

        const embaralhadas = [...disponiveis].sort(() => Math.random() - 0.5)
        const filtradas = embaralhadas.filter((q) => !questoesUsadas.has(q.id))

        if (filtradas.length < item.quantidade) {
          throw new Error(`Não há questões suficientes para a matéria ${item.categoryId}.`)
        }

        const escolhidas = filtradas.slice(0, item.quantidade)

        for (const questao of escolhidas) {
          questoesUsadas.add(questao.id)
          questoesSelecionadas.push(questao)
        }
      }

      const provaFinal = [...questoesSelecionadas].sort(() => Math.random() - 0.5)

      for (let i = 0; i < provaFinal.length; i++) {
        const provaQuestao = provaQuestaoRepo.create({
          prova: savedProva,
          questao: provaFinal[i],
          numeroQuestao: i + 1,
        })

        await provaQuestaoRepo.save(provaQuestao)
      }

      return this.findById(savedProva.id)
    })
  }

  async update(id: number, data: UpdateProvaDTO): Promise<any> {
    return appDataSource.transaction(async (manager) => {
      const provaRepo = manager.getRepository(Prova)
      const provaQuestaoRepo = manager.getRepository(ProvaQuestao)
      const questaoRepo = manager.getRepository(Questao)

      const prova = await provaRepo.findOne({
        where: { id },
        relations: ['createdByPerson'],
      })

      if (!prova) throw new Error('Prova not found')

      if (typeof data.descricao === 'string') {
        prova.descricao = data.descricao
      }

      if (typeof data.tempoProva === 'number') {
        prova.tempoProva = data.tempoProva
      }

      await provaRepo.save(prova)

      if (Array.isArray(data.itens)) {
        await provaQuestaoRepo.delete({ prova: { id } })

        const questoesSelecionadas: Questao[] = []
        const questoesUsadas = new Set<number>()

        for (const item of data.itens) {
          const disponiveis = await questaoRepo.find({
            where: {
              status: true,
              questaoMateria: { id: item.categoryId },
            },
            relations: ['questaoMateria'],
            order: { id: 'ASC' },
          })

          const embaralhadas = [...disponiveis].sort(() => Math.random() - 0.5)
          const filtradas = embaralhadas.filter((q) => !questoesUsadas.has(q.id))

          if (filtradas.length < item.quantidade) {
            throw new Error(`Não há questões suficientes para a matéria ${item.categoryId}.`)
          }

          const escolhidas = filtradas.slice(0, item.quantidade)

          for (const questao of escolhidas) {
            questoesUsadas.add(questao.id)
            questoesSelecionadas.push(questao)
          }
        }

        const provaFinal = [...questoesSelecionadas].sort(() => Math.random() - 0.5)

        for (let i = 0; i < provaFinal.length; i++) {
          const provaQuestao = provaQuestaoRepo.create({
            prova,
            questao: provaFinal[i],
            numeroQuestao: i + 1,
          })

          await provaQuestaoRepo.save(provaQuestao)
        }
      }

      return this.findById(id)
    })
  }

  async delete(id: number): Promise<void> {
    await appDataSource.transaction(async (manager) => {
      const provaQuestaoRepo = manager.getRepository(ProvaQuestao)
      const provaRepo = manager.getRepository(Prova)

      await provaQuestaoRepo.delete({ prova: { id } })
      await provaRepo.delete(id)
    })
  }
}