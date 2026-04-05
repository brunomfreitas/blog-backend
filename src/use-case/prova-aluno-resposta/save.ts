import { ProvaAlunoRespostaRepository } from "@/repositories/typeorm/prova-aluno-resposta.repository";
import { SaveRespostaDTO } from "./prova-aluno-resposta-dtos";

export class SaveProvaAlunoRespostaUseCase {
  constructor(private repository: ProvaAlunoRespostaRepository) {}

  async handler(data: SaveRespostaDTO[]) {
    return this.repository.saveMany(data);
  }
}