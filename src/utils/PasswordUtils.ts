import bcrypt from 'bcrypt';

export default abstract class PasswordUtils {
  static async hashPassword(pw:string):Promise<string | false> {
    try{
      const salt:string = await bcrypt.genSalt(10);
      return await bcrypt.hash(pw, salt);
    }catch(error){
      console.error('Erro ao gerar o hash da senha:: ', error);
      return false;
    }
  }

  static async comparePassword(pw:string, hashed:string): Promise<boolean> {
    try {
      return await bcrypt.compare(pw, hashed);
    }catch(error){
      console.error('Erro ao comparar senhas:: ', error);
      return false;
    }
  }
}


