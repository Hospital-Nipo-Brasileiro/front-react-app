export class FormatacaoDeAcessos {

  static async formatarCPFUsuario(cpf) {
    const cpfFormatado = cpf.replace(/\D/g, ''); 
    return cpfFormatado.slice(0, 8);
  }

  static async formatarCPFSenha(cpf) {
    const cpfFormatado = cpf.replace(/\D/g, ''); 
    return cpfFormatado.slice(0, 3);
  }

  static async formatarLocal(local, localCode) {
    if(local === 'HNB') {
        localCode = 'H';
        return localCode;
    } 
    else if (local === 'CMD'){
        localCode = 'L';
        return localCode;
    }
    else if (local === 'SMA'){
        localCode = 'S';
        return localCode;
    }
    else {
        throw new Error('Local não identificado!');
    }
  }

  static async formatarLocalSenha(local, localCode) {
    if(local === 'HNB') {
        localCode = 'Hnb';
        return localCode;
    } 
    else if (local === 'CMD'){
        localCode = 'Cmd';
        return localCode;
    }
    else if (local === 'SMA'){
        localCode = 'Sma';
        return localCode;
    }
    else {
        throw new Error('Local não identificado!');
    }
  }

  static async formatarTipoContrato(tipoContrato, tipoContratoCode) {
    if(tipoContrato === 'CLT') {
      tipoContratoCode = 'C';
      return tipoContratoCode;
    } else if (tipoContrato === 'Terceiro') {
      tipoContratoCode = 'X';
      return tipoContratoCode;
    } else if (tipoContrato === 'Temporário') {
      tipoContratoCode = 'T';
      return tipoContratoCode;
    } else if (tipoContrato === 'Temporária') {
      tipoContratoCode = 'T';
      return tipoContratoCode;
    } else if (tipoContrato === 'Estágio') {
      tipoContratoCode = 'E';
      return tipoContratoCode;
    } else if (tipoContrato === 'Estagiário') {
      tipoContratoCode = 'E';
      return tipoContratoCode;
    } else if (tipoContrato === 'Estagiária') {
      tipoContratoCode = 'E';
      return tipoContratoCode;
    } else {
      throw new Error('Tipo de Contrato não identificado!');
    }
  }

  static async formatarDataAdmissao(date) {
    const dataObj = new Date(date + 'T00:00:00Z');
  
    const dia = ('0' + dataObj.getUTCDate()).slice(-2);
    const mes = ('0' + (dataObj.getUTCMonth() + 1)).slice(-2);
  
    const resultado = dia + mes;
    return resultado; 
  }
}


